import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody } from 'h3'
import { requireAdmin } from '../../lib/auth'
import { generateUniqueTokens } from '../../lib/token'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }

  const body = (await readBody(event)) || {}
  const all = Boolean(body.all)

  const voters = await prisma.voter.findMany()
  const existingTokens = new Set(voters.map((v: any) => v.token).filter(Boolean) as string[])

  const targets = voters.filter((v: any) => !v.isVoted && (all || !v.token))
  if (targets.length === 0) {
    return { success: true, message: 'Tidak ada pemilih yang perlu token', count: 0 }
  }

  const tokens = generateUniqueTokens(targets.length, existingTokens)

  let count = 0
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]!
    const token = tokens[i]!
    await prisma.voter.update({ where: { id: target.id }, data: { token } })
    count++
  }

  return { success: true, message: `${count} token berhasil digenerate`, count }
})