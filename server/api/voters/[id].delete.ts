import { prisma } from '../../lib/prisma'
import { defineEventHandler, getRouterParam } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }
  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) return { success: false, message: 'ID tidak valid' }

  const existing = await prisma.voter.findUnique({ where: { id } })
  if (!existing) return { success: false, message: 'Pemilih tidak ditemukan' }
  if (existing.isVoted) return { success: false, message: 'Tidak dapat menghapus pemilih yang sudah memilih' }

  try {
    await prisma.voter.delete({ where: { id } })
    return { success: true, message: 'Pemilih berhasil dihapus' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal menghapus pemilih' }
  }
})