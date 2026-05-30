// Simple in-memory sliding-window rate limiter.
//
// This works correctly when a single serverless instance handles multiple
// requests (Vercel warm instances). On cold starts the window resets, which
// is acceptable — it prevents burst abuse, not determined attackers.
// For production-grade limiting, replace the Map with Vercel KV or Upstash.

interface Window {
  count: number
  resetAt: number
}

const store = new Map<string, Window>()

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 * @param key      Usually the client IP address.
 * @param limit    Max requests per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
