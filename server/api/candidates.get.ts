import { prisma } from '../lib/prisma'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const candidates = await prisma.candidate.findMany({ orderBy: { nomorUrut: 'asc' } })
  return { candidates }
})