import { getCookie, setCookie, createError } from 'h3'
import { createHmac, timingSafeEqual } from 'node:crypto'

export interface AdminSession {
  id: number
  username: string
  nama: string
}

export interface VoterSession {
  nisn: string
  nama: string
  kelas: string
}

// Secret untuk menandatangani cookie sesi. WAJIB di-set di produksi.
const SESSION_SECRET = process.env.SESSION_SECRET || 'e-voting-osim-dev-secret-change-me'

function sign(payload: string): string {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
}

/** Bungkus nilai menjadi "payload.signature" agar tidak bisa diubah dari sisi klien. */
function seal(value: unknown): string {
  const payload = Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

/** Verifikasi tanda tangan lalu kembalikan isinya, atau null jika tidak valid. */
function unseal<T>(raw: string | undefined | null): T | null {
  if (!raw) return null
  const idx = raw.lastIndexOf('.')
  if (idx <= 0) return null
  const payload = raw.slice(0, idx)
  const signature = raw.slice(idx + 1)
  const expected = sign(payload)
  const given = Buffer.from(signature)
  const want = Buffer.from(expected)
  if (given.length !== want.length || !timingSafeEqual(given, want)) return null
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as T
  } catch {
    return null
  }
}

export function getAdminSession(event: any): AdminSession | null {
  const data = unseal<any>(getCookie(event, 'auth'))
  if (data && typeof data.id === 'number' && typeof data.username === 'string') {
    return { id: data.id, username: data.username, nama: data.nama ?? data.username }
  }
  return null
}

export function requireAdmin(event: any): AdminSession {
  const session = getAdminSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session
}

export function getVoterSession(event: any): VoterSession | null {
  const data = unseal<any>(getCookie(event, 'voter'))
  if (data && typeof data.nisn === 'string') {
    return { nisn: data.nisn, nama: data.nama ?? '', kelas: data.kelas ?? '' }
  }
  return null
}

export function setAuthCookie(event: any, value: any, maxAge = 60 * 60 * 8) {
  setCookie(event, 'auth', seal(value), { path: '/', sameSite: 'lax', maxAge })
}

export function setVoterCookie(event: any, value: any, maxAge = 60 * 15) {
  setCookie(event, 'voter', seal(value), { path: '/', sameSite: 'lax', maxAge })
}

export function clearCookie(event: any, name: string) {
  setCookie(event, name, '', { path: '/', maxAge: 0 })
}
