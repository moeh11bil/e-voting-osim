# Product Requirement Document (PRD)
## Aplikasi E-Voting OSIM (Organisasi Siswa Intra Madrasah)

---

## 1. Ringkasan Eksekutif (Executive Summary)

Aplikasi **E-Voting OSIM** adalah platform berbasis web yang dirancang untuk memodernisasi dan mempermudah proses pemilihan ketua & wakil ketua OSIM di lingkungan madrasah. Sistem ini menggantikan pemungutan suara manual berbasis kertas menjadi digital, aman, real-time, serta meminimalisir kecurangan.

### 1.1 Tech Stack Usulan
* **Frontend & Backend Framework:** Nuxt.js (Nuxt 3 - SSR/SSG & Server Routes / Nitro API)
* **Database:** MariaDB / MySQL
* **ORM / Database Driver:** Prisma ORM atau Drizzle ORM (Rekomendasi: Prisma untuk integrasi TypeScript & Nuxt 3 yang mulus)
* **Autentikasi:** JWT (JSON Web Token) / Nuxt Auth Utility
* **UI Framework:** TailwindCSS + Shadcn-Vue / DaisyUI

---

## 2. Tujuan & Target (Goals & Objectives)

1. **Efisiensi Waktu & Biaya:** Menghemat penggunaan kertas (paperless) dan mempercepat perhitungan suara (real-time count).
2. **Keamanan & Validitas Data:** Memastikan setiap siswa hanya dapat memilih **1 kali** menggunakan NISN dan Token unik.
3. **Kemudahan Akses:** Antarmuka responsif yang dapat diakses melalui laptop, tablet, maupun smartphone/bilik suara digital.

---

## 3. Peran Pengguna (User Roles & Target Audience)

1. **Admin / Panitia Pemilihan:**
   * Guru Pembina OSIM atau Panitia Pemilihan (MPK/PK).
   * Memiliki hak akses penuh ke dashboard admin untuk mengelola data siswa, token, paslon, dan laporan akhir.
2. **Peserta Pemilih (Siswa/Guru):**
   * Siswa madrasah terdaftar yang memiliki NISN valid dan Token unik.
   * Hanya dapat melakukan Login $\rightarrow$ Memilih $\rightarrow$ Auto Logout.

---

## 4. Alur Pengguna (User Flow)

### 4.1 Alur Admin
1. Admin login menggunakan **Username & Password**.
2. Masuk ke **Dashboard Utama** (melihat ringkasan statistik pemungutan suara).
3. Mengelola **Data Paslon** (tambah, edit, hapus calon & visi-misi).
4. Mengelola **Data Pemilih** (import data NISN siswa dari Excel/CSV).
5. Generate **Token Unik** secara massal untuk tiap NISN.
6. Memantau **Hasil Real-Time Count**.
7. Menutup periode pemungutan suara dan merilis **Laporan Akhir (Export PDF/Excel)**.

### 4.2 Alur Peserta Pemilih
1. Pemilih membuka halaman utama aplikasi.
2. Memasukkan **NISN** dan **Token**.
3. Sistem memvalidasi:
   * Apakah NISN & Token cocok?
   * Apakah pemilih **sudah pernah menggunakan hak suaranya**?
4. Jika valid, pemilih masuk ke **Halaman Bilik Suara (Voting Page)**.
5. Pemilih melihat daftar paslon (Foto, Nama, Visi, Misi).
6. Pemilih mengklik tombol **"Pilih Paslon"** $\rightarrow$ Konfirmasi pilihan (Modal Popup).
7. Setelah konfirmasi:
   * Suara dicatat secara anonim.
   * Status DPT siswa diubah menjadi `SUDAH_MEMILIH`.
   * Token langsung dihanguskan/diinvalidasi.
8. Tampil halaman ucapan **"Terima Kasih"** dan otomatis *Logout* dalam beberapa detik.

---

## 5. Fitur Utama & Spesifikasi Fungsional

### 5.1 Modul Otentikasi & Keamanan (Auth Module)
* **Login Admin:** Username & Password terenkripsi (bcrypt/argon2).
* **Login Pemilih:** NISN & Token.
* **Token Invalidation:** Token otomatis tidak bisa digunakan kembali setelah tombol *Submit Vote* diklik.
* **Session Management:** Session terbatas waktu pendek saat siswa berada di bilik suara untuk mencegah penyalahgunaan.

### 5.2 Modul Admin Dashboard
* **Overview & Statistics:** Total DPT, Suara Masuk, Suara Belum Masuk, Persentase Kehadiran (*Turnout Rate*).
* **Manajemen Pasangan Calon (Paslon):**
  * Nomor Urut.
  * Nama Ketua & Wakil Ketua.
  * Upload Foto Paslon.
  * Visi & Misi (Rich Text / List).
* **Manajemen DPT & Token:**
  * Import DPT via Excel/CSV (`NISN`, `Nama`, `Kelas`).
  * Feature *Generate Random Token* (cth: 6 Karakter Alfanumerik Unik).
  * Cetak Kartu Token/Kupon Token (siap potong untuk dibagikan ke siswa).
  * Status Pemilih (`BELUM_MEMILIH` / `SUDAH_MEMILIH`).
