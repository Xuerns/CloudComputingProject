from app.config import MEMBER_ROUTE
from app.database import get_db_cursor


def get_average(route_id=None):
    """
    Menghitung rata-rata rating dari tabel 'ulasan'.

    Args:
        route_id (str|None): Filter berdasarkan route_id anggota.
                             Jika None, hitung semua ulasan.

    Returns:
        tuple: (HTTP status code (int), dict respons JSON)
    """
    if not route_id:
        route_id = MEMBER_ROUTE

    try:
        with get_db_cursor() as cur:
            cur.execute(
                """
                SELECT
                    COUNT(*)          AS total_ulasan,
                    ROUND(AVG(rating)::numeric, 2) AS rata_rata
                FROM ulasan
                WHERE route_id = %s
                """,
                (route_id,)
            )
            result = cur.fetchone()

        total_ulasan = int(result["total_ulasan"]) if result else 0
        rata_rata = float(result["rata_rata"]) if result and result["rata_rata"] is not None else 0.0

        return 200, {
            "status": "success",
            "data": {
                "route_id": route_id,
                "total_ulasan": total_ulasan,
                "rata_rata_rating": rata_rata,
            }
        }

    except Exception as e:
        print(f"[get_average] Error: {e}")
        return 500, {
            "status": "error",
            "message": f"Terjadi kesalahan server: {str(e)}"
        }
