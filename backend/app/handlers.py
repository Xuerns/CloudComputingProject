import json
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler
from app.features.get_ulasan import get_ulasan
from app.features.post_ulasan import post_ulasan
from app.features.get_average import get_average
from app.features.served_by import handle_served_by


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query_params = parse_qs(parsed_url.query)

        if path == "/api/health":
            self._send_json(200, {"status": "ok"})

        elif path == "/api/ulasan":
            page = query_params.get("page", [1])[0]
            limit = query_params.get("limit", [10])[0]
            route_id = query_params.get("route_id", [None])[0]
            try:
                result = get_ulasan(page=page, limit=limit, route_id=route_id)
                self._send_json(200, result)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        elif path == "/api/average":
            route_id = query_params.get("route_id", [None])[0]
            try:
                status_code, data = get_average(route_id=route_id)
                self._send_json(status_code, data)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        elif path == "/api/served_by":
            try:
                status_code, data = handle_served_by()
                self._send_json(status_code, data)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        else:
            self._send_json(404, {"status": "error", "message": "Endpoint tidak ditemukan."})

    def do_POST(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        try:
            length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(length) if length > 0 else b"{}"
            data = json.loads(body_bytes)
        except (json.JSONDecodeError, ValueError):
            self._send_json(400, {"status": "error", "message": "Body permintaan bukan JSON yang valid."})
            return

        if path == "/api/ulasan":
            route_id = data.get("route_id")
            nama = data.get("nama")
            comment = data.get("comment")
            rating = data.get("rating")

            try:
                status_code, result = post_ulasan(
                    route_id=route_id,
                    nama=nama,
                    comment=comment,
                    rating=rating,
                )
                self._send_json(status_code, result)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        else:
            self._send_json(404, {"status": "error", "message": "Endpoint tidak ditemukan."})

    def log_message(self, format, *args):
        """Override agar log lebih informatif di terminal."""
        print(f"[HTTP] {self.address_string()} - {format % args}")