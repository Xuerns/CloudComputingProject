from app.config import MEMBER_ROUTE
from app.database import get_db_cursor


def post_ulasan(route_id, nama, comment, rating):
    """
    Menyimpan satu ulasan baru ke tabel 'ulasan' di database.

    Args:
        route_id (str): Identitas server anggota (contoh: 'm1').
        nama (str): Nama pengulas.
        comment (str): Isi komentar.
        rating (int): Nilai bintang 1–5.

    Returns:
        tuple: (HTTP status code (int), dict respons JSON)
    """
    # Validasi input
    nama = str(nama or '').strip()
    comment = str(comment or '').strip()

    if not nama or len(nama) > 100:
        return 400, {
            "status": "error",
            "message": "Nama wajib diisi dan maksimal 100 karakter."
        }

    if not comment:
        return 400, {
            "status": "error",
            "message": "Komentar tidak boleh kosong."
        }

    try:
        rating = int(rating)
    except (ValueError, TypeError):
        rating = 0

    if rating < 1 or rating > 5:
        return 400, {
            "status": "error",
            "message": "Rating harus berupa angka antara 1 dan 5."
        }

    # Gunakan route_id dari body, atau fallback ke MEMBER_ROUTE config
    if not route_id:
        route_id = MEMBER_ROUTE

    try:
        with get_db_cursor(commit=True) as cur:
            cur.execute(
                """
                INSERT INTO ulasan (route_id, nama, comment, rating)
                VALUES (%s, %s, %s, %s)
                RETURNING id, route_id, nama, comment, rating, created_at
                """,
                (route_id, nama, comment, rating)
            )
            inserted = cur.fetchone()

        if inserted:
            item = dict(inserted)
            if item.get("created_at"):
                item["created_at"] = item["created_at"].isoformat()

            return 201, {
                "status": "success",
                "message": "Ulasan berhasil disimpan.",
                "data": item
            }

        return 500, {
            "status": "error",
            "message": "Gagal mengambil data ulasan yang baru disimpan."
        }

    except Exception as e:
        print(f"[post_ulasan] Error: {e}")
        return 500, {
            "status": "error",
            "message": f"Terjadi kesalahan server: {str(e)}"
        }
