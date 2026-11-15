export function generateToken(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateUniqueTokens(count: number, existing: Set<string> = new Set()): string[] {
  const tokens: string[] = []
  while (tokens.length < count) {
    const t = generateToken()
    if (!existing.has(t) && !tokens.includes(t)) {
      tokens.push(t)
    }
  }
  return tokens
}