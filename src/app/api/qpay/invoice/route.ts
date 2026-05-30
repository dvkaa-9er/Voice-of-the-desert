import { NextRequest } from 'next/server'

const QPAY_BASE = 'https://merchant.qpay.mn/v2'

let tokenCache: { token: string; expiresAt: number } | null = null

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token

  const creds = Buffer.from(`${process.env.QPAY_USERNAME}:${process.env.QPAY_PASSWORD}`).toString('base64')
  const res = await fetch(`${QPAY_BASE}/auth/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`QPay auth failed: ${res.status}`)
  const data = await res.json() as { access_token: string; expires_in: number }
  tokenCache = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return tokenCache.token
}

export async function POST(req: NextRequest) {
  if (!process.env.QPAY_USERNAME || !process.env.QPAY_PASSWORD || !process.env.QPAY_INVOICE_CODE) {
    return Response.json({ error: 'QPay not configured.' }, { status: 503 })
  }

  let body: unknown
  try { body = await req.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }

  const { amount } = body as Record<string, unknown>
  if (typeof amount !== 'number' || amount < 1000) {
    return Response.json({ error: 'Minimum amount is ₮1,000.' }, { status: 400 })
  }

  try {
    const token = await getToken()
    const invoiceNo = `VOD-${Date.now()}`
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voiceofdesert.org'

    const res = await fetch(`${QPAY_BASE}/invoice`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoice_code: process.env.QPAY_INVOICE_CODE,
        sender_invoice_no: invoiceNo,
        invoice_receiver_code: 'terminal',
        invoice_description: `Voice of the Desert — хандив ₮${amount.toLocaleString()}`,
        amount,
        callback_url: `${siteUrl}/api/qpay/callback`,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`QPay invoice error: ${err}`)
    }

    const data = await res.json() as {
      invoice_id: string
      qr_text: string
      qr_image: string
      urls?: { name: string; description: string; logo: string; link: string }[]
    }

    return Response.json({
      invoice_id: data.invoice_id,
      qr_image: data.qr_image,   // base64 PNG from QPay
      qr_text: data.qr_text,
      urls: data.urls ?? [],
    })
  } catch (err) {
    console.error('[qpay/invoice]', err)
    return Response.json({ error: 'Failed to create QPay invoice.' }, { status: 500 })
  }
}
