import { prisma } from '../../lib/prisma'
import { defineEventHandler, readMultipartFormData } from 'h3'
import { requireAdmin } from '../../lib/auth'
import * as XLSX from 'xlsx'

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }

  const parts = await readMultipartFormData(event)
  const file = parts?.find((p) => p.filename)
  if (!file?.data) return { success: false, message: 'File tidak ditemukan' }

  try {
    const workbook = XLSX.read(file.data, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]!
    const sheet = workbook.Sheets[sheetName]!
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' })

    let inserted = 0
    let updated = 0
    let errors = 0

    for (const row of rows) {
      const nisn = String(row.NISN ?? row.nisn ?? row.Nisn ?? '').trim()
      const nama = String(row.Nama ?? row.nama ?? row.Name ?? row.name ?? '').trim()
      const kelas = String(row.Kelas ?? row.kelas ?? row.Class ?? row.class ?? '').trim()
      if (!nisn || !nama || !kelas) { errors++; continue }

      try {
        const existing = await prisma.voter.findUnique({ where: { nisn } })
        if (existing) {
          await prisma.voter.update({ where: { nisn }, data: { nama, kelas } })
          updated++
        } else {
          await prisma.voter.create({ data: { nisn, nama, kelas } })
          inserted++
        }
      } catch {
        errors++
      }
    }

    return { success: true, message: `Import selesai. Ditambah: ${inserted}, Diperbarui: ${updated}, Error: ${errors}` , inserted, updated, errors, total: rows.length }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Import gagal' }
  }
})