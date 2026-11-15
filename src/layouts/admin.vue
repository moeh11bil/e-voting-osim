<template>
  <div class="h-screen bg-slate-900 text-slate-100 flex relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"></div>

    <aside :class="[
      'fixed lg:static lg:h-full inset-y-0 left-0 z-50 w-64 shrink-0 flex flex-col bg-slate-900/80 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="flex items-center gap-3 p-6 border-b border-white/10">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div class="min-w-0">
          <h1 class="font-bold text-lg tracking-tight truncate">E-Voting {{ settings.namaOrganisasi }}</h1>
          <p class="text-xs text-slate-400 truncate">Panel Admin &middot; {{ settings.tahunPelajaran }}</p>
        </div>
      </div>

      <nav class="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
        <NuxtLink to="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="route.path==='/admin/dashboard' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <span class="font-medium">Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/admin/voters" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="route.path==='/admin/voters' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span class="font-medium">Manajemen DPT & Token</span>
        </NuxtLink>
        <NuxtLink to="/admin/candidates" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="route.path==='/admin/candidates' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          <span class="font-medium">Manajemen Paslon</span>
        </NuxtLink>
        <NuxtLink to="/admin/results" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="route.path==='/admin/results' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          <span class="font-medium">Hasil Real-Time</span>
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="route.path==='/admin/settings' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h.01"/><path d="M9 12h.01"/><path d="M9 15h.01"/><path d="M9 18h.01"/></svg>
          <span class="font-medium">Pengaturan Madrasah</span>
        </NuxtLink>
      </nav>

      <div class="shrink-0 p-4 border-t border-white/10">
        <button @click="handleLogout" :disabled="isLoggingOut" class="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span class="font-medium">Keluar</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-16 shrink-0 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-3 px-4 sm:px-6 z-30">
        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
          <button @click="isSidebarOpen = true" class="lg:hidden -ml-2 p-2 text-slate-400 hover:text-white shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <h2 class="text-lg sm:text-xl font-semibold text-white truncate min-w-0">{{ title }}</h2>
        </div>
        <div class="flex items-center gap-3 pl-4 border-l border-white/10 shrink-0">
          <ColorModeToggle />
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-white">Admin Panitia</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center text-sm font-bold">AD</div>
        </div>
      </header>
      <div class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(false)
const route = useRoute()
const title = computed(() => (route.meta.title as string) || 'Dashboard')
const { settings } = useSettings()
const { show: showLoading, hide: hideLoading } = useLoading()
const isLoggingOut = ref(false)

// Lindungi seluruh halaman admin: tanpa sesi, kembalikan ke halaman login.
const auth = useCookie<any>('auth')
if (!auth.value) {
  navigateTo('/login')
}

const handleLogout = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  showLoading('Keluar dari panel admin...')

  // Hapus cookie sesi di server (auth + voter), lalu bersihkan state lokal.
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    const auth = useCookie<any>('auth')
    auth.value = null
    await navigateTo('/login', { replace: true })
  } catch (e) {
    console.error(e)
  } finally {
    // Bila perpindahan halaman gagal, layout tetap hidup: pulihkan tombol.
    isLoggingOut.value = false
    await hideLoading()
  }
}
</script>