import { prisma } from '../../lib/prisma'
import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }
  try {
    const deletedVotes = await prisma.vote.deleteMany({})
    const deletedVoters = await prisma.voter.deleteMany({})
    return {
      success: true,
      message: `Berhasil menghapus ${deletedVoters.count} pemilih dan ${deletedVotes.count} suara`,
      voters: deletedVoters.count,
      votes: deletedVotes.count,
    }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal menghapus semua data' }
  }
})
