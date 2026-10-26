import unittest
from unittest.mock import patch, MagicMock
from app.features.post_ulasan import post_ulasan


class TestPostUlasan(unittest.TestCase):

    @patch("app.features.post_ulasan.DB_TYPE", "postgres")
    @patch("app.features.post_ulasan.get_db_cursor")
    def test_post_ulasan_success_postgres(self, mock_get_cursor):
        """Uji penyimpanan ulasan berhasil pada mode database PostgreSQL / Supabase."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = {"id": 101}

        data = {
            "nama": "Andi Pratama",
            "comment": "Sangat informatif dan cepat!",
            "rating": 5
        }

        result = post_ulasan(data, route_id="m3")

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["message"], "Ulasan berhasil disimpan")
        self.assertEqual(result["id"], 101)
        mock_get_cursor.assert_called_with(commit=True)

    @patch("app.features.post_ulasan.DB_TYPE", "mysql")
    @patch("app.features.post_ulasan.get_db_cursor")
    def test_post_ulasan_success_mysql(self, mock_get_cursor):
        """Uji penyimpanan ulasan berhasil pada mode database MySQL / MariaDB lokal."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.lastrowid = 202

        data = {
            "nama": "Citra",
            "comment": "Tampilan UI rapi",
            "rating": 4
        }

        result = post_ulasan(data, route_id="m3")

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["id"], 202)

    @patch("app.features.post_ulasan.MEMBER_ROUTE", "m3")
    @patch("app.features.post_ulasan.DB_TYPE", "postgres")
    @patch("app.features.post_ulasan.get_db_cursor")
    def test_post_ulasan_default_route(self, mock_get_cursor):
        """Uji saat route_id tidak disertakan, mengambil default MEMBER_ROUTE."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = {"id": 1}

        data = {
            "nama": "Doni",
            "comment": "Layanan mantap",
            "rating": 5
        }

        result = post_ulasan(data, route_id=None)

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["id"], 1)

    def test_post_ulasan_invalid_nama(self):
        """Uji validasi jika nama kosong atau melebihi 100 karakter."""
        # Nama kosong
        with self.assertRaises(ValueError) as ctx_empty:
            post_ulasan({"nama": "", "comment": "Bagus", "rating": 5}, route_id="m1")
        self.assertIn("Nama tidak boleh kosong", str(ctx_empty.exception))

        # Nama lebih dari 100 karakter
        with self.assertRaises(ValueError) as ctx_long:
            post_ulasan({"nama": "A" * 101, "comment": "Bagus", "rating": 5}, route_id="m1")
        self.assertIn("Nama maksimal 100 karakter", str(ctx_long.exception))

    def test_post_ulasan_invalid_comment(self):
        """Uji validasi jika komentar kosong."""
        with self.assertRaises(ValueError) as ctx:
            post_ulasan({"nama": "Budi", "comment": "   ", "rating": 5}, route_id="m1")
        self.assertIn("Komentar tidak boleh kosong", str(ctx.exception))

    def test_post_ulasan_invalid_rating(self):
        """Uji validasi jika rating bukan int 1-5."""
        # Bukan integer (misal float atau string)
        with self.assertRaises(ValueError) as ctx_type:
            post_ulasan({"nama": "Budi", "comment": "Oke", "rating": "5"}, route_id="m1")
        self.assertIn("Rating harus 1 sampai 5", str(ctx_type.exception))

        # Kurang dari 1
        with self.assertRaises(ValueError) as ctx_low:
            post_ulasan({"nama": "Budi", "comment": "Oke", "rating": 0}, route_id="m1")
        self.assertIn("Rating harus 1 sampai 5", str(ctx_low.exception))

        # Lebih dari 5
        with self.assertRaises(ValueError) as ctx_high:
            post_ulasan({"nama": "Budi", "comment": "Oke", "rating": 6}, route_id="m1")
        self.assertIn("Rating harus 1 sampai 5", str(ctx_high.exception))

    @patch("app.features.post_ulasan.MEMBER_ROUTE", "")
    def test_post_ulasan_invalid_route_id(self):
        """Uji validasi jika route_id tidak valid atau string kosong."""
        with self.assertRaises(ValueError) as ctx:
            post_ulasan({"nama": "Budi", "comment": "Oke", "rating": 5, "route_id": ""}, route_id=None)
        self.assertIn("Route ID tidak valid", str(ctx.exception))


    @patch("app.features.post_ulasan.DB_TYPE", "postgres")
    @patch("app.features.post_ulasan.get_db_cursor")
    def test_post_ulasan_security_xss_payload(self, mock_get_cursor):
        """Uji keamanan XSS: payload <script>alert(1)</script> harus tersimpan sebagai teks biasa tanpa error."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = {"id": 999}

        payload = {
            "nama": "Tester XSS",
            "comment": "<script>alert(1)</script>",
            "rating": 5
        }

        result = post_ulasan(payload, route_id="m3")

        # 1. Pastikan berhasil tersimpan
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["id"], 999)

        # 2. Buktikan bahwa nilai dikirim sebagai data terpisah ke parameterized query (%s), bukan digabung ke SQL
        executed_sql, params = mock_cursor.execute.call_args[0]
        self.assertIn("%s", executed_sql)
        self.assertEqual(params[2], "<script>alert(1)</script>")

    @patch("app.features.post_ulasan.DB_TYPE", "postgres")
    @patch("app.features.post_ulasan.get_db_cursor")
    def test_post_ulasan_security_sqli_payload(self, mock_get_cursor):
        """Uji keamanan SQL Injection: payload ' OR '1'='1 harus aman masuk ke prepared statement tanpa merusak query."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = {"id": 1000}

        payload = {
            "nama": "' OR '1'='1",
            "comment": "' OR '1'='1",
            "rating": 5
        }

        result = post_ulasan(payload, route_id="m3")

        # 1. Pastikan berhasil tersimpan tanpa terpicu syntax error
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["id"], 1000)

        # 2. Buktikan parameter diisolasi ke dalam tuple prepared statement
        executed_sql, params = mock_cursor.execute.call_args[0]
        self.assertIn("INSERT INTO ulasan", executed_sql)
        self.assertEqual(params[1], "' OR '1'='1")
        self.assertEqual(params[2], "' OR '1'='1")


if __name__ == "__main__":
    unittest.main()
