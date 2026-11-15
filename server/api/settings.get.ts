import { prisma } from '../lib/prisma'
import { defineEventHandler } from 'h3'

/** Nilai cadangan bila baris pengaturan belum dibuat (mis. DB baru). */
export const DEFAULT_SETTINGS = {
  id: 1,
  namaMadrasah: 'Madrasah',
  npsn: null,
  alamat: null,
  telepon: null,
  email: null,
  website: null,
  kepalaMadrasah: null,
  namaOrganisasi: 'OSIM',
  tahunPelajaran: '2024/2025',
}

export default defineEventHandler(async () => {
  try {
    const settings = await prisma.madrasahSetting.findUnique({ where: { id: 1 } })
    return { success: true, settings: settings ?? DEFAULT_SETTINGS }
  } catch (e) {
    // Jangan sampai halaman publik gagal tampil hanya karena tabel belum ada.
    console.error('Gagal memuat pengaturan madrasah:', e)
    return { success: true, settings: DEFAULT_SETTINGS }
  }
})
