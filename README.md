<h1 align="center">Komputasi Awan - Aplikasi Testimoni dan Rating</h1>

## Anggota Kelompok
| Route | NIM | Nama | Tugas |
| :--- | :--- | :--- | :--- |
| m0 | 103012400171 | Dida Maesal Maulana | served_by & Unit Testing |
| m1 | 103012400280 | Adam Nugraha | Konfigurasi & Database |
| m2 | 103012400271 | Alvon Nicola Wiguna | get_ulasan & Paginasi |
| m3 | 103012400368 | Muhammad Naufal Hartono | post_ulasan |
| m4 | 103012400342 | Sendy Dwi Wijaya | get_average |

## Struktur Folder

Berikut adalah pohon direktori proyek beserta ringkasan fungsinya:

```text
ComputingProject/
├── backend/
│   ├── app/
│   │   ├── features/          # Modul implementasi fitur spesifik
│   │   │   ├── get_average.py # Perhitungan rata-rata ulasan
│   │   │   ├── get_ulasan.py  # Pengambilan data ulasan
│   │   │   ├── post_ulasan.py # Penambahan data ulasan
│   │   │   └── served_by.py   # Identifikasi instance server
│   │   ├── config.py          # Konfigurasi aplikasi terpusat
│   │   ├── database.py        # Modul koneksi PostgreSQL / MySQL / MariaDB / Supabase
│   │   ├── handlers.py        # HTTP Request Handler (BaseHTTPRequestHandler)
│   │   └── main.py            # Entry point aplikasi & inisialisasi server
│   ├── tests/                 # Unit testing & integrasi
│   │   ├── test_post_ulasan.py
│   │   ├── test_get_ulasan.py
│   │   ├── test_get_average.py
│   │   └── test_served_by.py
│   ├── .env.example           # Template variabel environment
│   └── requirements.txt       # Depedency Python yang dibutuhkan
├── sql/
│   ├── schema.sql             # Skema basis data PostgreSQL (Supabase)
│   └── schema_mysql.sql       # Skema basis data MySQL / MariaDB (XAMPP)
├── .gitignore                 # Konfigurasi file yang diabaikan git
└── README.md                  # Dokumentasi proyek
```

### Penjelasan Variabel `.env`

Aplikasi mendukung 2 mode basis data yang dapat dipilih dengan mudah:

1. **Mode Localhost XAMPP (MySQL / MariaDB)**:
   - Dibiarkan aktif saat ingin menggunakan database lokal XAMPP.
   - Variabel yang digunakan:
     - `DB_HOST=127.0.0.1`
     - `DB_PORT=3306`
     - `DB_USER=root`
     - `DB_PASSWORD=` (kosong untuk default XAMPP)
     - `DB_NAME=kelompok_db`
   - Pastikan variabel `DATABASE_URL` dikomentari atau dikosongkan.

2. **Mode Supabase (Cloud PostgreSQL)**:
   - Aktifkan dengan mengisi dan meng-uncomment `DATABASE_URL`.
   - Format: `DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

## Cara Menjalankan Aplikasi

1. **Persiapan Database (Jika menggunakan XAMPP)**:
   - Buka **XAMPP Control Panel** dan klik **Start** pada modul **Apache** dan **MySQL**.
   - Buka phpMyAdmin di `http://localhost/phpmyadmin`.
   - Buat database baru bernama `kelompok_db` dan jalankan skrip SQL dari file `sql/schema_mysql.sql`.

2. **Masuk ke folder backend, buat & aktifkan venv**:
   ```bash
   cd backend
   
   # Buat environment virtual (jika baru pertama kali clone)
   python -m venv .venv

   # Aktivasi venv di Windows (PowerShell)
   .venv\Scripts\activate 

   # Linux / MAC
   source .venv/bin/activate
   ```

3. **Install dependensi**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Jalankan aplikasi backend**:
   ```bash
   python -m app.main
   ```
5. Tekan `Ctrl + C` pada terminal untuk menghentikan server.

## Cara Menjalankan Unit Test

Pastikan virtual environment (`.venv`) sudah aktif, lalu jalankan seluruh pengujian unit test dari folder `backend/`:

```bash
# Menjalankan seluruh test suite sekaligus
python -m unittest discover tests -v

# Atau menjalankan per berkas pengujian secara spesifik
python -m unittest tests/test_get_average.py -v
python -m unittest tests/test_served_by.py -v
python -m unittest tests/test_get_ulasan.py -v
python -m unittest tests/test_post_ulasan.py -v
```

---
