import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { rateLimit } from '@/lib/rateLimit'

// 3 submissions per IP per 15 minutes
const LIMIT = 3
const WINDOW_MS = 15 * 60 * 1000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────────
  // x-forwarded-for is set by Vercel's edge; take the first (client) IP.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`contact:${ip}`, LIMIT, WINDOW_MS)) {
    return Response.json(
      { error: 'Too many submissions. Please try again in 15 minutes.' },
      { status: 429 },
    )
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { name, email, message, _trap } = body as Record<string, unknown>

  // ── Honeypot ─────────────────────────────────────────────────────────────────
  // Bots fill every visible input; _trap is a hidden field only bots touch.
  // Return 200 silently so the bot believes it succeeded — don't hint at detection.
  if (_trap) {
    return Response.json({ ok: true })
  }

  // ── Server-side validation ───────────────────────────────────────────────────
  // The browser already validates, but client-side checks are easily bypassed.
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return Response.json({ error: 'Name must be 2–100 characters.' }, { status: 400 })
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
    return Response.json({ error: 'Message must be 10–2000 characters.' }, { status: 400 })
  }

  // ── Email delivery ───────────────────────────────────────────────────────────
  // Only runs when SMTP env vars are set. Falls back to console.log in dev.
  // See .env.example for required variables.
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transport.sendMail({
      from: `"Voice of the Desert" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact: ${name.trim()}`,
      text: `Name:    ${name.trim()}\nEmail:   ${email}\n\nMessage:\n${message.trim()}`,
    })
  } else {
    // Dev fallback — visible in `npm run dev` terminal
    console.log('[contact form]', { name: name.trim(), email, message: message.trim() })
  }

  return Response.json({ ok: true })
}
