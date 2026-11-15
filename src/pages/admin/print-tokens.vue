<template>
  <div class="print-page min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6">
    <div class="mx-auto max-w-6xl space-y-6">
    <div class="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold text-white">Cetak Kartu Token</h3>
        <p class="text-sm text-slate-400 mt-1">{{ voters.length }} kartu token siap cetak</p>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/admin/voters" class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors">Kembali</NuxtLink>
        <button @click="print" class="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          Cetak
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16 no-print">
      <svg class="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>

    <div v-else class="print-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="v in voters" :key="v.id" class="token-card bg-white text-slate-900 rounded-xl border-2 border-dashed border-slate-300 p-5 shadow-sm">
        <div class="text-center border-b border-slate-200 pb-3 mb-3">
          <p class="text-xs font-semibold text-indigo-600 uppercase tracking-widest">{{ settings.namaMadrasah }}</p>
          <p class="text-sm font-bold text-slate-800">Kartu Token Pemilih</p>
          <p class="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">{{ settings.namaOrganisasi }} &middot; {{ settings.tahunPelajaran }}</p>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between"><span class="text-slate-500">NISN</span><span class="font-mono font-semibold">{{ v.nisn }}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Nama</span><span class="font-semibold">{{ v.nama ?? v.name }}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Kelas</span><span class="font-semibold">{{ v.kelas ?? v.class }}</span></div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-200 text-center">
          <p class="text-xs text-slate-500 mb-1">Token</p>
          <p class="text-2xl font-mono font-bold tracking-widest text-indigo-600">{{ v.token || '—' }}</p>
        </div>
        <p class="text-[10px] text-slate-400 text-center mt-3">Gunakan token ini untuk masuk bilik suara. Jangan bagikan ke orang lain.</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', title: 'Cetak Kartu Token' })

const { settings } = useSettings()

const voters = ref<any[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const res: any = await $fetch('/api/voters')
    voters.value = (res.voters || res.students || []).filter((v: any) => v.token)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onMounted(load)

function print() {
  window.print()
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  .print-page {
    min-height: auto !important;
    background: #fff !important;
    color: #0f172a !important;
    padding: 0 !important;
  }
  .token-card {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none;
  }
  .print-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
}
</style>