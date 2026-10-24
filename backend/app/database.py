import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from app.config import DATABASE_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME

def get_connection():
    """
    Membuka dan mengembalikan koneksi mentah ke database PostgreSQL / Supabase.
    """
    try:
        if DATABASE_URL:
            conn = psycopg2.connect(DATABASE_URL, sslmode="require", connect_timeout=10)
        else:
            conn = psycopg2.connect(
                host=DB_HOST,
                port=DB_PORT,
                user=DB_USER,
                password=DB_PASSWORD,
                dbname=DB_NAME,
                connect_timeout=10
            )
        return conn
    except Exception as error:
        print(f"[DB Error] Gagal membuka koneksi database: {error}")
        raise error


@contextmanager
def get_db_cursor(commit=False):
    """
    Helper Context Manager untuk query database.
    Menyediakan cursor dengan hasil berupa Dictionary (RealDictCursor).
    Otomatis menangani commit jika commit=True, dan rollback jika terjadi error.
    
    Contoh penggunaan:
        from app.database import get_db_cursor
        
        # Contoh SELECT:
        with get_db_cursor() as cur:
            cur.execute("SELECT * FROM ulasan WHERE route_id = %s", (route_id,))
            rows = cur.fetchall()
            
        # Contoh INSERT:
        with get_db_cursor(commit=True) as cur:
            cur.execute("INSERT INTO ulasan (route_id, rating, komentar) VALUES (%s, %s, %s)", (route_id, 5, 'Keren!'))
    """
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            yield cur
            if commit:
                conn.commit()
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
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT 1;")
        conn.close()
        print("[DB] Koneksi ke database berhasil diverifikasi.")
        return True
    except Exception as e:
        print(f"[DB] Gagal memverifikasi koneksi database: {e}")
        return False
