import os
from dotenv import load_dotenv

# Muat file .env jika tersedia
load_dotenv()

# Server Settings
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Identitas Server Lokal (default: m0, bisa dioverride di .env masing-masing anggota: m0 s/d m4)
MEMBER_ROUTE = os.getenv("MEMBER_ROUTE", "m1")

# Database Connection Settings
# Jika DATABASE_URL diisi (Supabase), gunakan PostgreSQL.
# Jika DATABASE_URL dikosongkan/dikomentari, gunakan MySQL/MariaDB (XAMPP).
raw_db_url = os.getenv("DATABASE_URL", "").strip()
DATABASE_URL = raw_db_url if raw_db_url else None
IS_SUPABASE = bool(DATABASE_URL)
DB_TYPE = "postgres" if IS_SUPABASE else "mysql"

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = int(os.getenv("DB_PORT", "5432" if IS_SUPABASE else "3306"))
DB_USER = os.getenv("DB_USER", "postgres" if IS_SUPABASE else "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "kelompok_db")

