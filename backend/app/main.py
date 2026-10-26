import sys
from http.server import ThreadingHTTPServer
from app.config import HOST, PORT, MEMBER_ROUTE, IS_SUPABASE, DB_NAME, DB_HOST, DB_PORT
from app.database import test_db_connection
from app.handlers import Handler

def main():
    db_mode = "Supabase (Cloud PostgreSQL)" if IS_SUPABASE else f"Localhost XAMPP MySQL ({DB_HOST}:{DB_PORT}/{DB_NAME})"
    print(f"=== Menjalankan Backend Service Testimoni & Rating ===")
    print(f"Server Identity (MEMBER_ROUTE): {MEMBER_ROUTE}")
    print(f"Database Mode                 : {db_mode}")
    
    # 1. Uji koneksi ke database saat server mulai berjalan
    print("[1/2] Mengecek koneksi database...")
    if not test_db_connection():
        if IS_SUPABASE:
            print("[PERINGATAN] Database belum dapat terhubung. Pastikan DATABASE_URL di .env sudah benar.")
        else:
            print(f"[PERINGATAN] Database lokal belum dapat terhubung. Pastikan MySQL di XAMPP aktif dan database '{DB_NAME}' sudah dibuat.")

    
    # 2. Inisialisasi HTTP Server
    print(f"[2/2] Memulai HTTP Server pada http://{HOST}:{PORT} ...")
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    
    try:
        print(f"Server berhasil berjalan! Akses: http://localhost:{PORT}")
        print("Tekan Ctrl + C untuk menghentikan server.")
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Sinyal henti diterima (KeyboardInterrupt). Menghentikan server...")
    finally:
        server.server_close()
        print("[INFO] Server telah dimatikan dengan aman.")

if __name__ == "__main__":
    main()