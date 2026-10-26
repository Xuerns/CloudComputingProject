import json
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler
from app.features.get_ulasan import get_ulasan
from app.features.served_by import handle_served_by
from app.features.post_ulasan import post_ulasan
from app.features.get_average import get_average

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
            if route_id in ("all", "semua", "", "None", "null"):
                route_id = None

            try:
                result = get_ulasan(page=page, limit=limit, route_id=route_id)
                self._send_json(200, result)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})
        
        elif path == "/api/served_by":
            try:
                status_code, data = handle_served_by()
                self._send_json(status_code, data)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        elif path in ("/api/average", "/api/ulasan/average"):
            try:
                route_id = query_params.get("route_id", [None])[0]
                if route_id in ("all", "semua", "", "None", "null"):
                    route_id = None
                self._send_json(200, get_average(route_id=route_id))
            except (ValueError, TypeError) as e:
                self._send_json(400, {"status": "error", "message": str(e)})
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

                
        else:
            self._send_json(404, {"status": "error", "message": "not found"})

    
    def do_POST(self):

        path = urlparse(self.path).path

        if path != "/api/ulasan":
            self._send_json(404, {
                "status": "error",
                "message": "not found"
            })
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length) or b"{}")

            if not isinstance(data, dict):
                raise ValueError("Data harus berupa objek JSON")

            # Sementara untuk pengujian lokal
            route_id = data.get("route_id")

            hasil = post_ulasan(data, route_id)

            self._send_json(201, hasil)

        except (ValueError, TypeError) as e:
            self._send_json(400, {
                "status": "error",
                "message": str(e)
            })

        except Exception:
            self._send_json(500, {
                "status": "error",
                "message": "Gagal menyimpan ulasan"
            })
    