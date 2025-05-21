# MANTUDOT - Manajemen Tugas Blodot

## Deskripsi Aplikasi Web

**MANTUDOT** adalah aplikasi web manajemen tugas kuliah yang membantu mahasiswa mencatat, mengelola, dan memantau tugas-tugas per mata kuliah. Aplikasi ini terintegrasi dengan database PostgreSQL melalui backend Python Pyramid dan menyediakan antarmuka modern berbasis React.

Aplikasi ini dikembangkan oleh Blodot Sakti Luhung (NIM 122140045) sebagai tugas mata kuliah Pemrograman Web RB.

---

## Spesifikasi Backend

- **Framework:** Python Pyramid
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migrations:** Alembic
- **Testing:** Pytest (dengan coverage minimal 60%)
- **RESTful API:** Mendukung operasi CRUD untuk mata kuliah dan tugas
- **CORS:** Mendukung akses lintas origin (frontend-backend)
- **Autentikasi:** Tanpa autentikasi (public API, bisa diubah sesuai kebutuhan)
- **Deployment:** Menggunakan Waitress sebagai WSGI server

---

## Spesifikasi Frontend

- **Framework:** React JS (Create React App)
- **State Management:** Context API (TaskContext & SubjectContext)
- **Routing:** React Router DOM
- **Notifikasi:** React Toastify
- **Chart:** Chart.js & react-chartjs-2
- **Kalender:** React Calendar
- **Styling:** Tailwind CSS & custom CSS
- **Fitur Responsif:** Tampilan responsif untuk desktop & mobile
- **Proxy:** Terhubung ke backend Pyramid melalui proxy di development

---

## Dependensi Paket

### Backend (Python Pyramid)
- pyramid
- pyramid_jinja2
- pyramid_tm
- pyramid_retry
- sqlalchemy
- psycopg2-binary
- zope.sqlalchemy
- waitress
- alembic
- pytest (untuk testing)

### Frontend (React)
- react
- react-dom
- react-router-dom
- prop-types
- react-toastify
- chart.js
- react-chartjs-2
- react-calendar
- tailwindcss (opsional, untuk styling)

---

## Fitur Aplikasi

- **CRUD Mata Kuliah**: Tambah, edit, hapus, dan tampilkan daftar mata kuliah beserta kode dan nama dosen.
- **CRUD Tugas**: Tambah, edit, hapus, dan tampilkan tugas berdasarkan mata kuliah.
- **Filter & Pencarian**: Cari tugas berdasarkan judul atau mata kuliah, filter berdasarkan status tugas.
- **Statistik & Grafik**: Lihat statistik tugas dalam bentuk chart.
- **Kalender Deadline**: Tampilkan deadline tugas dalam tampilan kalender.
- **Riwayat Tugas**: Lihat riwayat tugas yang sudah selesai.
- **Notifikasi**: Notifikasi sukses/gagal menggunakan Toastify.
- **Integrasi Database**: Semua data tersimpan di PostgreSQL melalui REST API Pyramid.
- **CORS Support**: Mendukung akses frontend-backend beda origin.

---

## 📸 Screenshot Antarmuka

Berikut ini adalah tampilan dari website MANTUDOT **halaman Home**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanHome.png)
.

Berikut ini adalah tampilan dari website MANTUDOT **halaman Statistics**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanStat.png)
.

Berikut ini adalah tampilan dari website MANTUDOT **halaman Riwayat Tugas**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanRiwayat.png)
.

Berikut ini adalah tampilan dari website MANTUDOT **halaman Grafik Tugas**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanGrafik.png)
.

Berikut ini adalah tampilan dari website MANTUDOT **halaman Kalender Deadline**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanKalender.png)
.

Berikut ini adalah tampilan dari website MANTUDOT **halaman Mata Kuliah**:
![Screenshot Aplikasi](/frontend_uas/src/assets/Images/tampilanMataKuliah.png)
.

---

## Referensi

- [Dasar-Dasar Pemrograman Web: Dengan Kerangka Kerja Python Pyramid dan React JS](https://press.itera.ac.id/dasar-dasar-pemrograman-web-dengan-kerangka-kerja-python-pyramid-dan-react-js/)
- [Pyramid Web Framework](https://trypyramid.com/)
- [ReactJS](https://reactjs.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Chart.js](https://www.chartjs.org/)
- [React Calendar](https://github.com/wojtekmaj/react-calendar)
- [Tailwind CSS](https://tailwindcss.com/)

---

> **Dikembangkan oleh BLODOTSAKTILUHUNG**

---