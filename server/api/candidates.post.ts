import { prisma } from '../lib/prisma'
import { defineEventHandler, readBody, readMultipartFormData, getHeader } from 'h3'
import { requireAdmin } from '../lib/auth'
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'
import { join } from 'node:path'

async function savePhoto(file: any): Promise<string | null> {
  if (!file?.data) return null
  const dir = join(process.cwd(), 'public', 'uploads', 'candidates')
  mkdirSync(dir, { recursive: true })
  const filename = `candidate-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`
  const buffer = await sharp(file.data).webp({ quality: 80 }).toBuffer()
  writeFileSync(join(dir, filename), buffer)
  return `/uploads/candidates/${filename}`
}

export default defineEventHandler(async (event) => {
  try { requireAdmin(event) } catch (e: any) { return { success: false, message: 'Unauthorized' } }

  const contentType = getHeader(event, 'content-type') || ''
  let fields: Record<string, any> = {}
  let photoFile: any = null

  if (contentType.includes('multipart/form-data')) {
    const parts = await readMultipartFormData(event)
    if (parts) {
      for (const part of parts) {
        if (part.filename) photoFile = part
        else fields[part.name || ''] = part.data.toString('utf8')
      }
    }
  } else {
    fields = (await readBody(event)) || {}
  }

  const nomorUrut = fields.nomorUrut ?? fields.nomor_urut
  const namaKetua = fields.namaKetua ?? fields.nama_ketua
  const namaWakil = fields.namaWakil ?? fields.nama_wakil
  const visi = fields.visi
  const misi = fields.misi

  if (!nomorUrut || !namaKetua || !namaWakil || !visi || !misi) {
    return { success: false, message: 'Semua field wajib diisi' }
  }

  let foto: string | null = null
  if (photoFile) {
    foto = await savePhoto(photoFile)
  } else if (fields.foto) {
    foto = fields.foto
  }

  try {
    const candidate = await prisma.candidate.create({
      data: {
        nomorUrut: parseInt(String(nomorUrut)),
        namaKetua: String(namaKetua),
        namaWakil: String(namaWakil),
        visi: String(visi),
        misi: String(misi),
        foto,
      },
    })
    return { success: true, message: 'Paslon berhasil ditambahkan', id: candidate.id }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal menyimpan paslon' }
  }
})