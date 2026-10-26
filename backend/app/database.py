from contextlib import contextmanager
from app.config import (
    DATABASE_URL,
    IS_SUPABASE,
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
)

def get_connection():
    """
    Membuka dan mengembalikan koneksi database:
    - Jika DATABASE_URL ada -> Menggunakan psycopg2 (Supabase / PostgreSQL)
    - Jika DATABASE_URL kosong -> Menggunakan pymysql (Localhost XAMPP MySQL / MariaDB)
    """
    try:
        if IS_SUPABASE:
            import psycopg2
            conn = psycopg2.connect(DATABASE_URL, sslmode="require", connect_timeout=10)
        else:
            import pymysql
            import pymysql.cursors
            conn = pymysql.connect(
                host=DB_HOST,
                port=DB_PORT,
                user=DB_USER,
                password=DB_PASSWORD,
                database=DB_NAME,
                charset="utf8mb4",
                connect_timeout=10,
                autocommit=False,
            )
        return conn
    except Exception as error:
        db_target = "Supabase PostgreSQL" if IS_SUPABASE else f"XAMPP MySQL ({DB_HOST}:{DB_PORT}/{DB_NAME})"
        print(f"[DB Error] Gagal membuka koneksi ke {db_target}: {error}")
        raise error


@contextmanager
def get_db_cursor(commit=False):
    """
    Helper Context Manager untuk query database.
    Menyediakan cursor dengan hasil berupa Dictionary untuk kedua jenis DB.
    Otomatis menangani commit jika commit=True, dan rollback jika terjadi error.
    """
    conn = get_connection()
    try:
        if IS_SUPABASE:
            from psycopg2.extras import RealDictCursor
            cur = conn.cursor(cursor_factory=RealDictCursor)
        else:
            import pymysql.cursors
            cur = conn.cursor(pymysql.cursors.DictCursor)

        try:
            yield cur
            if commit:
                conn.commit()
        finally:
            cur.close()

    except Exception as error:
        if commit:
            conn.rollback()
        print(f"[DB Error] Terjadi kesalahan query: {error}")
        raise error
    finally:
        conn.close()


def test_db_connection():
    """
    Memvalidasi apakah koneksi database berhasil saat server baru dijalankan.
    """
    db_target = "Supabase Cloud PostgreSQL" if IS_SUPABASE else f"Localhost XAMPP MySQL ({DB_HOST}:{DB_PORT}/{DB_NAME})"
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT 1;")
        conn.close()
        print(f"[DB] Sukses: Terhubung ke {db_target}.")
        return True
    except Exception as e:
        print(f"[DB] Gagal memverifikasi koneksi ke {db_target}: {e}")
        if not IS_SUPABASE:
            print(f"[DB Hint] Pastikan MySQL di XAMPP Control Panel sudah aktif (Start) dan database '{DB_NAME}' sudah dibuat di phpMyAdmin.")
        else:
            print("[DB Hint] Pastikan DATABASE_URL di .env valid dan koneksi internet stabil.")
        return False

