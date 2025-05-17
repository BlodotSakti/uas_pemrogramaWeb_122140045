# Website Manajemen Tugas dan Proyek Mandiri

## Deskripsi
Website Manajemen Tugas dan Proyek Mandiri adalah sebuah aplikasi web yang dirancang untuk membantu mahasiswa atau pengguna akademik dalam memantau, mengelola, dan mengingat semua tugas, kuis, dan proyek perkuliahan mereka. Aplikasi ini menyediakan:
- Penyimpanan daftar tugas dengan deadline terstruktur per mata kuliah  
- Pengelompokan tugas berdasarkan kategori atau mata kuliah  
- Ringkasan tugas harian dan mingguan  
- Notifikasi dan reminder otomatis  

Aplikasi ini dikembangkan oleh **Blodot Sakti Luhung** (NIM 122140045) sebagai tugas mata kuliah Pemrograman Web RB.

---

## Daftar Isi
1. [Fitur Utama](#fitur-utama)  
2. [Dependensi & Teknologi](#dependensi--teknologi)  
3. [Arsitektur](#arsitektur)  
4. [Instalasi](#instalasi)  
5. [Penggunaan](#penggunaan)  
6. [Model Data & Entitas](#model-data--entitas)  
7. [Kontribusi](#kontribusi)  
8. [Referensi](#referensi)  

---

## Fitur Utama
1. **CRUD Tugas & Kategori**  
   - Tambah, edit, hapus tugas dan kategori/mata kuliah  
2. **Filter & Pencarian**  
   - Cari tugas berdasarkan kata kunci atau mata kuliah  
3. **Reminder & Notifikasi Otomatis**  
   - Pengingat tugas mendekati deadline via toast/snackbar  
4. **Kalender Deadline**  
   - Tampilan kalender interaktif untuk memantau deadline  

---

## Dependensi & Teknologi

### Frontend
- **React.js** (Functional Components & Hooks)  
- **React Router DOM** — Routing antar halaman  
- **Redux Toolkit** — Manajemen state terpusat  
- **Axios** — HTTP client dengan interceptor JWT  
- **Bootstrap** _atau_ **Tailwind CSS** — Styling responsif  
- **React-Toastify** _atau_ **@mui/material Snackbar** — Notifikasi toast  

### Backend
- **Python Pyramid** — Framework web fleksibel  
- **PostgreSQL** — Sistem manajemen basis data relasional  
- **JSON Web Token (JWT)** — Otentikasi dan otorisasi API  
- **RESTful API** — Akses dan modifikasi data  

---

