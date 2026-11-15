import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody } from 'h3'
import { clearCookie, getVoterSession } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  // Sumber kebenaran identitas pemilih HANYA dari cookie sesi yang ditandatangani
  // (di-set saat /api/voting/verify berhasil). `nisn` dari body tidak dipercaya.
  const session = getVoterSession(event)
  if (!session) {
    return { success: false, message: 'Sesi tidak valid, silakan verifikasi ulang' }
  }

  const body = (await readBody(event)) || {}
  const candidateId = parseInt(String(body.candidateId ?? body.candidate_id))
  if (!candidateId || Number.isNaN(candidateId)) {
    return { success: false, message: 'Pilihan tidak valid' }
  }

  try {
    await prisma.$transaction(async (tx: any) => {
      const voter = await tx.voter.findUnique({ where: { nisn: session.nisn } })
      if (!voter) throw new Error('Pemilih tidak ditemukan')
      if (voter.isVoted) throw new Error('Anda sudah menggunakan hak suara')

      const candidate = await tx.candidate.findUnique({ where: { id: candidateId } })
      if (!candidate) throw new Error('Paslon tidak ditemukan')

      // Klaim hak suara secara atomik: hanya berhasil bila isVoted masih false.
      // Mencegah dua request paralel mencatat dua suara untuk pemilih yang sama.
      const claimed = await tx.voter.updateMany({
        where: { id: voter.id, isVoted: false },
        data: { isVoted: true, votedAt: new Date(), token: null },
      })
      if (claimed.count !== 1) throw new Error('Anda sudah menggunakan hak suara')

      await tx.vote.create({ data: { candidateId, voterId: voter.id } })
    })

    clearCookie(event, 'voter')
    return { success: true, message: 'Suara berhasil direkam' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal merekam suara' }
  }
})
