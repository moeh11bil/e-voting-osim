import { prisma } from '../../lib/prisma'
import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }
  try {
    await prisma.voter.updateMany({ data: { isVoted: false, votedAt: null } })
    await prisma.vote.deleteMany({})
    // regenerate? no
    return { success: true, message: 'Suara berhasil direset' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal reset' }
  }
})