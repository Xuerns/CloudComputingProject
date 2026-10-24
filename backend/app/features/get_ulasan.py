import math
from app.database import get_db_cursor

def get_ulasan(page=1, limit=10, route_id=None):
    try:
        page = max(1, int(page))
        limit = max(1, int(limit))
    except (ValueError, TypeError):
        page = 1
        limit = 10

    offset = (page - 1) * limit
    with get_db_cursor() as cur:
        if route_id:
            count_query = "SELECT COUNT(*) AS total FROM ulasan WHERE route_id = %s"
            cur.execute(count_query, (route_id,))
            count_result = cur.fetchone()
            total_data = count_result["total"] if count_result else 0

            data_query = """
                SELECT id, route_id, nama, comment, rating, created_at
                FROM ulasan
                WHERE route_id = %s
                ORDER BY created_at DESC, id DESC
                LIMIT %s OFFSET %s
            """
            cur.execute(data_query, (route_id, limit, offset))
        else:
            count_query = "SELECT COUNT(*) AS total FROM ulasan"
            cur.execute(count_query)
            count_result = cur.fetchone()
            total_data = count_result["total"] if count_result else 0

            data_query = """
                SELECT id, route_id, nama, comment, rating, created_at
                FROM ulasan
                ORDER BY created_at DESC, id DESC
                LIMIT %s OFFSET %s
            """
            cur.execute(data_query, (limit, offset))

        rows = cur.fetchall()

    data = []
    for row in rows:
        item = dict(row)
        if item.get("created_at"):
            item["created_at"] = item["created_at"].isoformat()
        data.append(item)

    total_pages = math.ceil(total_data / limit) if total_data > 0 else 1

    return {
        "status": "success",
        "data": data,
        "pagination": {
            "current_page": page,
            "limit": limit,
            "total_data": total_data,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
    }
