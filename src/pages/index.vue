<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden flex flex-col">

    <!-- Background Gradient Blobs (Konsisten dengan seluruh aplikasi) -->
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none animate-pulse" style="animation-delay: 1.5s;"></div>

    <!-- Subtle Grid Pattern Overlay (Opsional, menambah kesan tech/digital) -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

    <!-- Main Content -->
    <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">

      <div class="w-full max-w-2xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">

        <!-- Official Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide mb-8 backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          PEMILIHAN {{ settings.namaOrganisasi }} TAHUN AJARAN {{ settings.tahunPelajaran }}
        </div>


        <!-- Typography -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
          E-Voting <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{{ settings.namaOrganisasi }}</span>
        </h1>
        <p class="text-lg sm:text-xl text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
          Sistem Pemilihan Ketua & Wakil Ketua {{ settings.namaOrganisasi }} {{ settings.namaMadrasah }} yang <span class="text-slate-200 font-medium">Aman, Anonim, dan Real-Time</span>.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">

          <!-- Primary CTA: Vote -->
          <NuxtLink
            to="/vote"
            class="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span class="relative z-10">Masuk Bilik Suara</span>
          </NuxtLink>

        </div>

        <!-- Secondary Actions -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center mt-6 w-full max-w-md mx-auto">
          <NuxtLink
            to="/results"
            class="group flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-indigo-400 transition-colors"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Lihat Hasil Sementara
          </NuxtLink>

          <NuxtLink
            to="/login"
            class="group flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-purple-400 transition-colors"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
            Login Panitia
          </NuxtLink>
        </div>

        <!-- Trust Indicator Footer -->
        <div class="mt-12 pt-8 border-t border-white/5">
          <p class="text-xs text-slate-500 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Data suara Anda dienkripsi, anonim, dan tidak dapat dilacak kembali ke identitas Anda.
          </p>
        </div>

      </div>
    </main>

    <!-- Simple Footer -->
    <footer class="relative z-10 py-6 text-center text-xs text-slate-600 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
      &copy; {{ new Date().getFullYear() }} Panitia Pemilihan {{ settings.namaOrganisasi }} {{ settings.namaMadrasah }}. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // Pastikan halaman ini tidak terbungkus layout admin jika Anda memilikinya
})

const { settings } = useSettings()
</script>
