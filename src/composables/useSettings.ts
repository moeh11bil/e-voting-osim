import { computed } from 'vue'

/**
 * Data madrasah & pemilihan yang dapat diubah dari panel admin.
 * Dipakai bersama di layout admin, halaman publik, dan halaman pengaturan
 * melalui key `useFetch` yang sama agar tidak memicu permintaan berulang.
 */
export interface MadrasahSettings {
  id?: number
  namaMadrasah: string
  npsn: string | null
  alamat: string | null
  telepon: string | null
  email: string | null
  website: string | null
  kepalaMadrasah: string | null
  namaOrganisasi: string
  tahunPelajaran: string
}

/** Nilai cadangan, harus selaras dengan server/api/settings.get.ts. */
export const DEFAULT_SETTINGS: MadrasahSettings = {
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

export function useSettings() {
  const { data, refresh } = useFetch<{ success: boolean; settings: MadrasahSettings }>('/api/settings', {
    key: 'madrasah-settings',
    default: () => ({ success: true, settings: DEFAULT_SETTINGS }),
  })

  const settings = computed<MadrasahSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(data.value?.settings || {}),
  }))

  return { settings, refresh }
}
