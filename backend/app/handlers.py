import json
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler
from app.features.get_ulasan import get_ulasan

class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(body)))
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

        if path == "/health":
            self._send_json(200, {"status": "ok"})

        elif path in ("/ulasan", "/api/ulasan"):
            page = query_params.get("page", [1])[0]
            limit = query_params.get("limit", [10])[0]
            route_id = query_params.get("route_id", [None])[0]

            try:
                result = get_ulasan(page=page, limit=limit, route_id=route_id)
                self._send_json(200, result)
            except Exception as e:
                self._send_json(500, {"status": "error", "message": str(e)})

        else:
            self._send_json(404, {"error": "not found"})

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        data = json.loads(self.rfile.read(length) or b"{}")
        self._send_json(201, {"received": data})    