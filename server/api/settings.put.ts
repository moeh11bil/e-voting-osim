import { prisma } from '../lib/prisma'
import { defineEventHandler, readBody } from 'h3'
import { requireAdmin } from '../lib/auth'

/** Ambil string terpotong, atau null bila kosong. */
function optional(value: unknown, max: number): string | null {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

/** Ambil string wajib dengan batas panjang. */
function required(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max)
}

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }

  const body = (await readBody(event)) || {}

  const namaMadrasah = required(body.namaMadrasah, 150)
  const tahunPelajaran = required(body.tahunPelajaran, 20)
  const namaOrganisasi = required(body.namaOrganisasi, 50)

  if (!namaMadrasah) return { success: false, message: 'Nama madrasah wajib diisi' }
  if (!tahunPelajaran) return { success: false, message: 'Tahun pelajaran wajib diisi' }
  if (!namaOrganisasi) return { success: false, message: 'Nama organisasi wajib diisi' }

  const data = {
    namaMadrasah,
    tahunPelajaran,
    namaOrganisasi,
    npsn: optional(body.npsn, 20),
    alamat: optional(body.alamat, 255),
    telepon: optional(body.telepon, 30),
    email: optional(body.email, 100),
    website: optional(body.website, 100),
    kepalaMadrasah: optional(body.kepalaMadrasah, 100),
  }

  try {
    const settings = await prisma.madrasahSetting.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    })
    return { success: true, message: 'Pengaturan madrasah berhasil disimpan', settings }
  } catch (e: any) {
    console.error('Gagal menyimpan pengaturan madrasah:', e)
    return { success: false, message: e?.message || 'Gagal menyimpan pengaturan' }
  }
})
