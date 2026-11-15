<template>
  <button
    type="button"
    :title="actionLabel"
    :aria-label="actionLabel"
    class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
    @click="toggle"
  >
    <ClientOnly>
      <!-- Matahari: tampil saat mode gelap (aksi menuju mode terang) -->
      <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <!-- Bulan: tampil saat mode terang -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>

      <template #fallback>
        <span class="inline-block w-5 h-5" />
      </template>
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const { mode, toggle } = useColorMode()
const isDark = computed(() => mode.value === 'dark')

// Mode tersimpan baru diketahui di klien (localStorage). Agar label SSR dan
// hasil hidrasi identik, pakai label netral sampai komponen ter-mount.
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const actionLabel = computed(() => {
  if (!mounted.value) return 'Ganti mode tampilan'
  return isDark.value ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
})
</script>
