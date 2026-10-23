from http.server import ThreadingHTTPServer
from app.database import get_connection
from app.handlers import Handler

HOST = "0.0.0.0"
PORT = 8000

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    connect_DB = get_connection()
    
    try:
        print(f"Server jalan di http://localhost:{PORT}")
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer dihentikan")
        server.server_close()