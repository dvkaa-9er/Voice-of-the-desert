import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { rateLimit } from '@/lib/rateLimit'

// 2 sign-ups per IP per hour — enough for any real user, blocks floods
const LIMIT = 2
const WINDOW_MS = 60 * 60 * 1000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`notify:${ip}`, LIMIT, WINDOW_MS)) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { email, _trap } = body as Record<string, unknown>

  if (_trap) {
    return Response.json({ ok: true })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }

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
      from: `"Voice of the Desert Shop" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? process.env.SMTP_USER,
      subject: 'Shop launch notification sign-up',
      text: `New sign-up: ${email}`,
    })
  } else {
    console.log('[shop notify]', { email })
  }

  return Response.json({ ok: true })
}
