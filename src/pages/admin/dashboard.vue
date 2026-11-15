<template>
  <div class="space-y-6">


        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total DPT -->
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded">Total DPT</span>
            </div>
            <h3 class="text-3xl font-bold text-white">{{ stats.totalDPT }}</h3>
            <p class="text-sm text-slate-400 mt-1">Siswa terdaftar</p>
          </div>

          <!-- Sudah Memilih -->
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Suara Masuk</span>
            </div>
            <h3 class="text-3xl font-bold text-white">{{ stats.sudahMemilih }}</h3>
            <p class="text-sm text-slate-400 mt-1">Suara masuk</p>
          </div>

          <!-- Belum Memilih -->
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              </div>
              <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded">Sisa</span>
            </div>
            <h3 class="text-3xl font-bold text-white">{{ stats.belumMemilih }}</h3>
            <p class="text-sm text-slate-400 mt-1">Belum menggunakan hak suara</p>
          </div>

          <!-- Turnout Rate -->
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <span class="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded">Persentase</span>
            </div>
            <h3 class="text-3xl font-bold text-white">{{ stats.turnout }}%</h3>
            <div class="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000" :style="{ width: stats.turnout + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Real-time Vote Preview (Mockup Chart) -->
          <div class="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-white">Perolehan Suara Sementara</h3>
              <NuxtLink to="/admin/results" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Lihat Detail Lengkap &rarr;</NuxtLink>
            </div>

            <div class="space-y-6">
              <div v-for="(paslon, index) in candidates" :key="paslon.id" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-indigo-400">{{ paslon.nomor }}</span>
                    <div>
                      <p class="font-medium text-white">{{ paslon.nama }}</p>
                      <p class="text-xs text-slate-400">{{ paslon.suara }} suara</p>
                    </div>
                  </div>
                  <span class="font-bold text-white">{{ paslon.persentase }}%</span>
                </div>
                <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    :class="index === 0 ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gradient-to-r from-slate-600 to-slate-500'"
                    :style="{ width: paslon.persentase + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Aksi Cepat</h3>
            <div class="space-y-3">
              <NuxtLink to="/admin/voters" class="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                Import DPT (Excel/CSV)
              </NuxtLink>
              <NuxtLink to="/admin/voters" class="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                Generate Token Massal
              </NuxtLink>
              <a href="/api/results/export" class="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Export Laporan (CSV)
              </a>
            </div>

            <div class="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400 shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                <div>
                  <h4 class="text-sm font-semibold text-amber-400">Peringatan Keamanan</h4>
                  <p class="text-xs text-amber-200/70 mt-1">Pastikan tidak ada siswa yang memegang lebih dari satu token. Token yang sudah digunakan tidak dapat di-reset.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', title: 'Dashboard Overview' })

const stats = ref({
  totalDPT: 0,
  sudahMemilih: 0,
  belumMemilih: 0,
  turnout: 0,
  totalVotes: 0,
})

const candidates = ref<any[]>([])

const loading = ref(false)

async function loadData() {
  loading.value = true
  try {
    const res: any = await $fetch('/api/stats')
    if (res) {
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
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
