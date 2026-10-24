from app.config import MEMBER_ROUTE
from app.database import get_db_cursor

def handle_served_by():
    try:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT route_id, nim, nama FROM anggota WHERE route_id = %s;", (MEMBER_ROUTE,))
            anggota = cursor.fetchone()

        if anggota:
            return 200, {
                "status": "success",
                "data": {
                    "route_id": anggota["route_id"],
                    "nim": anggota["nim"],
                    "nama": anggota["nama"],
                }
            }
        
        return 404, {"status": "error", "message": "Anggota tidak ditemukan"}
    except Exception as e:
        return 500, {"status": "error", "message": str(e)}