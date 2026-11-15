<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-900 text-slate-100 flex flex-col">
    <!-- Background Gradient Blobs -->
    <div class="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-600/30 blur-3xl animate-pulse"></div>
    <div class="pointer-events-none absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-72 h-72 rounded-full bg-purple-600/30 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>

    <!-- Konten utama: kolom di tengah; kartu dan tautan kembali berdampingan rapat -->
    <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
      <div class="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 mb-4 ring-1 ring-indigo-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight">Bilik Suara</h1>
          <p class="text-slate-400 mt-2 text-sm">Masukkan NISN dan Token untuk memilih</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label for="nisn" class="block text-sm font-medium text-slate-300 mb-1.5">NISN</label>
            <input
              id="nisn"
              v-model="form.nisn"
              type="text"
              required
              autocomplete="off"
              inputmode="numeric"
              class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Masukkan NISN"
            />
          </div>
          <div>
            <label for="token" class="block text-sm font-medium text-slate-300 mb-1.5">Token</label>
            <input
              id="token"
              v-model="form.token"
              type="text"
              required
              autocomplete="off"
              autocapitalize="characters"
              spellcheck="false"
              maxlength="10"
              class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Token 6 karakter"
            />
          </div>

          <div v-if="error" class="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <span>{{ error }}</span>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ isLoading ? 'Memverifikasi...' : 'Masuk Bilik Suara' }}
          </button>
        </form>

        <div class="mt-6 pt-5 border-t border-white/10 text-center">
          <NuxtLink to="/results" class="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            Lihat Hasil Pemilihan
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Tautan kembali: menempel di bawah kartu, bukan di dasar layar -->
      <div class="mt-5 flex justify-center">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <span aria-hidden="true">&larr;</span>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const form = ref({ nisn: '', token: '' })
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true
  try {
    const res: any = await $fetch('/api/voting/verify', {
      method: 'POST',
      body: {
        nisn: form.value.nisn.trim(),
        token: form.value.token.trim().toUpperCase(),
      },
    })
    if (res.success) {
      return navigateTo('/ballot')
    } else {
      throw new Error(res.message)
    }
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Verifikasi gagal'
  } finally {
    isLoading.value = false
  }
}
</script>
