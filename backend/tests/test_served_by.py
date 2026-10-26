import unittest
from unittest.mock import patch, MagicMock
from app.features.served_by import handle_served_by


class TestServedBy(unittest.TestCase):

    @patch("app.features.served_by.MEMBER_ROUTE", "m0")
    @patch("app.features.served_by.get_db_cursor")
    def test_served_by_success(self, mock_get_cursor):
        """Uji skenario normal saat data anggota ditemukan di database."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {
            "route_id": "m0",
            "nim": "103012400171",
            "nama": "Dida Maesal Maulana"
        }

        status_code, response = handle_served_by()

        self.assertEqual(status_code, 200)
        self.assertEqual(response["status"], "success")
        self.assertEqual(response["data"]["route_id"], "m0")
        self.assertEqual(response["data"]["nim"], "103012400171")
        self.assertEqual(response["data"]["nama"], "Dida Maesal Maulana")

    @patch("app.features.served_by.get_db_cursor")
    def test_served_by_not_found(self, mock_get_cursor):
        """Uji ketika anggota tidak ditemukan di database (return 404)."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = None

        status_code, response = handle_served_by()

        self.assertEqual(status_code, 404)
        self.assertEqual(response["status"], "error")
        self.assertIn("tidak ditemukan", response["message"])

    @patch("app.features.served_by.get_db_cursor")
    def test_served_by_exception(self, mock_get_cursor):
        """Uji penanganan error saat koneksi atau query database bermasalah (return 500)."""
        mock_get_cursor.side_effect = Exception("Database connection failure")

        status_code, response = handle_served_by()

        self.assertEqual(status_code, 500)
        self.assertEqual(response["status"], "error")
        self.assertIn("Database connection failure", response["message"])


if __name__ == "__main__":
    unittest.main()
