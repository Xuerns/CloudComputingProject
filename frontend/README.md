# 🚀 Dokumentasi Arsitektur & Pembangunan Frontend (PRD & Tech Docs)
### Portfolio Personal & Integrasi Layanan Rating — Adam Nugraha

Dokumen ini menjelaskan secara menyeluruh perjalanan pembangunan aplikasi **Frontend**, mulai dari konsep awal, perancangan fondasi desain, arsitektur komponen, integrasi backend REST API, hingga optimasi responsif untuk mobile dan tablet (iPad).

---

## 📑 Daftar Isi
1. [Ringkasan Eksekutif & Tujuan](#1-ringkasan-eksekutif--tujuan)
2. [Tech Stack & Prinsip Rekayasa](#2-tech-stack--prinsip-rekayasa)
3. [Kronologi & Tahapan Pembangunan (From Zero to Hero)](#3-kronologi--tahapan-pembangunan)
   - [Fase 1: Inisialisasi & Setup Proyek](#fase-1-inisialisasi--setup-proyek)
   - [Fase 2: Perancangan Fondasi Desain & Design Tokens](#fase-2-perancangan-fondasi-desain--design-tokens)
   - [Fase 3: Pengembangan Komponen Inti](#fase-3-pengembangan-komponen-inti)
   - [Fase 4: Integrasi REST API Layanan Ulasan (3-Tier)](#fase-4-integrasi-rest-api-layanan-ulasan)
   - [Fase 5: Adaptasi Responsif Mobile & iPad Drawer](#fase-5-adaptasi-responsif-mobile--ipad-drawer)
   - [Fase 6: Validasi, Optimasi, & Production Build](#fase-6-validasi-optimasi--production-build)
4. [Struktur Direktori Folder `frontend/`](#4-struktur-direktori-folder-frontend)
5. [Rincian Komponen Antarmuka](#5-rincian-komponen-antarmuka)
6. [Integrasi API & Penanganan Data](#6-integrasi-api--penanganan-data)
7. [Panduan Instalasi & Penggunaan](#7-panduan-instalasi--penggunaan)

---

## 1. Ringkasan Eksekutif & Tujuan

Aplikasi frontend ini dibangun sebagai **Portofolio Profesional Berstandar Industri** untuk **Adam Nugraha** (*Full Stack Engineer*). 

### Sasaran Utama:
- **Visual WOW Factor**: Mengusung estetika *Cyber-Minimalist Dark Luxury* dengan perpaduan latar hitam pekat, aksen *Neon Lime* (`#ccff00`), sentuhan *Electric Cyan*, tipografi modern, dan efek *Glassmorphism*.
- **Showcase Karya Autentik**: Menampilkan proyek-proyek riil yang telah dikembangkan secara lengkap dengan tangkapan layar asli, tag teknologi, live demo, dan tautan kode sumber di GitHub.
- **Dukungan Dwibahasa (Bilingual ID/EN)**: Seluruh konten teks dirancang memiliki terjemahan penuh bahasa Indonesia dan bahasa Inggris yang dapat dialihkan secara instan melalui satu tombol.
- **Integrasi Penuh Backend Arsitektur 3-Tier**: Menyediakan antarmuka interaktif bagi pengunjung untuk membaca dan mengirimkan ulasan/rating bintang yang terhubung langsung ke backend server Python (`BaseHTTPRequestHandler`) dan basis data PostgreSQL.
- **Responsivitas Sempurna**: Nyaman diakses di desktop resolusi tinggi, laptop, iPad/tablet, hingga ponsel pintar (*mobile*).

---

## 2. Tech Stack & Prinsip Rekayasa

| Kategori | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Core Framework** | **React 19** | Library UI modern berbasis komponen dengan performa rendering mutakhir dan manajemen state reaktif. |
| **Build Tool & Bundler** | **Vite 8** | Menyediakan proses kompilasi instan (*sub-second* HMR) dan bundling produksi yang sangat ringkas. |
| **Styling Engine** | **Pure Vanilla CSS** | Memberikan kebebasan desain 100%, kontrol animasi presisi, performa runtime tanpa overhead, dan modularitas token CSS custom. |
| **Icons & Visuals** | **Custom Vector SVG** | Ikon vektor berbobot ringan, tajam di layar resolusi tinggi (Retina display), dan dapat diwarnai secara dinamis. |
| **HTTP Client** | **Native Fetch API + AbortController** | Menghindari bloatware library pihak ketiga, dilengkapi timeout otomatis (8 detik) dan penanganan galat jaringan komprehensif. |
| **Linter & Code Quality**| **Oxlint** | Linter berbasis Rust berkecepatan tinggi untuk menjaga konsistensi kode JavaScript/JSX. |

---

## 3. Kronologi & Tahapan Pembangunan

### Fase 1: Inisialisasi & Setup Proyek
1. Inisialisasi proyek menggunakan Vite dengan template React (`package.json`).
2. Pembuatan konfigurasi variabel lingkungan di `.env` dan template publik di `.env.example` (`VITE_API_BASE_URL` dan `VITE_MEMBER_ROUTE`).
3. Konfigurasi `index.html` dengan metadata SEO, judul halaman yang informatif, favicon SVG modern, dan font web Google (*Plus Jakarta Sans* & *JetBrains Mono*).

### Fase 2: Perancangan Fondasi Desain & Design Tokens (`index.css`)
1. Mendefinisikan **Color Palette Tokens**:
   - Backgrounds: `--bg-primary: #080a0e`, `--bg-secondary: #0d1117`, `--bg-card: rgba(18, 22, 31, 0.75)`
   - Accents: `--accent: #ccff00` (Neon Lime), `--accent-glow: rgba(204, 255, 0, 0.35)`, `--cyan: #38bdf8`
   - Borders: `--border-subtle: rgba(255, 255, 255, 0.08)`, `--border-glow: rgba(204, 255, 0, 0.3)`
2. Menerapkan efek **Glassmorphism**: Lapisan kartu transparan dengan `backdrop-filter: blur(14px)`.
3. Menambahkan **Cosmic Background Glows**: Gradien radial halus di latar belakang halaman yang memberi kesan mendalam tanpa mengganggu keterbacaan teks.
4. Menyiapkan aturan scrollbar futuristik dan efek teks highlight neon.

### Fase 3: Pengembangan Komponen Inti
1. **IntroLoader (`IntroLoader.jsx`)**:
   - Layar animasi pembuka futuristik bergaya "terminal/cyber boot".
   - Menampilkan progres pemuatan 0% hingga 100% dengan teks status reaktif (*Initialising Environment*, *Mounting UI Components*, *Ready*).
2. **Hero Section (`Hero.jsx`)**:
   - Headline kuat: *"I craft digital architecture & code"*.
   - Badge ketersediaan kerja (*Available for Projects*) dengan indikator titik neon berkedip.
   - Avatar orbit melingkar yang menampilkan foto profil asli Adam Nugraha dikelilingi chip teknologi interaktif (React, TypeScript, Next.js, Python).
   - Tombol Call-to-Action ganda menuju galeri proyek dan profil LinkedIn.
3. **Marquee Ticker (`MarqueeTicker.jsx`)**:
   - Running text berjalan tanpa henti (*infinite horizontal scroll*) yang memuat pilar keahlian: *Full Stack Architecture*, *Clean Code*, *3-Tier Systems*, *Scalable APIs*, dan *Modern UI/UX*.
4. **About Section (`About.jsx`)**:
   - Sisi kiri: Card interaktif simulasi berkas `developer_profile.json` dengan syntax highlighting kode warna.
   - Sisi kanan: Narasi keahlian dwibahasa dan statistik pencapaian (21+ Proyek Selesai, Full Stack End-to-End, 99% Presisi Kode).
5. **Skills & Stack Section (`Skills.jsx` & `TechIcons.jsx`)**:
   - Pengelompokan keahlian ke dalam 3 kartu modular: *Frontend Ecosystem*, *Backend & Cloud Engineering*, serta *Databases & Developer Tooling*.
   - Setiap teknologi dilengkapi ikon vektor beresolusi tinggi dan keterangan spesialisasi.
6. **My Projects Section (`Projects.jsx`)**:
   - Showcase 8 proyek unggulan:
     1. **StudyFlow**: Aplikasi manajemen belajar & produktivitas (*React, CSS3, Workflow*).
     2. **SiagaKita**: Platform mitigasi bencana & pemantauan gempa BMKG (*React, BMKG API, Emergency Maps*).
     3. **Aqualink (Vendor-Hub)**: Platform logistik B2B pengadaan air bersih (*React, Logistics, Vendor Portal*).
     4. **AR.Market**: Direktori & marketplace alat AI serta software (*React, Directory, Modern UI*).
     5. **AR Gaming**: Portal hiburan web gaming interaktif (*JavaScript, HTML5 Games, CSS3*).
     6. **ComplexiGreen (Square Analysis)**: Visualisasi perbandingan algoritma rekursif vs iteratif (*AKA Tel-U*).
     7. **AR Project**: Portofolio interaktif dan personal branding (*HTML5, CSS3, JavaScript*).
     8. **Testimoni & Rating Microservice**: Layanan REST API native 3-tier Python & PostgreSQL yang aktif di web ini.
   - Setiap kartu memiliki gambar asli proyek, badge kategori, tag teknologi, efek hover zoom, serta tombol Live Preview dan Source Code GitHub.
7. **Credentials & Sertifikasi (`Credentials.jsx`)**:
   - Slider karosel sertifikasi resmi (Dicoding Indonesia, freeCodeCamp, AWS Academy).
   - Mockup sertifikat digital dengan verifikasi ID, stempel akreditasi, dan tombol verifikasi tautan.
8. **Testimonials Wall (`Testimonials.jsx`)**:
   - Tampilan kolom ulasan vertikal berjalan otomatis dengan kartu testimonial bergradien kaca.
9. **Footer Section (`Footer.jsx`)**:
   - Fitur salin email instan (`zynphronix404@gmail.com`) ke clipboard dengan feedback visual.
   - Tautan sosial media resmi: GitHub (`Adam-Nugraha225`), LinkedIn (`adamnugraha-404s`), dan Instagram (`zynphronix`).
   - Tombol kembali ke paling atas (*Back to Top*).

### Fase 4: Integrasi REST API Layanan Ulasan (`ReviewsSection.jsx` & `services/api.js`)
1. Membangun modul terpusat `api.js` untuk berkomunikasi dengan backend Python.
2. Menyediakan form interaktif:
   - Input nama pengulas & textarea komentar.
   - Selector rating interaktif 1–5 bintang dengan efek hover dinamis.
   - Validasi ketat di sisi klien sebelum data dikirim.
3. Menampilkan ringkasan statistik ulasan:
   - Nilai rata-rata rating (format angka desimal).
   - Visualisasi bar distribusi rating dari bintang 5 hingga bintang 1.
4. Daftar ulasan terpaginasi (*pagination*) dengan tombol Sebelumnya/Selanjutnya dan indikator pemuatan status data.

### Fase 5: Adaptasi Responsif Mobile & iPad Drawer (`Navbar.jsx`)
1. **Floating Pill Desktop**: Elemen mengambang di tengah atas layar dengan glassmorphism.
2. **Mobile & Tablet Drawer (`<= 1024px`)**:
   - Mengatasi masalah layout sempit di iPad/tablet dengan menghadirkan toggle hamburger neon minimalis.
   - Drawer modal elegan dengan latar blur pekat, animasi *slide down*, penomoran monospaced cyber (`01 // Tentang`, `02 // Stack`, dst.), indikator section aktif, tombol switch bahasa terintegrasi, dan CTA kontak.
   - Aksesibilitas: Menutup saat link diklik, saat mengklik area luar (backdrop), atau menekan tombol `Escape`, serta mengunci scroll latar saat menu terbuka.

### Fase 6: Validasi, Optimasi, & Production Build
1. Menjalankan linting dan pengecekan kode dengan Oxlint.
2. Validasi bundle produksi menggunakan Vite (`npm run build`), menghasilkan aset ringkas teroptimasi gzip di folder `dist/` dalam waktu kurang dari 400 milidetik.
3. Pengujian antarmuka menggunakan subagent browser pada viewport seluler (390px) dan iPad (820px).

---

## 4. Struktur Direktori Folder `frontend/`

```text
frontend/
├── public/                     # Aset publik statis
│   ├── adam-nugraha.jpg        # Foto profil resmi Adam Nugraha
│   ├── favicon.svg             # Favicon tab browser (Logo AN Neon)
│   └── icons.svg               # Sprite ikon pendukung
├── src/
│   ├── assets/                 # Aset gambar proyek beresolusi tinggi
│   │   ├── Aqualink.png        # Tangkapan layar proyek Aqualink
│   │   ├── ARGAMING.png        # Tangkapan layar proyek AR Gaming
│   │   ├── ARMARKET.png        # Tangkapan layar proyek AR Market
│   │   ├── ARPROJECT.png       # Tangkapan layar proyek AR Project
│   │   ├── Complexi-green.png  # Tangkapan layar proyek ComplexiGreen
│   │   ├── SiagaKita.png       # Tangkapan layar proyek SiagaKita
│   │   ├── StudyFlow.png       # Tangkapan layar proyek StudyFlow
│   │   ├── hero.png            # Ilustrasi grafis hero
│   │   ├── react.svg           # Logo React SVG
│   │   └── vite.svg            # Logo Vite SVG
│   ├── components/             # Komponen antarmuka modular
│   │   ├── About.jsx           # Section Tentang & Code Card
│   │   ├── Credentials.jsx     # Section Sertifikasi & Carousel
│   │   ├── Footer.jsx          # Section Footer & Tautan Sosial
│   │   ├── Hero.jsx            # Section Hero Banner & Avatar Orbit
│   │   ├── Icons.jsx           # Koleksi ikon SVG custom
│   │   ├── IntroLoader.jsx     # Layar loader pembuka aplikasi
│   │   ├── MarqueeTicker.jsx   # Running text nilai keahlian
│   │   ├── Navbar.jsx          # Floating Navbar & Mobile/iPad Drawer
│   │   ├── Projects.jsx        # Galeri showcase proyek
│   │   ├── ReviewsSection.jsx  # Form & List ulasan live REST API
│   │   ├── ServedByBanner.jsx  # Banner identitas server (Anda dilayani oleh...)
│   │   ├── Skills.jsx          # Section keahlian & stack teknologi
│   │   ├── TechIcons.jsx       # Koleksi badge SVG teknologi
│   │   └── Testimonials.jsx    # Vertical marquee testimonial
│   ├── services/
│   │   └── api.js              # Service penghubung API backend ulasan
│   ├── App.css                 # Gaya tambahan tingkat aplikasi
│   ├── App.jsx                 # Komponen root aplikasi & state bahasa
│   ├── index.css               # Desain sistem global Vanilla CSS
│   └── main.jsx                # Entry point React DOM
├── .env                        # Konfigurasi environment lokal (aktif)
├── .env.example                # Template konfigurasi environment publik
├── .gitignore                  # Berkas yang diabaikan oleh Git
├── .oxlintrc.json              # Konfigurasi linter Oxlint
├── index.html                  # Berkas HTML utama & definisi Google Fonts
├── package.json                # Dependensi proyek & script npm
└── vite.config.js              # Konfigurasi bundling Vite & plugin React
```

---

## 5. Rincian Komponen Antarmuka

| Komponen | Tag Section ID | Fitur Unggulan |
| :--- | :---: | :--- |
| `IntroLoader` | - | Animasi booting futuristik, progress bar neon, transisi *fade-out* halus. |
| `Navbar` | `#home` | Floating glass pill, scroll spy aktif, bilingual toggle, mobile/iPad responsive drawer. |
| `Hero` | `#home` | Avatar orbit dengan foto asli, glow neon, badge ketersediaan, tombol navigasi cepat. |
| `MarqueeTicker`| - | Ticker berjalan horizontal tanpa henti dengan separator neon cyber. |
| `About` | `#about` | Mockup file JSON interaktif, narasi diri dwibahasa, statistik pencapaian. |
| `Skills` | `#skills` | 3 kartu cluster teknologi (*Frontend*, *Backend*, *Tools/DB*) dengan SVG tajam. |
| `Projects` | `#projects` | Kartu proyek berfoto asli, efek hover transform, live link, dan repository link. |
| `Credentials` | `#credentials` | Slider karosel sertifikat kompetensi resmi dengan ID otentikasi. |
| `Testimonials`| `#testimonials`| Kolom ulasan vertikal berjalan otomatis dengan kutipan rekanan. |
| `ReviewsSection`| `#reviews` | Form submit ulasan, pemilihan bintang interaktif, distribusi rata-rata, paginasi. |
| `Footer` | `#contact` | Tombol satu klik salin email ke clipboard, tautan profil sosial, kembali ke atas. |

---

## 6. Integrasi API & Penanganan Data

Komunikasi data ulasan ditangani melalui modul terisolasi di `src/services/api.js`:

### Endpoint yang Didukung:
1. **GET `/api/ulasan`**:
   - Parameter Query: `?page=1&limit=10&route_id=m1`
   - Mengambil daftar ulasan terpaginasi beserta total ulasan dan rata-rata rating.
2. **POST `/api/ulasan`**:
   - Payload JSON:
     ```json
     {
       "route_id": "m1",
       "nama": "Pengunjung Portofolio",
       "comment": "Desainnya sangat futuristik dan cepat!",
       "rating": 5
     }
     ```
   - Dilengkapi validasi sanitasi input (nama tidak boleh kosong / max 100 char, rating 1-5, komentar wajib diisi).
3. **Robust Error Handling**:
   - Menggunakan `AbortController` dengan timeout 8 detik.
   - Menangani galat jaringan (*server offline/CORS*) dan memberikan pesan ramah pengguna berbahasa Indonesia.

---

## 7. Panduan Instalasi & Penggunaan

### 1. Prasyarat
- **Node.js**: Versi 18 ke atas (direkomendasikan versi LTS).
- **NPM**: Versi 9 ke atas.

### 2. Instalasi Dependensi
Masuk ke direktori `frontend` dan pasang paket yang diperlukan:
```bash
cd frontend
npm install
```

### 3. Konfigurasi Lingkungan (`.env`)
Pastikan file `.env` sudah ada dan mengarah ke alamat server backend:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_MEMBER_ROUTE=m1
```

### 4. Menjalankan Mode Pengembangan (Dev Server)
Jalankan dev server dengan Hot Module Replacement (HMR):
```bash
npm run dev
```
Aplikasi akan tersedia di: `http://localhost:5173`

### 5. Membangun Bundel Produksi (Production Build)
Untuk menghasilkan berkas statis siap rilis (minified HTML, CSS, JS, dan optimized images):
```bash
npm run build
```
Hasil build akan tersimpan di dalam folder `dist/`.

### 6. Menjalankan Linting
Periksa kualitas kode secara instan:
```bash
npm run lint
```

---

<p align="center">
  <b>Dikembangkan dengan dedikasi penuh untuk portofolio Adam Nugraha.</b><br />
  <i>Cyber-Minimalist Dark Luxury · React 19 · Pure Vanilla CSS · Vite 8</i>
</p>
