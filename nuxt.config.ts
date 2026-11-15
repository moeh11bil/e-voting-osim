// 1. BARIS INI WAJIB ADA DI PALING ATAS (Jangan dihapus!)
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  alias: {
    '~': '.',
    '~/server': './server',
    '~/server/lib': './server/lib',
  },

  // 2. Daftarkan file CSS utama
  css: ['~/assets/css/main.css'],

  // Terapkan tema sebelum halaman dilukis untuk mencegah kedipan (FOUC).
  app: {
    head: {
      script: [
        {
          tagPosition: 'head',
          innerHTML: `(function(){try{var m=localStorage.getItem('color-mode');if(m!=='light'&&m!=='dark'){m='dark';}var r=document.documentElement;r.classList.toggle('light',m==='light');r.classList.toggle('dark',m==='dark');r.style.colorScheme=m;}catch(e){document.documentElement.classList.add('dark');}})();`,
        },
      ],
    },
  },

  devtools: { enabled: true },

  // 3. Daftarkan plugin Tailwind di sini (BUKAN di modules)
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  nitro: {
    preset: 'node',
  },
  devServer: {
    port: 3000,
  },
})
