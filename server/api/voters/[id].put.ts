import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }
  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) return { success: false, message: 'ID tidak valid' }

  const existing = await prisma.voter.findUnique({ where: { id } })
  if (!existing) return { success: false, message: 'Pemilih tidak ditemukan' }

  const body = (await readBody(event)) || {}
  const data: any = {}
  if (body.nisn !== undefined) data.nisn = String(body.nisn)
  if (body.nama !== undefined || body.name !== undefined) data.nama = String(body.nama ?? body.name)
  if (body.kelas !== undefined || body.class !== undefined) data.kelas = String(body.kelas ?? body.class)
  if (body.token !== undefined) data.token = body.token ? String(body.token) : null
  if (body.isVoted !== undefined) data.isVoted = Boolean(body.isVoted)
  if (body.is_voted !== undefined) data.isVoted = Boolean(body.is_voted)

  try {
    await prisma.voter.update({ where: { id }, data })
    return { success: true, message: 'Pemilih berhasil diperbarui' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal memperbarui pemilih' }
  }
})