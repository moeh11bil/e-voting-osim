/**
 * Status loading global (dipakai oleh `LoadingOverlay.vue`).
 *
 * Dipakai untuk aksi yang memindahkan halaman, seperti login dan logout, agar
 * pengguna melihat indikator proses di seluruh layar — bukan hanya di tombol —
 * selama permintaan ke server dan perpindahan rute berlangsung.
 */
export const useLoading = () => {
  const isLoading = useState<boolean>('global-loading', () => false)
  const message = useState<string>('global-loading-message', () => 'Memuat...')

  // Durasi tampil minimum agar spinner tidak sekadar berkedip sekejap ketika
  // respons server sangat cepat (mis. login lokal < 100 ms).
  const MIN_VISIBLE_MS = 400
  let shownAt = 0

  const show = (text = 'Memuat...') => {
    message.value = text
    shownAt = Date.now()
    isLoading.value = true
  }

  const hide = async () => {
    const remaining = MIN_VISIBLE_MS - (Date.now() - shownAt)
    if (remaining > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, remaining))
    }
    isLoading.value = false
  }

  return { isLoading, message, show, hide }
}
