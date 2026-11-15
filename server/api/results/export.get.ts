import { prisma } from '../../lib/prisma'
import { defineEventHandler, setHeader, createError } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { throw createError({ statusCode: 401, statusMessage: 'Unauthorized' }) }

  const total = await prisma.voter.count()
  const voted = await prisma.voter.count({ where: { isVoted: true } })
  const candidates = await prisma.candidate.findMany({ orderBy: { nomorUrut: 'asc' } })
  const voteCounts = await prisma.vote.groupBy({ by: ['candidateId'], _count: { candidateId: true } })
  const countMap = new Map(voteCounts.map((v: any) => [v.candidateId, v._count.candidateId]))
  const settings = await prisma.madrasahSetting.findUnique({ where: { id: 1 } })

  const lines: string[] = []
  if (settings) {
    lines.push(`Madrasah,"${settings.namaMadrasah.replace(/"/g, '""')}"`)
    if (settings.npsn) lines.push(`NPSN,"${settings.npsn}"`)
    lines.push(`Organisasi,"${settings.namaOrganisasi}"`)
    lines.push(`Tahun Pelajaran,"${settings.tahunPelajaran}"`)
    lines.push('')
  }
  lines.push('Nomor,Nama Ketua,Nama Wakil,Suara')
  for (const c of candidates) {
    lines.push(`${c.nomorUrut},"${c.namaKetua}","${c.namaWakil}",${countMap.get(c.id) || 0}`)
  }
  lines.push('')
  lines.push(`Total DPT,${total}`)
  lines.push(`Sudah Memilih,${voted}`)
  setHeader(event, 'Content-Type', 'text/csv')
  setHeader(event, 'Content-Disposition', 'attachment; filename="hasil.csv"')
  return lines.join('\n')
})