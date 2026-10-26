<h1 align="center">Komputasi Awan - Backend Service</h1>

## Struktur Folder

Berikut adalah pohon direktori proyek beserta ringkasan fungsinya:

```text
ComputingProject/
├── backend/
│   ├── app/
│   │   ├── features/          # Modul fitur spesifik (TODO: implementasi belum diisi)
│   │   │   ├── get_average.py # Perhitungan rata-rata ulasan
│   │   │   ├── get_ulasan.py  # Pengambilan data ulasan
│   │   │   ├── post_ulasan.py # Penambahan data ulasan
│   │   │   └── served_by.py   # Identifikasi instance server
│   │   ├── config.py          # Konfigurasi aplikasi terpusat
│   │   ├── database.py        # Modul koneksi PostgreSQL / MySQL / MariaDB / (Supabase jika ingin menampilkan hal yang sama untuk setiap personal page)
│   │   ├── handlers.py        # HTTP Request Handler (BaseHTTPRequestHandler)
│   │   └── main.py            # Entry point aplikasi & inisialisasi server
│   ├── tests/                 # Unit testing & integrasi
│   ├── .env.example           # Template variabel environment
│   └── requirements.txt       # Depedency Python yang dibutuhkan
├── sql/
│   └── schema.sql             # Definisi skema DDL database
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
   - Buat database baru bernama `kelompok_db` dan jalankan skrip SQL dari [sql/schema_mysql.sql](file:///f:/my-portfolio-01/sql/schema_mysql.sql).

2. **Masuk ke folder backend & aktifkan venv**:
   ```bash
   cd backend
   
   # Windows (PowerShell)
   .venv\Scripts\activate 
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


---
