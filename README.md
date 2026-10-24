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

### Penjelasan Variabel

| Variabel | Wajib | Keterangan |
| :--- | :---: | :--- |
| `DATABASE_URL` | Ya | URL koneksi basis data PostgreSQL lengkap (mendukung Supabase transaction/session pooler atau koneksi langsung). |

## Cara Menjalankan Aplikasi
1. **Masuk ke folder backend & aktifkan venv**:
   ```bash
   cd backend
   
   # linux
   source .venv/bin/activate 
   
   # windows or mac
   .venv/Scripts/activate 
   ```

2. **Install dependensi**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Pastikan konfigurasi `.env` sudah terisi**:
   ```env
   DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
4. **Jalankan aplikasi**:
   ```bash
   python -m app.main
   ```
5. Tekan `Ctrl + C` pada terminal untuk menghentikan server.

---
