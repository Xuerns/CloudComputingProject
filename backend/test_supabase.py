import os
import sys
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME", "postgres")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")

print("=" * 60)
print("🔍 PENGUJIAN KONEKSI DATABASE SUPABASE")
print("=" * 60)

has_tested = False

# 1. UJI VIA POSTGRESQL CONNECTION (DATABASE_URL / DB_* params)
if DATABASE_URL or DB_HOST:
    has_tested = True
    print("\n[Mode 1] Menguji Koneksi PostgreSQL Langsung (Connection Pooler / Supavisor)...")
    if DB_HOST:
        print(f"📡 Host     : {DB_HOST}:{DB_PORT}")
        print(f"👤 User     : {DB_USER}")
        print(f"📁 Database : {DB_NAME}")
    elif DATABASE_URL:
        # Mask password for display
        safe_url = DATABASE_URL
        if "@" in safe_url and ":" in safe_url:
            parts = safe_url.split("@")
            prefix = parts[0].split(":")
            if len(prefix) >= 3:
                safe_url = f"{prefix[0]}:{prefix[1]}:****@{parts[1]}"
        print(f"🔗 Database URL: {safe_url}")

    try:
        import psycopg2

        # Connect with sslmode='require' (mandatory for Supabase)
        conn_params = {}
        if DATABASE_URL:
            # Check if sslmode is in URL
            if "sslmode" not in DATABASE_URL:
                conn = psycopg2.connect(DATABASE_URL, sslmode="require")
            else:
                conn = psycopg2.connect(DATABASE_URL)
        else:
            conn = psycopg2.connect(
                host=DB_HOST,
                port=DB_PORT,
                user=DB_USER,
                password=DB_PASSWORD,
                dbname=DB_NAME,
                sslmode="require",
                connect_timeout=10,
            )

        cursor = conn.cursor()
        
        # Test basic query
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()[0]
        
        cursor.execute("SELECT current_database(), current_user, now();")
        db_name, db_user, current_time = cursor.fetchone()

        print("\n✅ KONEKSI POSTGRESQL BERHASIL!")
        print(f"   - Database : {db_name}")
        print(f"   - User     : {db_user}")
        print(f"   - Waktu DB : {current_time}")
        print(f"   - Versi    : {db_version.split(',')[0]}")

        # Check existing tables in public schema
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        """)
        tables = [row[0] for row in cursor.fetchall()]
        print(f"\n📋 Daftar Tabel di skema 'public' ({len(tables)} tabel):")
        if tables:
            for t in tables:
                cursor.execute(f"SELECT COUNT(*) FROM \"{t}\";")
                count = cursor.fetchone()[0]
                print(f"   • {t} ({count} baris)")
        else:
            print("   (Belum ada tabel yang dibuat di skema public)")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n❌ Gagal koneksi ke PostgreSQL: {e}")

# 2. UJI VIA SUPABASE REST CLIENT (Jika URL & KEY ada)
if SUPABASE_URL and SUPABASE_KEY:
    has_tested = True
    print("\n[Mode 2] Menguji Koneksi Supabase SDK (REST API)...")
    print(f"📡 Supabase URL : {SUPABASE_URL}")
    try:
        from supabase import create_client, Client
        client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        res = client.table("testimoni").select("*").limit(1).execute()
        print("✅ Berhasil terhubung via Supabase SDK Client!")
    except Exception as e:
        print(f"⚠️ Status Supabase SDK: {e}")

if not has_tested:
    print("\n❌ Kredensial belum ditemukan!")
    print("Harap isi konfigurasi `DATABASE_URL` atau `SUPABASE_URL` di file `.env`.")

print("\n" + "=" * 60)
