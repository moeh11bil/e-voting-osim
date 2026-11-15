import { prisma } from '../lib/prisma'
import { defineEventHandler } from 'h3'
import { requireAdmin } from '../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized', voters: [] } }
  const voters = await prisma.voter.findMany({ orderBy: { nama: 'asc' } })
  return { voters }
})