<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- Tombol ganti tema global (disembunyikan di area admin yang punya tombol sendiri).
       Di layar kecil diletakkan di kanan-atas agar tidak menutupi tombol di bawah. -->
  <div v-if="showToggle" class="fixed top-4 right-4 sm:top-auto sm:bottom-4 z-[60]">
    <ColorModeToggle />
  </div>

  <!-- Indikator proses layar penuh (login, logout, dsb). -->
  <LoadingOverlay />
</template>

<script setup lang="ts">
const route = useRoute()
const showToggle = computed(() => !route.path.startsWith('/admin'))
</script>
