<h1 align="center">Komputasi Awan</h1>

Project ini memisahkan kode menjadi 3 lapisan agar rapi, modular, dan tidak menumpuk di satu file:

```text
backend/app/
├── database.py       # Koneksi database ke Supabase
├── repositories.py   # Query SQL (SELECT, INSERT, UPDATE, DELETE)
├── services.py       # Logika bisnis & validasi data (cth: rating harus 1-5)
├── handlers.py       # HTTP & Routing (GET/POST, baca JSON, status code)
└── main.py           # Menyalakan HTTP server
```

### Aturan Menulis Kode untuk Tim:
| Layer | File | Kapan menulis di sini? |
| :--- | :--- | :--- |
| **HTTP Layer** | `handlers.py` | Saat membuat endpoint/route baru, membaca request JSON, atau mengirim response. |
| **Business Layer** | `services.py` | Saat membuat aturan/validasi data sebelum disimpan ke database. |
| **Database Layer** | `repositories.py` | Saat menulis query SQL ke tabel PostgreSQL Supabase. |

---

## Cara Menjalankan Project

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

4. **Jalankan server**:
   ```bash
   python -m app.main
   ```
   Server akan aktif di `http://localhost:8000`.