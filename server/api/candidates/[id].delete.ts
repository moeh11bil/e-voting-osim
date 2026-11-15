import { prisma } from '../../lib/prisma'
import { defineEventHandler, getRouterParam } from 'h3'
import { requireAdmin } from '../../lib/auth'
import { unlinkSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }

  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) return { success: false, message: 'ID tidak valid' }

  const existing = await prisma.candidate.findUnique({ where: { id } })
  if (!existing) return { success: false, message: 'Paslon tidak ditemukan' }

  try {
    if (existing.foto) {
      const oldPath = join(process.cwd(), 'public', existing.foto.replace(/^\//, ''))
      try { unlinkSync(oldPath) } catch {}
    }
    await prisma.candidate.delete({ where: { id } })
    return { success: true, message: 'Paslon berhasil dihapus' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal menghapus paslon' }
  }
})