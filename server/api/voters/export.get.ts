import { prisma } from '../../lib/prisma'
import { defineEventHandler, setHeader } from 'h3'
import { requireAdmin } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return 'Unauthorized' }
  const voters = await prisma.voter.findMany({ orderBy: { nama: 'asc' } })
  const settings = await prisma.madrasahSetting.findUnique({ where: { id: 1 } })
  const lines: string[] = []
  if (settings) {
    lines.push(`Madrasah,"${settings.namaMadrasah.replace(/"/g, '""')}"`)
    if (settings.npsn) lines.push(`NPSN,"${settings.npsn}"`)
    lines.push(`Organisasi,"${settings.namaOrganisasi}"`)
    lines.push(`Tahun Pelajaran,"${settings.tahunPelajaran}"`)
    lines.push('')
  }
  lines.push('NISN,Nama,Kelas,Token,Status,VotedAt')
  for (const v of voters) {
    lines.push(`${v.nisn},"${v.nama}",${v.kelas},${v.token || ''},${v.isVoted ? 'SUDAH_MEMILIH' : 'BELUM_MEMILIH'},${v.votedAt ? v.votedAt.toISOString() : ''}`)
  }
  setHeader(event, 'Content-Type', 'text/csv')
  setHeader(event, 'Content-Disposition', 'attachment; filename="dpt.csv"')
  return lines.join('\n')
})