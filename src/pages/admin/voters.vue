<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

    <!-- Header & Controls -->
    <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
      <!-- Top Row: Title & Main Actions -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white tracking-tight">Daftar Pemilih (DPT)</h3>
            <p class="text-sm text-slate-400 mt-0.5">{{ filteredVoters.length }} dari {{ voters.length }} pemilih terdaftar</p>
          </div>
        </div>

        <!-- Action Buttons Group -->
        <div class="flex flex-wrap gap-2">
          <!-- 1. Tambah -->
          <button @click="openAdd" class="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            Tambah
          </button>

          <!-- 2. Import -->
          <label class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium cursor-pointer flex items-center gap-2 transition-all duration-200">
            <svg v-if="importing" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            Import
            <input type="file" accept=".csv,.xlsx,.xls" class="hidden" @change="importFile" :disabled="importing" />
          </label>

          <!-- 3. Generate Token -->
          <button @click="generateTokens" :disabled="generating" class="px-4 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 disabled:opacity-70">
            <svg v-if="generating" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Token
          </button>

          <!-- Divider Vertical -->
          <div class="w-px h-8 bg-white/10 mx-1 hidden sm:block"></div>

          <!-- 4. Cetak Kartu -->
          <NuxtLink to="/admin/print-tokens" target="_blank" class="px-4 py-2.5 bg-slate-700/80 hover:bg-slate-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Cetak Kartu
          </NuxtLink>

          <!-- 5. Reset Suara -->
          <button @click="resetVotes" :disabled="resetting" class="px-4 py-2.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 disabled:opacity-70">
            <svg v-if="resetting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Reset
          </button>

          <!-- 6. Hapus Semua -->
          <button @click="showDeleteAllModal = true" :disabled="deletingAll" class="px-4 py-2.5 bg-red-600/80 hover:bg-red-500 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 disabled:opacity-70">
            <svg v-if="deletingAll" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Hapus Semua
          </button>
        </div>
      </div>

      <!-- Bottom Row: Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/10">
        <div class="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Cari nama atau NISN..." class="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
        </div>
        <div class="relative sm:w-64">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <select v-model="selectedKelas" class="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer">
            <option value="all">Semua Kelas</option>
            <option v-for="kls in uniqueKelas" :key="kls" :value="kls">{{ kls }}</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>

    <!-- Flash message -->
    <div v-if="message || importing || generating || resetting || deleting || deletingAll" class="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
      <svg v-if="importing || generating || resetting || deleting || deletingAll" class="animate-spin h-5 w-5 text-emerald-300 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <svg v-else class="h-5 w-5 text-emerald-300 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span class="text-sm font-medium">{{ message || 'Memproses data...' }}</span>
      <button @click="message = ''" class="ml-auto text-emerald-300/70 hover:text-emerald-200 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-10 w-10 text-indigo-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p class="text-slate-400 text-sm animate-pulse">Memuat data pemilih...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredVoters.length === 0" class="text-center py-16">
        <div class="w-16 h-16 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h4 class="text-lg font-semibold text-white mb-1">Tidak Ada Data Ditemukan</h4>
        <p class="text-slate-400 text-sm">Coba ubah kata kunci pencarian atau filter kelas Anda.</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm text-left text-slate-300">
          <thead class="text-xs uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-white/10">
            <tr>
              <th class="px-6 py-4 font-semibold">No</th>
              <th class="px-6 py-4 font-semibold">Nama Pemilih</th>
              <th class="px-6 py-4 font-semibold">NISN</th>
              <th class="px-6 py-4 font-semibold">Kelas</th>
              <th class="px-6 py-4 font-semibold">Token</th>
              <th class="px-6 py-4 font-semibold text-center">Status</th>
              <th class="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="(v, index) in paginatedVoters" :key="v.id" class="hover:bg-white/5 transition-colors duration-200 group">
              <td class="px-6 py-4 font-medium text-slate-500">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold text-white">{{ v.nama ?? v.name }}</div>
              </td>
              <td class="px-6 py-4 font-mono text-slate-300">{{ v.nisn }}</td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-md bg-slate-700/50 border border-white/5 text-xs font-medium text-slate-300">
                  {{ v.kelas ?? v.class }}
                </span>
              </td>
              <td class="px-6 py-4 font-mono text-indigo-300">{{ v.token || '—' }}</td>
              <td class="px-6 py-4 text-center">
                <span :class="(v.isVoted || v.has_voted) ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border gap-1.5">
                  <span :class="(v.isVoted || v.has_voted) ? 'bg-emerald-400' : 'bg-amber-400'" class="w-1.5 h-1.5 rounded-full"></span>
                  {{ (v.isVoted || v.has_voted) ? 'Sudah Memilih' : 'Belum' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="remove(v)" class="p-2 text-slate-500 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" title="Hapus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="filteredVoters.length > 0" class="px-6 py-4 border-t border-white/10 bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-slate-400">
          Menampilkan <span class="font-semibold text-white">{{ startIndex + 1 }}</span> hingga <span class="font-semibold text-white">{{ endIndex }}</span> dari <span class="font-semibold text-white">{{ filteredVoters.length }}</span> data
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Prev
          </button>

          <div class="flex items-center gap-1">
            <span class="px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm">
              {{ currentPage }}
            </span>
            <span class="text-slate-500 text-sm px-2">/ {{ totalPages }}</span>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div v-if="showAdd" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 animate-in fade-in duration-200">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/90">
          <h3 class="text-xl font-bold text-white">Tambah Pemilih</h3>
          <button @click="showAdd = false" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>
        <form @submit.prevent="addVoter" class="p-6 space-y-4">
          <input v-model="newVoter.nisn" placeholder="NISN" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <input v-model="newVoter.nama" placeholder="Nama Lengkap" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <input v-model="newVoter.kelas" placeholder="Kelas (contoh: XII IPA 1)" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <input v-model="newVoter.token" placeholder="Token (Opsional)" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <div class="flex gap-3 pt-2">
            <button type="button" @click="showAdd = false" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors">Batal</button>
            <button type="submit" :disabled="saving" class="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
              <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 ring-1 ring-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Hapus Pemilih</h3>
            <p class="text-sm text-slate-400">Tindakan ini tidak dapat dibatalkan</p>
          </div>
        </div>
        <p class="text-slate-300 mb-6 leading-relaxed">Hapus pemilih <span class="font-semibold text-white bg-white/10 px-1.5 py-0.5 rounded">{{ deleteTarget?.nama ?? deleteTarget?.name }}</span>?</p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" :disabled="deleting" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors disabled:opacity-70">Batal</button>
          <button @click="confirmDelete" :disabled="deleting" class="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all">
            <svg v-if="deleting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ deleting ? 'Menghapus...' : 'Ya, Hapus' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Modal -->
    <div v-if="showResetModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 ring-1 ring-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </div>
          <div><h3 class="text-xl font-bold text-white">Reset Semua Suara</h3><p class="text-sm text-slate-400">Tindakan ini tidak dapat dibatalkan</p></div>
        </div>
        <p class="text-slate-300 mb-6">Reset status "Sudah Memilih" untuk semua pemilih?</p>
        <div class="flex gap-3">
          <button @click="showResetModal = false" :disabled="resetting" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors disabled:opacity-70">Batal</button>
          <button @click="confirmReset" :disabled="resetting" class="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all">
            <svg v-if="resetting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ resetting ? 'Mereset...' : 'Ya, Reset' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete All Modal -->
    <div v-if="showDeleteAllModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 ring-1 ring-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </div>
          <div><h3 class="text-xl font-bold text-white">Hapus Semua Data DPT</h3><p class="text-sm text-slate-400">Tindakan ini tidak dapat dibatalkan</p></div>
        </div>
        <p class="text-slate-300 mb-6">Hapus seluruh data pemilih, token, dan riwayat suara?</p>
        <div class="flex gap-3">
          <button @click="showDeleteAllModal = false" :disabled="deletingAll" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors disabled:opacity-70">Batal</button>
          <button @click="confirmDeleteAll" :disabled="deletingAll" class="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all">
            <svg v-if="deletingAll" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ deletingAll ? 'Menghapus...' : 'Ya, Hapus Semua' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

definePageMeta({ layout: 'admin', title: 'Manajemen DPT & Token' })

const voters = ref<any[]>([])
const showAdd = ref(false)
const saving = ref(false)
const message = ref('')
const loading = ref(false)
const newVoter = ref({ nisn: '', nama: '', kelas: '', token: '' })

const showDeleteModal = ref(false)
const deleteTarget = ref<any>(null)
const deleting = ref(false)
const showResetModal = ref(false)
const resetting = ref(false)
const showDeleteAllModal = ref(false)
const deletingAll = ref(false)
const importing = ref(false)
const generating = ref(false)

// --- FITUR BARU: Search, Filter, Pagination ---
const searchQuery = ref('')
const selectedKelas = ref('all')
const currentPage = ref(1)
const itemsPerPage = 15 // Tampilkan 15 data per halaman

// 1. Ambil daftar kelas unik untuk dropdown filter
const uniqueKelas = computed(() => {
  const kelasSet = new Set(voters.value.map(v => v.kelas || v.class).filter(Boolean))
  return Array.from(kelasSet).sort()
})

// 2. Filter data berdasarkan Search dan Kelas
const filteredVoters = computed(() => {
  return voters.value.filter(v => {
    const nama = (v.nama || v.name || '').toLowerCase()
    const nisn = (v.nisn || '').toLowerCase()
    const kelas = v.kelas || v.class

    const matchSearch = nama.includes(searchQuery.value.toLowerCase()) || nisn.includes(searchQuery.value.toLowerCase())
    const matchKelas = selectedKelas.value === 'all' || kelas === selectedKelas.value

    return matchSearch && matchKelas
  })
})

// 3. Pagination Logic
const totalPages = computed(() => Math.ceil(filteredVoters.value.length / itemsPerPage))

const paginatedVoters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredVoters.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredVoters.value.length))

