import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    try:
        connection = psycopg2.connect(DATABASE_URL, sslmode="require", connect_timeout=10)
        print(f"Berhasil koneksi ke database")
        return connection
    except Exception as error:
        print(f"Gagal koneksi ke database: {error}")



