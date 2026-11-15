import { prisma } from '../../lib/prisma'
import { defineEventHandler, readBody, readMultipartFormData, getHeader, getRouterParam } from 'h3'
import { requireAdmin } from '../../lib/auth'
import { mkdirSync, writeFileSync, unlinkSync } from 'node:fs'
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
  try { requireAdmin(event) } catch { return { success: false, message: 'Unauthorized' } }

  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) return { success: false, message: 'ID tidak valid' }

  const existing = await prisma.candidate.findUnique({ where: { id } })
  if (!existing) return { success: false, message: 'Paslon tidak ditemukan' }

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

  const nomorUrut = fields.nomorUrut ?? fields.nomor_urut ?? existing.nomorUrut
  const namaKetua = fields.namaKetua ?? fields.nama_ketua ?? existing.namaKetua
  const namaWakil = fields.namaWakil ?? fields.nama_wakil ?? existing.namaWakil
  const visi = fields.visi ?? existing.visi
  const misi = fields.misi ?? existing.misi

  let foto = existing.foto
  if (photoFile) {
    const newPath = await savePhoto(photoFile)
    if (newPath) {
      if (existing.foto) {
        const oldPath = join(process.cwd(), 'public', existing.foto.replace(/^\//, ''))
        try { unlinkSync(oldPath) } catch {}
      }
      foto = newPath
    }
  } else if (fields.foto !== undefined) {
    foto = fields.foto || null
  }

  try {
    await prisma.candidate.update({
      where: { id },
      data: {
        nomorUrut: parseInt(String(nomorUrut)),
        namaKetua: String(namaKetua),
        namaWakil: String(namaWakil),
        visi: String(visi),
        misi: String(misi),
        foto,
      },
    })
    return { success: true, message: 'Paslon berhasil diperbarui' }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Gagal memperbarui paslon' }
  }
})