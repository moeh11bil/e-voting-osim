<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden flex items-center justify-center px-4">

    <!-- Background Gradient Blobs (Konsisten dengan halaman lain) -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse" style="animation-delay: 1s;"></div>

    <!-- Main Card -->
    <div class="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-500">

      <!-- Success Icon with Glow -->
      <div class="w-24 h-24 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/20 relative">
        <!-- Animated Checkmark -->
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-[checkmark_0.5s_ease-out_forwards]">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <!-- Subtle pulse ring -->
        <div class="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping"></div>
      </div>

      <!-- Text Content -->
      <h1 class="text-3xl font-bold text-white mb-3 tracking-tight">Terima Kasih!</h1>
      <p class="text-slate-300 mb-2 text-lg">Suara Anda telah berhasil direkam.</p>
      <p class="text-slate-400 text-sm mb-8">Hak suara Anda telah digunakan dan tidak dapat digunakan kembali.</p>

      <!-- Countdown Visual -->
      <div class="space-y-3 mb-8">
        <div class="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider font-semibold">
          <span>Mengalihkan...</span>
          <span class="text-emerald-400">{{ countdown }} detik</span>
        </div>
        <!-- Progress Bar -->
        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-linear"
            :style="{ width: (countdown / 5) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <!-- Manual Redirect Button -->
      <button
        @click="handleManualRedirect"
        class="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <span>Kembali ke Halaman Utama</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import eksplisit untuk mencegah error auto-import
import { ref, onMounted, onUnmounted } from 'vue'

const countdown = ref(5)
const voterCookie = useCookie<any>('voter')
// const authCookie = useCookie<any>('auth') // Jika diperlukan, bisa diaktifkan

let timer: ReturnType<typeof setInterval> | null = null

const handleManualRedirect = () => {
  if (timer) clearInterval(timer)
  voterCookie.value = null
  navigateTo('/')
}

onMounted(() => {
  // Hapus cookie pemilih segera saat halaman dimuat
  voterCookie.value = null

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer)
      navigateTo('/')
    }
  }, 1000)
})

onUnmounted(() => {
  // Bersihkan interval jika komponen dihancurkan sebelum waktu habis
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* Animasi custom untuk checkmark agar terlihat lebih hidup */
@keyframes checkmark {
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;
  }
  100% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
