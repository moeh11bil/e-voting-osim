<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
    <!-- Background Gradient Blobs (Konsisten dengan halaman login) -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse" style="animation-delay: 1s;"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12">

      <!-- Header -->
      <div class="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-4 ring-1 ring-indigo-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Pilih Pasangan Calon</h1>
        <p class="text-slate-400 mt-3 text-base sm:text-lg">Klik paslon pilihan Anda, lalu konfirmasi pilihan Anda</p>

        <!-- Voter Info Badge -->
        <div v-if="voter" class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {{ (voter.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="text-left">
            <p class="text-sm font-semibold text-white leading-tight">{{ voter.nama }}</p>
            <p class="text-xs text-slate-400">{{ voter.kelas }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-12 w-12 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-slate-400 animate-pulse">Memuat daftar pasangan calon...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="candidates.length === 0" class="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl border-dashed">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-slate-500 mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <p class="text-slate-400">Belum ada pasangan calon yang terdaftar.</p>
      </div>

      <!-- Candidates Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div
          v-for="c in candidates"
          :key="c.id"
          class="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
          @click="selectCandidate(c)"
        >
          <!-- Foto Paslon -->
          <div class="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
            <img v-if="c.foto" :src="c.foto" alt="Foto paslon" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span class="text-xs font-medium uppercase tracking-wider">Foto Belum Diunggah</span>
            </div>

            <!-- Nomor Urut Badge -->
            <div class="absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/30 ring-2 ring-white/20">
              {{ c.nomorUrut ?? c.nomor }}
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Info Section -->
          <div class="p-6 space-y-4">
            <div class="pb-4 border-b border-white/5">
              <h3 class="text-xl font-bold text-white leading-snug">
                {{ c.namaKetua ?? c.nama_ketua }}
                <span class="text-indigo-400 font-light">&</span>
                {{ c.namaWakil ?? c.nama_wakil }}
              </h3>
            </div>

            <div class="space-y-4 text-sm">
              <div>
                <div class="flex items-center gap-2 mb-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <p class="text-indigo-300 font-semibold text-xs uppercase tracking-wider">Visi</p>
                </div>
                <p class="text-slate-300 leading-relaxed whitespace-pre-line">{{ c.visi }}</p>
              </div>

              <div>
                <div class="flex items-center gap-2 mb-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  <p class="text-purple-300 font-semibold text-xs uppercase tracking-wider">Misi</p>
                </div>
                <p class="text-slate-300 leading-relaxed whitespace-pre-line">{{ c.misi }}</p>
              </div>
            </div>

            <!-- Action Button -->
            <button
              @click.stop="selectCandidate(c)"
              class="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Pilih Paslon Ini
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-10 text-center">
        <p class="text-xs text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline mr-1"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Pilihan Anda aman, anonim, dan tidak dapat diubah setelah dikonfirmasi.
        </p>
      </div>
    </div>

    <!-- Modal Konfirmasi -->
    <div v-if="selected" class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4 py-6 overflow-y-auto animate-in fade-in duration-200">
      <div class="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <!-- Header Modal -->
        <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/90">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Konfirmasi Pilihan</h3>
          </div>
          <button @click="selected = null" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>

        <!-- Body Modal -->
        <div class="p-6 space-y-5">
          <p class="text-slate-300">Anda akan memilih pasangan calon:</p>

          <!-- Selected Candidate Card -->
          <div class="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/30 ring-2 ring-white/20 shrink-0">
                {{ selected.nomorUrut ?? selected.nomor }}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-white text-lg leading-tight break-words">
                  {{ selected.namaKetua ?? selected.nama_ketua }}
                </p>
                <p class="text-sm text-indigo-300 break-words">& {{ selected.namaWakil ?? selected.nama_wakil }}</p>
              </div>
            </div>
          </div>

          <!-- Warning -->
          <div class="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400 shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
            <p class="text-sm text-amber-200 leading-relaxed">
              <span class="font-semibold">Perhatian:</span> Pilihan Anda tidak dapat diubah setelah dikonfirmasi. Pastikan pilihan Anda sudah benar.
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {{ error }}
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-2">
            <button
              @click="selected = null"
              :disabled="submitting"
              class="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium disabled:opacity-50"
            >
              Batal
            </button>
            <button
              @click="submitVote"
              :disabled="submitting"
              class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg v-if="submitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ submitting ? 'Menyimpan...' : 'Konfirmasi Pilihan' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import eksplisit untuk mencegah error auto-import
import { ref, onMounted } from 'vue'

const voter = useCookie<any>('voter')
const candidates = ref<any[]>([])
const loading = ref(true)
const selected = ref<any>(null)
const submitting = ref(false)
const error = ref('')

if (!voter.value) {
  navigateTo('/vote')
}

onMounted(async () => {
  try {
    const res: any = await $fetch('/api/candidates')
    candidates.value = res.candidates || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const selectCandidate = (c: any) => {
  selected.value = c
  error.value = ''
}

const submitVote = async () => {
  if (!selected.value) return
  submitting.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/api/voting/vote', {
      method: 'POST',
      body: { candidateId: selected.value.id },
    })
    if (res.success) {
      selected.value = null
      return navigateTo('/thanks')
    } else {
      throw new Error(res.message)
    }
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Gagal menyimpan suara'
  } finally {
    submitting.value = false
  }
}
</script>
