<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-900 relative overflow-hidden px-4 py-10">
    <!-- Background Gradient Blobs (Efek Cahaya Modern) -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style="animation-delay: 1s;"></div>

    <!-- Kartu Login Glassmorphism -->
    <div class="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-4 ring-1 ring-indigo-500/50">
          <!-- Ikon Voting / Shield -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">E-Voting {{ settings.namaOrganisasi }}</h1>
        <p class="text-slate-400 mt-2 text-sm">Masuk untuk mengakses panel pemilihan {{ settings.namaMadrasah }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- Username Input -->
        <div>
          <label for="username" class="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="admin"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
            <!-- Toggle Show/Hide Password -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 w-10 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          {{ error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isLoading ? 'Memproses...' : 'Masuk ke Sistem' }}</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center border-t border-white/10 pt-6">
        <p class="text-slate-400 text-sm">
          Belum punya akun atau lupa password?
          <a href="#" class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors ml-1">Hubungi Administrator</a>
        </p>
      </div>
    </div>

    <!-- Tautan kembali: menempel di bawah kartu login -->
    <div class="relative z-10 mt-5 flex justify-center">
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
        <span aria-hidden="true">&larr;</span>
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { settings } = useSettings()

const form = ref({
  username: '',
  password: ''
})
const error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const { show: showLoading, hide: hideLoading } = useLoading()

const handleSubmit = async () => {
  error.value = ''

  if (!form.value.username || !form.value.password) {
    error.value = 'Mohon isi username dan password'
    return
  }

  isLoading.value = true
  showLoading('Memverifikasi akun...')

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: form.value.username,
        password: form.value.password
      }
    })

    if (response.success) {
      // Cookie sesi (ditandatangani server) sudah otomatis tersimpan oleh browser
      // dari header Set-Cookie pada respons login. Jangan set ulang dari sisi klien.
      // Tunggu sampai perpindahan halaman selesai agar overlay tidak hilang lebih dulu.
      await navigateTo('/admin/dashboard', { replace: true })
      return
    } else {
      throw new Error(response.message || 'Login gagal')
    }
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Terjadi kesalahan saat login. Silakan coba lagi.'
  } finally {
    isLoading.value = false
    hideLoading()
  }
}
</script>
