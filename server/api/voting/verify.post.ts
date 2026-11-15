import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody, getRequestIP } from 'h3'
import { setVoterCookie } from '../../lib/auth'
import { rateLimit } from '../../lib/ratelimit'

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const limited = rateLimit(`verify:${ip}`, 8, 60_000)
  if (!limited.ok) {
    return {
      success: false,
      message: `Terlalu banyak percobaan. Coba lagi dalam ${limited.retryAfter} detik.`,
    }
  }

  const body = (await readBody(event)) || {}
  const nisn = String(body.nisn || '').trim()
  const token = String(body.token || '').trim().toUpperCase()

  if (!nisn || !token) {
    return { success: false, message: 'NISN dan token wajib diisi' }
  }

  const voter = await prisma.voter.findUnique({ where: { nisn } })
  if (!voter) return { success: false, message: 'NISN tidak ditemukan' }
  if (voter.isVoted) return { success: false, message: 'Anda sudah menggunakan hak suara' }
  if (!voter.token || voter.token.toUpperCase() !== token) {
    return { success: false, message: 'Token tidak valid' }
  }

  setVoterCookie(event, { nisn: voter.nisn, nama: voter.nama, kelas: voter.kelas })

  return {
    success: true,
    message: 'Verifikasi berhasil',
    student: { id: voter.id, nisn: voter.nisn, name: voter.nama, class: voter.kelas },
  }
})
