import os
import sys
import psycopg2
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ Error: DATABASE_URL tidak ditemukan di .env!")
    sys.exit(1)

print("=" * 60)
print("🧪 UJI INSERT & READ DATA KE SUPABASE POSTGRESQL")
print("=" * 60)

try:
    conn = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = conn.cursor()

    # Route ID maksimal 10 karakter (Foreign Key ulasan -> anggota)
    route_id = "rt-test1"
    nim = "220101001"
    nama = "Budi Santoso"

    # 1. Pastikan data 'anggota' ada terlebih dahulu (karena foreign key)
    print(f"\n1️⃣ Menyiapkan data pada tabel 'anggota' (route_id: '{route_id}')...")
    cur.execute("SELECT route_id, nim, nama FROM anggota WHERE route_id = %s;", (route_id,))
    existing_anggota = cur.fetchone()

    if existing_anggota:
        print(f"   ℹ️ Anggota dengan route_id '{route_id}' sudah ada: NIM {existing_anggota[1]} - {existing_anggota[2]}")
    else:
        cur.execute("""
            INSERT INTO anggota (route_id, nim, nama)
            VALUES (%s, %s, %s)
            RETURNING route_id, nim, nama;
        """, (route_id, nim, nama))
        new_anggota = cur.fetchone()
        conn.commit()
        print(f"   ✅ Berhasil INSERT anggota baru:")
        print(f"      • Route ID : {new_anggota[0]}")
        print(f"      • NIM      : {new_anggota[1]}")
        print(f"      • Nama     : {new_anggota[2]}")

    # 2. Test Insert ke tabel 'ulasan'
    print(f"\n2️⃣ Menguji INSERT ulasan baru ke tabel 'ulasan'...")
    insert_query = """
        INSERT INTO ulasan (route_id, nama, comment, rating)
        VALUES (%s, %s, %s, %s)
        RETURNING id, route_id, nama, comment, rating, created_at;
    """
    sample_comment = "Pengujian koneksi Supabase berhasil dan data tersimpan!"
    sample_rating = 5

    cur.execute(insert_query, (route_id, nama, sample_comment, sample_rating))
    inserted_ulasan = cur.fetchone()
    conn.commit()

    print("   ✅ Berhasil INSERT data ulasan:")
    print(f"      • ID        : {inserted_ulasan[0]}")
    print(f"      • Route ID  : {inserted_ulasan[1]}")
    print(f"      • Nama      : {inserted_ulasan[2]}")
    print(f"      • Comment   : {inserted_ulasan[3]}")
    print(f"      • Rating    : {'⭐' * inserted_ulasan[4]} ({inserted_ulasan[4]}/5)")
    print(f"      • Waktu     : {inserted_ulasan[5]}")

    # 3. Test Select untuk membaca data
    print("\n3️⃣ Menguji SELECT (membaca kembali data dari database Supabase)...")
    cur.execute("""
        SELECT u.id, u.route_id, a.nim, u.nama, u.comment, u.rating, u.created_at
        FROM ulasan u
        JOIN anggota a ON u.route_id = a.route_id
        ORDER BY u.id DESC
        LIMIT 5;
    """)
    rows = cur.fetchall()
    print(f"   📊 5 Ulasan Terbaru (JOIN anggota):")
    for r in rows:
        print(f"      - [ID: {r[0]}] {r[3]} ({r[2]}) - Rating: {r[5]}/5")
        print(f"        \"{r[4]}\" ({r[6]})")

    # Hitung total data
    cur.execute("SELECT COUNT(*) FROM ulasan;")
    count_ulasan = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM anggota;")
    count_anggota = cur.fetchone()[0]

    print("\n" + "=" * 60)
    print("🎉 SUKSES! Database Supabase terbukti aktif membaca & menulis data!")
    print(f"📈 Total Data Tersimpan:")
    print(f"   • Tabel 'anggota': {count_anggota} baris")
    print(f"   • Tabel 'ulasan' : {count_ulasan} baris")
    print("=" * 60)

    cur.close()
    conn.close()

except Exception as err:
    print(f"\n❌ Terjadi kesalahan saat operasi database: {err}")
    sys.exit(1)
