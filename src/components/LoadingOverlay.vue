<template>
  <Teleport to="body">
    <Transition name="loading-flash">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-slate-950/70 backdrop-blur-md"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <!-- Cincin ganda: lapisan diam sebagai track, lapisan berputar sebagai indikator -->
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></div>
          </div>
        </div>

        <p class="text-sm font-medium text-slate-200 animate-pulse">{{ message }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isLoading, message } = useLoading()
</script>

<style scoped>
/* Muncul cepat (efek "flash") lalu memudar halus saat ditutup. */
.loading-flash-enter-active {
  transition: opacity 0.15s ease-out;
}

.loading-flash-leave-active {
  transition: opacity 0.3s ease-in;
}

.loading-flash-enter-from,
.loading-flash-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .loading-flash-enter-active,
  .loading-flash-leave-active {
    transition: none;
  }
}
</style>