// 4. Reset ke halaman 1 jika filter/search berubah
watch([searchQuery, selectedKelas], () => {
  currentPage.value = 1
})

// Jaga agar halaman aktif tidak melewati jumlah halaman setelah data dihapus/difilter.
watch(totalPages, (pages) => {
  const lastPage = Math.max(pages, 1)
  if (currentPage.value > lastPage) currentPage.value = lastPage
})

watch(message, (val) => {
  if (val) setTimeout(() => { message.value = '' }, 4000)
})

// --- LOGIKA API (TETAP SAMA) ---
async function load() {
  loading.value = true
  try {
    const res: any = await $fetch('/api/voters')
    voters.value = res.voters || res.students || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onMounted(load)

function openAdd() {
  newVoter.value = { nisn: '', nama: '', kelas: '', token: '' }
  showAdd.value = true
}

async function addVoter() {
  saving.value = true
  message.value = ''
  try {
    await $fetch('/api/voters', { method: 'POST', body: newVoter.value })
    showAdd.value = false
    await load()
    message.value = 'Pemilih berhasil ditambahkan'
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal menambahkan')
  } finally {
    saving.value = false
  }
}

async function importFile(e: any) {
  const file = e.target.files?.[0]
  if (!file) return
  importing.value = true
  const fd = new FormData()
  fd.append('file', file)
  try {
    const res: any = await $fetch('/api/voters/import', { method: 'POST', body: fd })
    message.value = res.message
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Import gagal')
  } finally {
    importing.value = false
    e.target.value = ''
  }
}

async function generateTokens() {
  generating.value = true
  try {
    const res: any = await $fetch('/api/voters/generate-tokens', { method: 'POST', body: { all: false } })
    message.value = res.message
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal generate token')
  } finally {
    generating.value = false
  }
}

function resetVotes() {
  showResetModal.value = true
}

async function confirmReset() {
  resetting.value = true
  try {
    const res: any = await $fetch('/api/voters/reset-votes', { method: 'POST' })
    message.value = res.message
    showResetModal.value = false
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal mereset')
  } finally {
    resetting.value = false
  }
}

function remove(v: any) {
  deleteTarget.value = v
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await $fetch(`/api/voters/${deleteTarget.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deleteTarget.value = null
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal menghapus')
  } finally {
    deleting.value = false
  }
}

async function confirmDeleteAll() {
  deletingAll.value = true
  try {
    const res: any = await $fetch('/api/voters/delete-all', { method: 'POST' })
    message.value = res.message
    showDeleteAllModal.value = false
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal menghapus semua')
  } finally {
    deletingAll.value = false
  }
}
</script>
