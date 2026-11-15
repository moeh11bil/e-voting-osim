<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">Hasil Pemilihan</h1>
        <p class="text-slate-400 mt-2">{{ settings.namaOrganisasi }} {{ settings.namaMadrasah }} &middot; Tahun Pelajaran {{ settings.tahunPelajaran }}</p>
        <p class="text-xs text-slate-500 mt-1">Perolehan suara sementara</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-white">{{ stats.total_students }}</p>
          <p class="text-sm text-slate-400">Total DPT</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-emerald-400">{{ stats.voted_students }}</p>
          <p class="text-sm text-slate-400">Sudah Memilih</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-indigo-400">{{ stats.participation_rate }}%</p>
          <p class="text-sm text-slate-400">Partisipasi</p>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="c in results" :key="c.id" class="bg-white/5 border border-white/10 rounded-xl p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-indigo-400">{{ c.nomor ?? c.nomorUrut }}</span>
              <div>
                <p class="font-medium text-white">{{ c.nama ?? (c.namaKetua + ' & ' + c.namaWakil) }}</p>
                <p class="text-xs text-slate-400">{{ c.suara }} suara</p>
              </div>
            </div>
            <span class="font-bold text-white">{{ c.persentase }}%</span>
          </div>
          <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" :style="{ width: c.persentase + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <NuxtLink to="/vote" class="text-indigo-400 hover:text-indigo-300">Kembali ke Bilik Suara</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSettings()

const stats = ref<any>({ total_students: 0, voted_students: 0, participation_rate: 0 })
const results = ref<any[]>([])

onMounted(async () => {
  try {
    const res: any = await $fetch('/api/results')
    stats.value = res
    results.value = (res.candidates || res.results || []).map((c: any) => ({
      ...c,
      persentase: c.persentase ?? (res.totalVotes > 0 ? Math.round((c.suara / res.totalVotes) * 100) : 0),
    }))
  } catch (e) { console.error(e) }
})
</script>