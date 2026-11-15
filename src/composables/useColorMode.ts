import { ref, readonly } from 'vue'

export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'color-mode'

/**
 * Mode awal dibaca dari class pada <html> yang sudah dipasang oleh skrip
 * inline di <head> (lihat nuxt.config.ts). Ini menjaga agar state komponen
 * selalu sinkron dengan tampilan yang sudah ter-render, tanpa flash.
 */
function detectInitialMode(): ColorMode {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('light')) {
    return 'light'
  }
  return 'dark'
}

const mode = ref<ColorMode>(detectInitialMode())

function applyMode(value: ColorMode) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('light', value === 'light')
  root.classList.toggle('dark', value === 'dark')
  root.style.colorScheme = value
}

/**
 * Mengelola mode warna aplikasi (gelap/terang).
 * State dibagi ke seluruh komponen, dan pilihan pengguna disimpan di
 * localStorage sehingga tetap tersimpan saat halaman dimuat ulang.
 */
export function useColorMode() {
  const setMode = (value: ColorMode) => {
    mode.value = value
    applyMode(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // localStorage bisa tidak tersedia (mis. mode privat); abaikan.
    }
  }

  const toggle = () => setMode(mode.value === 'dark' ? 'light' : 'dark')

  return {
    mode: readonly(mode),
    setMode,
    toggle,
  }
}
