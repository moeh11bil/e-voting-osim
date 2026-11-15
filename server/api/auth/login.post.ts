import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody } from 'h3'
import { compare } from 'bcrypt'
import { setAuthCookie } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body || {}

    if (!username || !password) {
      return { success: false, message: 'Username dan password wajib diisi' }
    }

    const admin = await prisma.admin.findUnique({ where: { username } })
    if (!admin) {
      return { success: false, message: 'Username atau password salah' }
    }

    const isPasswordValid = await compare(password, admin.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Username atau password salah' }
    }

    setAuthCookie(event, { id: admin.id, username: admin.username, nama: admin.nama })

    return {
      success: true,
      message: 'Login berhasil',
      user: { id: admin.id, username: admin.username, nama: admin.nama },
    }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, message: 'Terjadi kesalahan server saat login' }
  }
})