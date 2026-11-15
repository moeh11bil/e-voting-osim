import { prisma } from '../lib/prisma'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const total = await prisma.voter.count()
  const voted = await prisma.voter.count({ where: { isVoted: true } })
  const candidates = await prisma.candidate.findMany({ orderBy: { nomorUrut: 'asc' } })
  const voteCounts = await prisma.vote.groupBy({ by: ['candidateId'], _count: { candidateId: true } })
  const countMap = new Map(voteCounts.map((v: any) => [v.candidateId, v._count.candidateId]))

  const candidateResults = candidates.map((c: any) => ({
    id: c.id,
    nomorUrut: c.nomorUrut,
    nomor: c.nomorUrut,
    nama: `${c.namaKetua} & ${c.namaWakil}`,
    namaKetua: c.namaKetua,
    namaWakil: c.namaWakil,
    visi: c.visi,
    misi: c.misi,
    foto: c.foto,
    suara: countMap.get(c.id) || 0,
  }))

  const totalVotes = candidateResults.reduce((a: number, b: any) => a + b.suara, 0)
  candidateResults.forEach((c: any) => {
    c.persentase = totalVotes > 0 ? Math.round((c.suara / totalVotes) * 100) : 0
  })

  return {
    total_students: total,
    voted_students: voted,
    participation_rate: total > 0 ? Number(((voted / total) * 100).toFixed(2)) : 0,
    turnout: total > 0 ? Math.round((voted / total) * 100) : 0,
    totalVotes,
    candidates: candidateResults,
    results: candidateResults,
  }
})