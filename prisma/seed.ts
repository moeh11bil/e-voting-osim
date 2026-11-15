import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const nama = process.env.ADMIN_NAMA || 'Admin Panitia'
  const password = process.env.ADMIN_PASSWORD || 'admin123'

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { username },
    update: { nama, password: passwordHash },
    create: { username, nama, password: passwordHash },
  })

  console.log(`✔ Admin siap: ${admin.username} (nama: ${admin.nama})`)

  // Pengaturan awal madrasah. Saat seed dijalankan ulang, data yang sudah
  // diubah lewat panel admin TIDAK ditimpa (update sengaja dikosongkan).
  const settings = await prisma.madrasahSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      namaMadrasah: process.env.MADRASAH_NAMA || 'Madrasah',
      namaOrganisasi: process.env.MADRASAH_ORGANISASI || 'OSIM',
      tahunPelajaran: process.env.MADRASAH_TAHUN_PELAJARAN || '2024/2025',
      alamat: process.env.MADRASAH_ALAMAT || null,
      telepon: process.env.MADRASAH_TELEPON || null,
      email: process.env.MADRASAH_EMAIL || null,
      website: process.env.MADRASAH_WEBSITE || null,
      npsn: process.env.MADRASAH_NPSN || null,
      kepalaMadrasah: process.env.MADRASAH_KEPALA || null,
    },
  })

  console.log(`✔ Pengaturan madrasah siap: ${settings.namaMadrasah} (${settings.tahunPelajaran})`)
}

main()
  .catch((e) => {
    console.error('Seed gagal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
