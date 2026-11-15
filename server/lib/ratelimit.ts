// Rate limiter in-memory sederhana (cukup untuk preset nitro 'node' single-process).
type Entry = { count: number; resetAt: number }

const buckets = new Map<string, Entry>()

function sweep(now: number) {
  if (buckets.size < 5000) return
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  sweep(now)

  const entry = buckets.get(key)
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  entry.count += 1
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  return { ok: true, retryAfter: 0 }
}
