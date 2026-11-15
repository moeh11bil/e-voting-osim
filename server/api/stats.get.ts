import { prisma } from '../lib/prisma'
import { defineEventHandler } from 'h3'
import { requireAdmin } from '../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { totalDPT: 0, sudahMemilih: 0, belumMemilih: 0, turnout: 0, candidates: [] } }

  const total = await prisma.voter.count()
  const voted = await prisma.voter.count({ where: { isVoted: true } })
  const candidates = await prisma.candidate.findMany({ orderBy: { nomorUrut: 'asc' } })

  const voteCounts = await prisma.vote.groupBy({ by: ['candidateId'], _count: { candidateId: true } })
  const countMap = new Map(voteCounts.map((v: any) => [v.candidateId, v._count.candidateId]))

  const candidateStats = candidates.map((c: any) => ({
    id: c.id,
    nomor: c.nomorUrut,
    nama: `${c.namaKetua} & ${c.namaWakil}`,
    namaKetua: c.namaKetua,
    namaWakil: c.namaWakil,
    suara: countMap.get(c.id) || 0,
  }))

  const totalVotes = candidateStats.reduce((a: number, b: any) => a + b.suara, 0)
  const turnout = total > 0 ? Math.round((voted / total) * 100) : 0

  return {
    totalDPT: total,
    sudahMemilih: voted,
    belumMemilih: total - voted,
    turnout,
    totalVotes,
    candidates: candidateStats,
  }
})