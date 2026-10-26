import unittest
from datetime import datetime
from unittest.mock import patch, MagicMock
from app.features.get_ulasan import get_ulasan


class TestGetUlasan(unittest.TestCase):

    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_all_success(self, mock_get_cursor):
        """Uji skenario normal: mengambil seluruh ulasan tanpa filter route_id."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {"total": 1}
        mock_cursor.fetchall.return_value = [
            {
                "id": 1,
                "route_id": "m1",
                "nama": "Budi",
                "comment": "Bagus sekali!",
                "rating": 5,
                "created_at": datetime(2025, 1, 1, 10, 0, 0)
            }
        ]

        result = get_ulasan(page=1, limit=10)

        self.assertEqual(result["status"], "success")
        self.assertEqual(len(result["data"]), 1)
        self.assertEqual(result["data"][0]["nama"], "Budi")
        self.assertEqual(result["data"][0]["created_at"], "2025-01-01T10:00:00")
        self.assertEqual(result["pagination"]["current_page"], 1)
        self.assertEqual(result["pagination"]["total_data"], 1)
        self.assertEqual(result["pagination"]["total_pages"], 1)
        self.assertFalse(result["pagination"]["has_next"])
        self.assertFalse(result["pagination"]["has_prev"])

    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_filtered_by_route_id(self, mock_get_cursor):
        """Uji query dengan filter spesifik route_id."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {"total": 1}
        mock_cursor.fetchall.return_value = [
            {
                "id": 2,
                "route_id": "m2",
                "nama": "Siti",
                "comment": "Pelayanan cepat",
                "rating": 4,
                "created_at": None
            }
        ]

        result = get_ulasan(page=1, limit=5, route_id="m2")

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["data"][0]["route_id"], "m2")
        self.assertEqual(result["pagination"]["limit"], 5)

    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_pagination_navigation(self, mock_get_cursor):
        """Uji navigasi halaman has_next dan has_prev pada halaman kedua."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        # Total 25 data, limit 10 -> total 3 halaman. Halaman 2 harus has_next=True dan has_prev=True
        mock_cursor.fetchone.return_value = {"total": 25}
        mock_cursor.fetchall.return_value = [{"id": i} for i in range(11, 21)]

        result = get_ulasan(page=2, limit=10)

        self.assertEqual(result["pagination"]["current_page"], 2)
        self.assertEqual(result["pagination"]["total_pages"], 3)
        self.assertTrue(result["pagination"]["has_prev"])
        self.assertTrue(result["pagination"]["has_next"])

    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_invalid_page_and_limit_fallback(self, mock_get_cursor):
        """Uji input invalid (string / nilai non-integer) akan fallback ke nilai aman (page=1, limit=10)."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {"total": 0}
        mock_cursor.fetchall.return_value = []

        result = get_ulasan(page="invalid_page", limit=-5)

        self.assertEqual(result["pagination"]["current_page"], 1)
        self.assertEqual(result["pagination"]["limit"], 10)

    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_empty_data(self, mock_get_cursor):
        """Uji kondisi ketika database kosong tanpa data ulasan."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = None
        mock_cursor.fetchall.return_value = []

        result = get_ulasan(page=1, limit=10)

        self.assertEqual(result["data"], [])
        self.assertEqual(result["pagination"]["total_data"], 0)
        self.assertEqual(result["pagination"]["total_pages"], 1)


    @patch("app.features.get_ulasan.get_db_cursor")
    def test_get_ulasan_security_payload_rendered_as_plain_text(self, mock_get_cursor):
        """Uji keamanan: ulasan berisi script dan quote SQL harus dikembalikan utuh sebagai string murni."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {"total": 1}
        mock_cursor.fetchall.return_value = [
            {
                "id": 50,
                "route_id": "m1",
                "nama": "' OR '1'='1",
                "comment": "<script>alert(1)</script>",
                "rating": 5,
                "created_at": None
            }
        ]

        result = get_ulasan(page=1, limit=10)

        self.assertEqual(result["status"], "success")
        item = result["data"][0]
        # Data tetap berupa string teks biasa tanpa dieksekusi atau dirusak
        self.assertEqual(item["nama"], "' OR '1'='1")
        self.assertEqual(item["comment"], "<script>alert(1)</script>")


if __name__ == "__main__":
    unittest.main()
