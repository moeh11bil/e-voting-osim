import { defineEventHandler } from 'h3'
import { clearCookie } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  clearCookie(event, 'auth')
  clearCookie(event, 'voter')
  return { success: true, message: 'Logout berhasil' }
})