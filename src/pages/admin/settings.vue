<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div class="flex items-center gap-4 min-w-0">
        <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h.01"/><path d="M9 12h.01"/><path d="M9 15h.01"/><path d="M9 18h.01"/></svg>
        </div>
        <div class="min-w-0">
          <h3 class="text-xl font-bold text-white tracking-tight">Pengaturan Madrasah</h3>
          <p class="text-sm text-slate-400 mt-0.5">Identitas madrasah dan pemilihan yang tampil di seluruh halaman.</p>
        </div>
      </div>
      <button
        @click="save"
        :disabled="saving"
        class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
      >
        <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        {{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
      </button>
    </div>

    <!-- Notifications -->
    <div v-if="error" class="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      {{ error }}
    </div>
    <div v-if="success" class="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      {{ success }}
    </div>

    <form @submit.prevent="save" class="space-y-6">

      <!-- Identitas Madrasah -->
      <section class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div class="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <h4 class="font-semibold text-white">Identitas Madrasah</h4>
            <p class="text-xs text-slate-400">Nama dan informasi resmi madrasah.</p>
          </div>
        </div>

        <div class="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div class="sm:col-span-2">
            <label for="namaMadrasah" class="block text-sm font-medium text-slate-300 mb-1.5">Nama Madrasah <span class="text-red-400">*</span></label>
            <input id="namaMadrasah" v-model="form.namaMadrasah" required maxlength="150" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: MTs Negeri 1 Kota" />
            <p class="text-xs text-slate-500 mt-1.5">Tampil di halaman utama, login, dan kartu token.</p>
          </div>

          <div>
            <label for="npsn" class="block text-sm font-medium text-slate-300 mb-1.5">NPSN</label>
            <input id="npsn" v-model="form.npsn" maxlength="20" inputmode="numeric" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Nomor Pokok Sekolah Nasional" />
          </div>

          <div>
            <label for="kepalaMadrasah" class="block text-sm font-medium text-slate-300 mb-1.5">Kepala Madrasah</label>
            <input id="kepalaMadrasah" v-model="form.kepalaMadrasah" maxlength="100" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Nama kepala madrasah" />
          </div>

          <div class="sm:col-span-2">
            <label for="alamat" class="block text-sm font-medium text-slate-300 mb-1.5">Alamat</label>
            <textarea id="alamat" v-model="form.alamat" rows="2" maxlength="255" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none" placeholder="Jalan, kelurahan, kecamatan, kota/kabupaten, provinsi"></textarea>
          </div>

          <div>
            <label for="telepon" class="block text-sm font-medium text-slate-300 mb-1.5">Telepon</label>
            <input id="telepon" v-model="form.telepon" type="tel" maxlength="30" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: (021) 1234567" />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input id="email" v-model="form.email" type="email" maxlength="100" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: info@madrasah.sch.id" />
          </div>

          <div class="sm:col-span-2">
            <label for="website" class="block text-sm font-medium text-slate-300 mb-1.5">Website</label>
            <input id="website" v-model="form.website" maxlength="100" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: https://madrasah.sch.id" />
          </div>
        </div>
      </section>

      <!-- Identitas Pemilihan -->
      <section class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div class="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <h4 class="font-semibold text-white">Identitas Pemilihan</h4>
            <p class="text-xs text-slate-400">Nama organisasi dan tahun pelajaran yang sedang berjalan.</p>
          </div>
        </div>

        <div class="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label for="namaOrganisasi" class="block text-sm font-medium text-slate-300 mb-1.5">Nama Organisasi <span class="text-red-400">*</span></label>
            <input id="namaOrganisasi" v-model="form.namaOrganisasi" required maxlength="50" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: OSIM" />
            <p class="text-xs text-slate-500 mt-1.5">Digunakan pada judul "E-Voting ..." dan badge pemilihan.</p>
          </div>

          <div>
            <label for="tahunPelajaran" class="block text-sm font-medium text-slate-300 mb-1.5">Tahun Pelajaran <span class="text-red-400">*</span></label>
            <input id="tahunPelajaran" v-model="form.tahunPelajaran" required maxlength="20" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: 2024/2025" />
          </div>
        </div>
      </section>

      <!-- Preview -->
      <section class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Pratinjau Tampilan Publik</p>
        <div class="rounded-xl border border-white/10 bg-slate-800/40 p-4 text-center">
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold tracking-wide">
            PEMILIHAN {{ form.namaOrganisasi || 'OSIM' }} TAHUN AJARAN {{ form.tahunPelajaran || '2024/2025' }}
          </p>
          <p class="mt-3 text-lg font-bold text-white">E-Voting {{ form.namaOrganisasi || 'OSIM' }}</p>
          <p class="text-sm text-slate-400">Sistem Pemilihan Ketua &amp; Wakil Ketua {{ form.namaOrganisasi || 'OSIM' }} {{ form.namaMadrasah || 'Madrasah' }}</p>
          <p class="text-xs text-slate-500 mt-2">&copy; {{ new Date().getFullYear() }} Panitia Pemilihan {{ form.namaOrganisasi || 'OSIM' }} {{ form.namaMadrasah || 'Madrasah' }}.</p>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button type="button" @click="reset" :disabled="saving" class="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium disabled:opacity-70">
          Batalkan Perubahan
        </button>
        <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
          <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Import eksplisit untuk mencegah error auto-import
import { ref, watch } from 'vue'

definePageMeta({ layout: 'admin', title: 'Pengaturan Madrasah' })

const { settings, refresh } = useSettings()

const form = ref({
  namaMadrasah: '',
  npsn: '',
  alamat: '',
  telepon: '',
  email: '',
  website: '',
  kepalaMadrasah: '',
  namaOrganisasi: '',
  tahunPelajaran: '',
})

const saving = ref(false)
const error = ref('')
const success = ref('')
let successTimer: ReturnType<typeof setTimeout> | null = null

function fill(value: any) {
  form.value = {
    namaMadrasah: value?.namaMadrasah ?? '',
    npsn: value?.npsn ?? '',
    alamat: value?.alamat ?? '',
    telepon: value?.telepon ?? '',
    email: value?.email ?? '',
    website: value?.website ?? '',
    kepalaMadrasah: value?.kepalaMadrasah ?? '',
    namaOrganisasi: value?.namaOrganisasi ?? '',
    tahunPelajaran: value?.tahunPelajaran ?? '',
  }
}

// Isi formulir saat data pengaturan selesai dimuat.
watch(settings, (value) => fill(value), { immediate: true })

function flash(message: string) {
  success.value = message
  if (successTimer) clearTimeout(successTimer)
  successTimer = setTimeout(() => { success.value = '' }, 4000)
}

async function save() {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    const res: any = await $fetch('/api/settings', { method: 'PUT', body: form.value })
    if (!res?.success) throw new Error(res?.message || 'Gagal menyimpan pengaturan')
    await refresh()
    flash(res.message || 'Pengaturan berhasil disimpan.')
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Gagal menyimpan pengaturan'
  } finally {
    saving.value = false
  }
}

function reset() {
  fill(settings.value)
  error.value = ''
  success.value = ''
}
</script>
