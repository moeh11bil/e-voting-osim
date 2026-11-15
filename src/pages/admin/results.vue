<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

    <!-- Header dengan Indikator Live -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white tracking-tight">Hasil Perolehan Suara</h3>
          <p class="text-sm text-slate-400 mt-0.5">Data diperbarui secara real-time</p>
        </div>
      </div>

      <!-- Live Indicator Badge -->
      <div class="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Live Update (5s)</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total DPT -->
      <div class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-md">Total DPT</span>
        </div>
        <h4 class="text-3xl font-bold text-white font-mono tracking-tight">{{ stats.totalDPT }}</h4>
        <p class="text-xs text-slate-400 mt-1">Pemilih terdaftar</p>
      </div>

      <!-- Sudah Memilih -->
      <div class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Masuk</span>
        </div>
        <h4 class="text-3xl font-bold text-emerald-400 font-mono tracking-tight">{{ stats.sudahMemilih }}</h4>
        <p class="text-xs text-slate-400 mt-1">Suara telah tercatat</p>
      </div>

      <!-- Belum Memilih -->
      <div class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-md">Sisa</span>
        </div>
        <h4 class="text-3xl font-bold text-amber-400 font-mono tracking-tight">{{ stats.belumMemilih }}</h4>
        <p class="text-xs text-slate-400 mt-1">Belum menggunakan hak suara</p>
      </div>

      <!-- Partisipasi (Turnout) -->
      <div class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-md">Turnout</span>
        </div>
        <h4 class="text-3xl font-bold text-purple-400 font-mono tracking-tight">{{ stats.turnout }}%</h4>
        <div class="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: Math.min(stats.turnout, 100) + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Candidates Results List -->
    <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Grafik Perolehan Suara Per Paslon
      </h3>

      <div class="space-y-6">
        <div v-for="(c, index) in candidates" :key="c.id" class="group">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-4">
              <!-- Nomor Urut Badge -->
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 ring-2 ring-white/10">
                {{ c.nomor }}
              </div>
              <div>
                <p class="font-semibold text-white text-lg leading-tight">{{ c.nama }}</p>
                <p class="text-sm text-slate-400 mt-0.5 font-mono">{{ c.suara.toLocaleString('id-ID') }} suara</p>
              </div>
            </div>
            <span class="text-2xl font-bold text-white font-mono">{{ c.persentase }}%</span>
          </div>

          <!-- Progress Bar dengan Glow Effect -->
          <div class="relative w-full bg-slate-800/80 h-4 rounded-full overflow-hidden border border-white/5">
            <div
              class="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
              :class="index === 0 ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-gradient-to-r from-slate-600 to-slate-500'"
              :style="{ width: (c.suara > 0 ? Math.max(c.persentase, 2) : 0) + '%' }"
            >
              <!-- Optional: Small shine effect on the bar -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        <!-- Fallback jika tidak ada data -->
        <div v-if="candidates.length === 0" class="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <p class="text-slate-400">Belum ada data perolehan suara.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// Import eksplisit untuk mencegah error auto-import
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: 'admin', title: 'Hasil Real-Time' })

const stats = ref<any>({ totalDPT: 0, sudahMemilih: 0, belumMemilih: 0, turnout: 0, totalVotes: 0 })
const candidates = ref<any[]>([])
let refreshTimer: ReturnType<typeof setInterval> | null = null

async function load() {
  try {
    const res: any = await $fetch('/api/stats')
    stats.value.totalDPT = res.totalDPT ?? 0
    stats.value.sudahMemilih = res.sudahMemilih ?? 0
    stats.value.belumMemilih = res.belumMemilih ?? 0
    stats.value.turnout = res.turnout ?? 0
    stats.value.totalVotes = res.totalVotes ?? 0

    candidates.value = (res.candidates || []).map((c: any) => ({
      id: c.id,
      nomor: c.nomor ?? c.nomorUrut,
      nama: c.nama,
      suara: c.suara ?? 0,
      persentase: stats.value.totalVotes > 0 ? Math.round((c.suara / stats.value.totalVotes) * 100) : 0,
    }))

    // Opsional: Urutkan kandidat berdasarkan suara terbesar ke terkecil
    candidates.value.sort((a, b) => b.suara - a.suara)

  } catch (e) {
    console.error("Gagal memuat statistik:", e)
    // Jangan biarkan error menghentikan interval
  }
}

onMounted(() => {
  load()
  // Auto-refresh setiap 5 detik
  refreshTimer = setInterval(load, 5000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<style scoped>
/* Animasi shimmer halus untuk progress bar */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
