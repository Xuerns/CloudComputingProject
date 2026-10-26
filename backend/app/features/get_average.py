from app.config import MEMBER_ROUTE
from app.database import get_db_cursor

def get_average(route_id=None):
    if not isinstance(route_id, str):
        route_id = MEMBER_ROUTE if route_id is None else ""
    route_id = route_id.strip()

    if route_id in ("", "None", "null", "all", "semua"):
        route_id = MEMBER_ROUTE

    if not route_id or len(route_id) > 10:
        raise ValueError("Route ID tidak valid (maksimal 10 karakter)")

    with get_db_cursor() as cursor:
        cursor.execute("SELECT route_id, nim, nama FROM anggota WHERE route_id = %s;", (route_id,))
        anggota = cursor.fetchone()
        rows = []
        if anggota:
            cursor.execute(
                "SELECT rating FROM ulasan WHERE route_id = %s AND rating >= 1 AND rating <= 5;",
                (route_id,)
            )
            rows = cursor.fetchall()

    if not anggota:
        raise ValueError(f"Anggota dengan route_id '{route_id}' tidak ditemukan")

    ratings = [r["rating"] for r in rows if isinstance(r.get("rating"), int)]
    total_ulasan = len(ratings)
    rata_rata = round(sum(ratings) / total_ulasan, 2) if total_ulasan > 0 else 0.0

    return {
        "status": "success",
        "data": {
            "route_id": route_id,
            "nama": anggota["nama"],
            "nim": anggota["nim"],
            "total_ulasan": total_ulasan,
            "rata_rata": rata_rata
        }
    }
