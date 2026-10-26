from app.config import MEMBER_ROUTE, DB_TYPE
from app.database import get_db_cursor

def post_ulasan(data, route_id=None):
    nama = data.get("nama")
    comment = data.get("comment")
    rating = data.get("rating")

    if not isinstance(nama, str) or nama.strip() == "":
        raise ValueError("Nama tidak boleh kosong")

    if len(nama) > 100:
        raise ValueError("Nama maksimal 100 karakter")

    if not isinstance(comment, str) or comment.strip() == "":
        raise ValueError("Komentar tidak boleh kosong")

    if type(rating) != int or rating < 1 or rating > 5:
        raise ValueError("Rating harus 1 sampai 5")

    if not route_id:
        route_id = data.get("route_id") or MEMBER_ROUTE

    if not isinstance(route_id, str) or route_id.strip() == "":
        raise ValueError("Route ID tidak valid")

    with get_db_cursor(commit=True) as cursor:
        if DB_TYPE == "postgres":
            sql = """
                INSERT INTO ulasan (route_id, nama, comment, rating)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            """
            cursor.execute(sql, (
                route_id.strip(),
                nama.strip(),
                comment.strip(),
                rating
            ))
            hasil = cursor.fetchone()
            new_id = hasil["id"]
        else:
            sql = """
                INSERT INTO ulasan (route_id, nama, comment, rating)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql, (
                route_id.strip(),
                nama.strip(),
                comment.strip(),
                rating
            ))
            new_id = cursor.lastrowid

    return {
        "status": "success",
        "message": "Ulasan berhasil disimpan",
        "id": new_id
    }
