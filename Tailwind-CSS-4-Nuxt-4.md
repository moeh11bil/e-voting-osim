# Konfigurasi Tailwind CSS 4 di Nuxt 4.6.4

## Ringkasan

Proyek **e-voting-osim** menggunakan **Tailwind CSS v4.3.5** dengan **Nuxt 4.6.4**. Tailwind CSS v4 menggunakan pendekatan baru yang berbeda dari versi sebelumnya.

## Perbedaan Utama Tailwind CSS v4

### 1. Tidak Perlu `tailwind.config.js`

Di Tailwind CSS v4, **tidak ada file `tailwind.config.js` yang diperlukan**. Konfigurasi dilakukan secara otomatis melalui:

- **CSS-based configuration**: Tailwind v4 menggunakan CSS untuk konfigurasi
- **Content Discovery**: Tailwind otomatis menemukan class dari file yang diproses
- **Built-in JIT**: Mode JIT (Just-In-Time) sudah aktif secara default

### 2. Cara Setup Tailwind v4 di Nuxt

#### a. Install Dependencies

```json
{
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.5",
    "tailwindcss": "^4.3.5",
    "autoprefixer": "^10.6.2",
    "postcss": "^8.5.32"
  }
}
```

#### b. Konfigurasi Nuxt (`nuxt.config.ts`)

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',

  // 1. Daftarkan file CSS utama
  css: ['~/assets/css/main.css'],

  // 2. Daftarkan plugin Tailwind di Vite
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  // Konfigurasi lainnya...
})
```

**Penting:**
- Plugin Tailwind **tidak** ditempatkan di `modules`
- Plugin Tailwind ditempatkan di `vite.plugins`
- File CSS utama harus diimpor di `nuxt.config.ts`

#### c. File CSS Utama (`~/assets/css/main.css`)

```css
@import "tailwindcss";
```

Sangat sederhana! Hanya satu baris untuk mengimpor Tailwind.

#### d. File `app.vue`

```vue
<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style>
@import 'tailwindcss';
</style>
```

### 3. Cara Menggunakan Tailwind Classes

Setelah setup selesai, Anda bisa langsung menggunakan Tailwind classes di template Vue:

```vue
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
  <div class="bg-white p-8 rounded-lg shadow-xl">
    <!-- Classes Tailwind langsung bisa digunakan -->
  </div>
</div>
```

## File-File yang Digunakan

| File | Path | Keterangan |
|------|------|------------|
| `nuxt.config.ts` | `/e-voting-osim/nuxt.config.ts` | Konfigurasi utama Nuxt dengan plugin Tailwind |
| `vite.config.ts` | `/e-voting-osim/vite.config.ts` | Konfigurasi Vite (tidak perlu konfigurasi Tailwind khusus) |
| `main.css` | `/e-voting-osim/src/assets/css/main.css` | File CSS utama dengan `@import "tailwindcss"` |
| `app.vue` | `/e-voting-osim/src/app.vue` | Root component dengan import Tailwind |

## Dependencies

```json
{
  "dependencies": {
    "nuxt": "^4.6.4",
    "@prisma/client": "^7.10.1",
    "prisma": "^7.10.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.5",
    "tailwindcss": "^4.3.5",
    "autoprefixer": "^10.6.2",
    "postcss": "^8.5.32",
    "typescript": "^5.9.3",
    "vue-tsc": "^3.3.14"
  }
}
```

## Keuntungan Tailwind CSS v4

1. **Lebih Cepat**: Build time lebih cepat karena tidak perlu parse config file
2. **Simpler Setup**: Tidak perlu konfigurasi terpisah
3. **Better Performance**: JIT mode default dengan optimasi lebih baik
4. **CSS-based Config**: Konfigurasi melalui CSS, lebih mudah dipahami

## Commands yang Digunakan

```bash
# Development
npm run dev

# Build untuk production
npm run build

# Generate untuk production
npm run generate
```

## Catatan Penting

- Tailwind CSS v4 **tidak memerlukan** `tailwind.config.js`
- Konfigurasi dilakukan melalui **Vite plugin** di `nuxt.config.ts`
- File CSS utama harus diimpor di `nuxt.config.ts`
- Plugin Tailwind ditempatkan di `vite.plugins`, bukan di `modules`
- Import Tailwind di `app.vue` atau file CSS utama

## Referensi

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4)
- [Nuxt 4 Documentation](https://nuxt.com/)
- [@tailwindcss/vite](https://github.com/tailwindcss/vite)
