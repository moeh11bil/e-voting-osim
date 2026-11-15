<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white tracking-tight">Daftar Pasangan Calon</h3>
          <p class="text-sm text-slate-400 mt-0.5">{{ candidates.length }} paslon terdaftar dalam sistem</p>
        </div>
      </div>
      <button @click="openAdd" class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        Tambah Paslon
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <svg class="animate-spin h-10 w-10 text-indigo-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <p class="text-slate-400 text-sm animate-pulse">Memuat data paslon...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="candidates.length === 0" class="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl border-dashed">
      <div class="w-20 h-20 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <h4 class="text-lg font-semibold text-white mb-1">Belum Ada Paslon</h4>
      <p class="text-slate-400 max-w-sm mx-auto">Klik tombol "Tambah Paslon" di atas untuk mendaftarkan pasangan calon pertama Anda.</p>
    </div>

    <!-- Grid cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="c in candidates" :key="c.id" class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col">
        <!-- Photo -->
        <div class="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <img v-if="c.foto" :src="c.foto" alt="Foto paslon" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span class="text-xs font-medium uppercase tracking-wider">Foto Belum Diunggah</span>
          </div>

          <!-- Nomor Urut Badge -->
          <div class="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30 ring-2 ring-white/20">
            {{ c.nomorUrut ?? c.nomor_urut }}
          </div>

          <!-- Action Buttons -->
          <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-100 translate-x-0 transition-all duration-300 sm:opacity-0 sm:translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0">
            <button @click="openEdit(c)" class="p-2.5 bg-slate-900/80 backdrop-blur-md text-indigo-300 hover:text-white hover:bg-indigo-600 rounded-xl transition-colors shadow-lg border border-white/10" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </button>
            <button @click="remove(c)" class="p-2.5 bg-slate-900/80 backdrop-blur-md text-red-300 hover:text-white hover:bg-red-600 rounded-xl transition-colors shadow-lg border border-white/10" title="Hapus">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="p-6 space-y-4 flex-1 flex flex-col">
          <div class="pb-4 border-b border-white/5">
            <h4 class="text-lg font-bold text-white leading-snug">{{ c.namaKetua ?? c.nama_ketua }} <span class="text-indigo-400 font-light">&</span> {{ c.namaWakil ?? c.nama_wakil }}</h4>
          </div>
          <div class="space-y-4 text-sm flex-1">
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <p class="text-indigo-300 font-semibold text-xs uppercase tracking-wider">Visi</p>
              </div>
              <p class="text-slate-300 leading-relaxed line-clamp-2">{{ c.visi }}</p>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                <p class="text-purple-300 font-semibold text-xs uppercase tracking-wider">Misi</p>
              </div>
              <p class="text-slate-300 leading-relaxed line-clamp-3">{{ c.misi }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 animate-in fade-in duration-200">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">{{ editing ? 'Edit Data Paslon' : 'Tambah Paslon Baru' }}</h3>
          </div>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>

        <div class="overflow-y-auto p-6 custom-scrollbar">
          <form @submit.prevent="save" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5">Nomor Urut</label>
                <input v-model="form.nomorUrut" type="number" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Contoh: 1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5">Foto Paslon</label>
                <div class="relative">
                  <input type="file" id="photo" accept="image/*" @change="onFile" class="hidden" />
                  <label for="photo" class="flex items-center justify-center w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 border-dashed rounded-xl text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 group-hover:text-indigo-400 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    <span class="text-sm truncate max-w-[200px]">{{ fileRef ? fileRef.name : 'Pilih file gambar...' }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5">Nama Ketua</label>
                <input v-model="form.namaKetua" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Nama lengkap ketua" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5">Nama Wakil</label>
                <input v-model="form.namaWakil" required class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Nama lengkap wakil" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1.5">Visi</label>
              <textarea v-model="form.visi" required rows="3" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none" placeholder="Tuliskan visi paslon..."></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1.5">Misi</label>
              <textarea v-model="form.misi" required rows="4" class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none" placeholder="Tuliskan misi paslon..."></textarea>
            </div>

            <p v-if="error" class="text-red-400 text-sm flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              {{ error }}
            </p>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="showModal = false" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium">Batal</button>
              <button type="submit" :disabled="saving" class="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ saving ? 'Menyimpan...' : (editing ? 'Simpan Perubahan' : 'Tambah Paslon') }}
              </button>
            </div>
          </form>
        </div>
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
            <h3 class="text-xl font-bold text-white">Hapus Paslon</h3>
            <p class="text-sm text-slate-400">Tindakan ini tidak dapat dibatalkan</p>
          </div>
        </div>
        <p class="text-slate-300 mb-6 leading-relaxed">Apakah Anda yakin ingin menghapus paslon <span class="font-semibold text-white bg-white/10 px-1.5 py-0.5 rounded">{{ deleteTarget?.namaKetua ?? deleteTarget?.nama_ketua }} & {{ deleteTarget?.namaWakil ?? deleteTarget?.nama_wakil }}</span>? Semua data terkait akan hilang.</p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" :disabled="deleting" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium disabled:opacity-70">Batal</button>
          <button @click="confirmDelete" :disabled="deleting" class="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all">
            <svg v-if="deleting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ deleting ? 'Menghapus...' : 'Ya, Hapus' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import eksplisit untuk mencegah error auto-import
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'admin', title: 'Manajemen Paslon' })

const candidates = ref<any[]>([])
const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const error = ref('')
const fileRef = ref<File | null>(null)
const loading = ref(false)

const showDeleteModal = ref(false)
const deleteTarget = ref<any>(null)
const deleting = ref(false)

const form = ref({
  nomorUrut: 1,
  namaKetua: '',
  namaWakil: '',
  visi: '',
  misi: '',
})

async function load() {
  loading.value = true
  try {
    const res: any = await $fetch('/api/candidates')
    candidates.value = res.candidates || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onMounted(load)

function openAdd() {
  editing.value = null
  form.value = { nomorUrut: (candidates.value.length + 1), namaKetua: '', namaWakil: '', visi: '', misi: '' }
  fileRef.value = null
  error.value = ''
  showModal.value = true
}

function openEdit(c: any) {
  editing.value = c
  form.value = {
    nomorUrut: c.nomorUrut ?? c.nomor_urut,
    namaKetua: c.namaKetua ?? c.nama_ketua,
    namaWakil: c.namaWakil ?? c.nama_wakil,
    visi: c.visi,
    misi: c.misi,
  }
  fileRef.value = null
  error.value = ''
  showModal.value = true
}

function onFile(e: any) {
  fileRef.value = e.target.files?.[0] || null
}

async function save() {
  saving.value = true
  error.value = ''
  try {
    const fd = new FormData()
    fd.append('nomorUrut', String(form.value.nomorUrut))
    fd.append('namaKetua', form.value.namaKetua)
    fd.append('namaWakil', form.value.namaWakil)
    fd.append('visi', form.value.visi)
    fd.append('misi', form.value.misi)
    if (fileRef.value) fd.append('photo', fileRef.value)

    if (editing.value) {
      await $fetch(`/api/candidates/${editing.value.id}`, { method: 'PUT', body: fd })
    } else {
      await $fetch('/api/candidates', { method: 'POST', body: fd })
    }
    showModal.value = false
    await load()
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Gagal menyimpan'
  } finally {
    saving.value = false
  }
}

function remove(c: any) {
  deleteTarget.value = c
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await $fetch(`/api/candidates/${deleteTarget.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deleteTarget.value = null
    await load()
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Gagal menghapus')
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Scrollbar yang elegan untuk Modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
