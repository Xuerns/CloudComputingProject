from app.config import MEMBER_ROUTE, DB_TYPE
from app.database import get_db_cursor


def get_average(route_id=None):
    """
    Menghitung rata-rata rating dari tabel 'ulasan'.

    Args:
        route_id (str|None): Filter berdasarkan route_id anggota.
                             Jika None atau 'all', hitung semua ulasan.

    Returns:
        tuple: (HTTP status code (int), dict respons JSON)
    """
    if route_id in (None, "", "all", "semua", "None", "null"):
        filter_route = None
    else:
        filter_route = route_id

    avg_expr = "ROUND(AVG(rating)::numeric, 2)" if DB_TYPE == "postgres" else "ROUND(AVG(rating), 2)"

    try:
        with get_db_cursor() as cur:
            if filter_route:
                cur.execute(
                    f"""
                    SELECT
                        COUNT(*)          AS total_ulasan,
                        {avg_expr}        AS rata_rata
                    FROM ulasan
                    WHERE route_id = %s
                    """,
                    (filter_route,)
                )
            else:
                cur.execute(
                    f"""
                    SELECT
                        COUNT(*)          AS total_ulasan,
                        {avg_expr}        AS rata_rata
                    FROM ulasan
                    """
                )
            result = cur.fetchone()


        total_ulasan = int(result["total_ulasan"]) if result and result["total_ulasan"] else 0
        rata_rata = float(result["rata_rata"]) if result and result["rata_rata"] is not None else 0.0

        return 200, {
            "status": "success",
            "data": {
                "route_id": filter_route or "all",
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
