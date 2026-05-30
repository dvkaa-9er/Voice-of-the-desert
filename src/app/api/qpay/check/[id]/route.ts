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

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  if (!process.env.QPAY_USERNAME || !process.env.QPAY_PASSWORD) {
    return Response.json({ error: 'QPay not configured.' }, { status: 503 })
  }

  try {
    const token = await getToken()
    const res = await fetch(`${QPAY_BASE}/payment/check`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        object_type: 'INVOICE',
        object_id: id,
        offset: { page_number: 1, page_limit: 100 },
      }),
    })

    if (!res.ok) return Response.json({ paid: false })

    const data = await res.json() as { count: number; paid_amount: number }
    return Response.json({ paid: data.count > 0 && data.paid_amount > 0 })
  } catch (err) {
    console.error('[qpay/check]', err)
    return Response.json({ paid: false })
  }
}