* **Hasil Pemilihan & Export:**
  * Grafik Real-time (Chart.js / ApexCharts).
  * Fitur Lock/Hide Real-time Count (agar hasil tidak terlihat publik sebelum pemilihan selesai jika diinginkan).
  * Export Laporan Akhir Pemilihan (PDF/Excel).

### 5.3 Modul Pemilih (User Voting Interface)
* **Halaman Login Clean & Simple:** Meminimalkan kesalahan input NISN & Token.
* **Halaman Daftar Paslon:** Tampilan kartu paslon yang bersih, jelas, dan *mobile-friendly*.
* **Modal Konfirmasi Suara:** Mengonfirmasi ulang pilihan untuk mencegah kecelakaan klik.
* **Halaman Sukses:** Konfirmasi bahwa suara telah berhasil direkam.

---

## 6. Perancangan Skema Database (MariaDB ERD Breakdown)

Berikut adalah struktur tabel yang disarankan untuk MariaDB:

### 1. Tabel `users_admin`
| Field | Type | Constraint | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto Increment | ID Admin |
| `username` | VARCHAR(50) | Unique, Not Null | Username Admin |
| `password` | VARCHAR(255) | Not Null | Hashed Password |
| `nama` | VARCHAR(100) | Not Null | Nama Lengkap Admin |
| `created_at` | TIMESTAMP | Default CURRENT_TIMESTAMP | |

### 2. Tabel `candidates` (Paslon)
| Field | Type | Constraint | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto Increment | ID Candidate |
| `nomor_urut` | INT | Unique, Not Null | Nomor Urut Paslon |
| `nama_ketua` | VARCHAR(100) | Not Null | Nama Ketua |
| `nama_wakil` | VARCHAR(100) | Not Null | Nama Wakil |
| `foto` | VARCHAR(255) | Nullable | Path / URL Foto Paslon |
| `visi` | TEXT | Not Null | Visi |
| `misi` | TEXT | Not Null | Misi |

### 3. Tabel `voters` (Daftar Pemilih Tetap - DPT)
| Field | Type | Constraint | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto Increment | ID Voter |
| `nisn` | VARCHAR(20) | Unique, Not Null | NISN Siswa |
| `nama` | VARCHAR(100) | Not Null | Nama Siswa |
| `kelas` | VARCHAR(50) | Not Null | Kelas / Rombel |
| `token` | VARCHAR(10) | Unique, Not Null | Token Unik untuk Login |
| `is_voted` | BOOLEAN | Default FALSE | Status Sudah Memilih |
| `voted_at` | TIMESTAMP | Nullable | Waktu Memilih |

### 4. Tabel `votes` (Perolehan Suara - Anonim)
*Catatan: Tabel ini dipisah dari `voters` untuk menjaga kerahasiaan (*Asas Luber Jurdil*).*
| Field | Type | Constraint | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto Increment | ID Suara |
| `candidate_id` | INT | Foreign Key (`candidates.id`) | Pilihan Paslon |
| `created_at` | TIMESTAMP | Default CURRENT_TIMESTAMP | Waktu pencatatan suara |

---

## 7. Persyaratan Non-Fungsional (Non-Functional Requirements)

1. **Performansi:**
   * Mampu menangani *concurrent request* hingga 100-200 pemilih simultan (jika pemilihan dilakukan serentak di laboratorium komputer).
2. **Keamanan (Security):**
   * Pencegahan SQL Injection (Gunakan Query Binding / ORM Prisma).
   * Cross-Site Scripting (XSS) & CSRF Protection.
   * Anonimitas Pemilih: Sistem tidak mencatat `nisn` di tabel `votes`.
3. **Usability (Kemudahan Penggunaan):**
   * UI/UX responsif (dapat digunakan baik di HP maupun Layar Monitor Bilik Pemilihan).
   * Desain kontras tinggi dan tombol jelas agar tidak membuat bingung siswa.

---

## 8. Rencana Implementasi Tahapan Pengembangan (Roadmap)

* **Fase 1: Inisiasi & Database Setup**
  * Setup Project Nuxt 3 & Konfigurasi MariaDB.
  * Setup ORM (Prisma/Drizzle) & Migrasi Database.
* **Fase 2: Backend Development (Nitro API)**
  * Auth endpoint (Admin & Student).
  * CRUD Paslon & DPT.
  * Logic Token Generator & Import Excel.
  * Endpoint Voting & Anonimitas.
* **Fase 3: Frontend Development (Nuxt Pages & Components)**
  * Halaman Login & Dashboard Admin.
  * Halaman Login Pemilih & Bilik Suara.
  * UI Grafik Real-time (Chart integration).
* **Fase 4: Testing & UAT**
  * Testing keamanan token & double-voting.
  * Stress-testing beban concurrent voting.
* **Fase 5: Deployment**
  * Deploy ke server lokal madrasah (LAN) atau Cloud VPS (misal: Nginx + PM2 / Docker).
