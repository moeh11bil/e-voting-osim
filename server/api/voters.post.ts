import { prisma } from '../lib/prisma'
import { defineEventHandler, readBody } from 'h3'
import { requireAdmin } from '../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }
  const body = (await readBody(event)) || {}
  const nisn = body.nisn
  const nama = body.nama ?? body.name
  const kelas = body.kelas ?? body.class
  const token = body.token

  if (!nisn || !nama || !kelas) {
    return { success: false, message: 'NISN, nama, dan kelas wajib diisi' }
  }

  try {
    const voter = await prisma.voter.create({
      data: { nisn: String(nisn), nama: String(nama), kelas: String(kelas), token: token ? String(token) : null },
    })
    return { success: true, message: 'Pemilih berhasil ditambahkan', id: voter.id }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal menyimpan pemilih' }
  }
})