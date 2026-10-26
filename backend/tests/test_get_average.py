import unittest
from unittest.mock import patch, MagicMock
from app.features.get_average import get_average


class TestGetAverage(unittest.TestCase):

    @patch("app.features.get_average.get_db_cursor")
    def test_get_average_success_with_ratings(self, mock_get_cursor):
        """Uji skenario normal: anggota ditemukan dan memiliki riwayat ulasan rating."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {
            "route_id": "m1",
            "nim": "103012400280",
            "nama": "Adam Nugraha"
        }
        mock_cursor.fetchall.return_value = [
            {"rating": 5},
            {"rating": 4}
        ]

        result = get_average("m1")

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["data"]["route_id"], "m1")
        self.assertEqual(result["data"]["nama"], "Adam Nugraha")
        self.assertEqual(result["data"]["nim"], "103012400280")
        self.assertEqual(result["data"]["total_ulasan"], 2)
        self.assertEqual(result["data"]["rata_rata"], 4.5)

    @patch("app.features.get_average.get_db_cursor")
    def test_get_average_success_zero_ratings(self, mock_get_cursor):
        """Uji skenario: anggota ditemukan tetapi belum memiliki ulasan."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {
            "route_id": "m0",
            "nim": "103012400171",
            "nama": "Dida Maesal Maulana"
        }
        mock_cursor.fetchall.return_value = []

        result = get_average("m0")

        self.assertEqual(result["status"], "success")
        self.assertEqual(result["data"]["route_id"], "m0")
        self.assertEqual(result["data"]["nama"], "Dida Maesal Maulana")
        self.assertEqual(result["data"]["nim"], "103012400171")
        self.assertEqual(result["data"]["total_ulasan"], 0)
        self.assertEqual(result["data"]["rata_rata"], 0.0)

    @patch("app.features.get_average.MEMBER_ROUTE", "m1")
    @patch("app.features.get_average.get_db_cursor")
    def test_get_average_default_route(self, mock_get_cursor):
        """Uji saat route_id=None, fungsi mengambil nilai default MEMBER_ROUTE."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor

        mock_cursor.fetchone.return_value = {
            "route_id": "m1",
            "nim": "103012400280",
            "nama": "Adam Nugraha"
        }
        mock_cursor.fetchall.return_value = [{"rating": 5}]

        result = get_average(None)

        self.assertEqual(result["data"]["route_id"], "m1")
        self.assertEqual(result["data"]["rata_rata"], 5.0)

    def test_get_average_invalid_route_id(self):
        """Uji validasi jika route_id kosong atau melebihi 10 karakter."""
        with self.assertRaises(ValueError) as ctx_empty:
            get_average("   ")
        self.assertIn("Route ID tidak valid", str(ctx_empty.exception))

        with self.assertRaises(ValueError) as ctx_long:
            get_average("lebihdarisepuluhkarakter")
        self.assertIn("Route ID tidak valid", str(ctx_long.exception))

    @patch("app.features.get_average.get_db_cursor")
    def test_get_average_member_not_found(self, mock_get_cursor):
        """Uji ketika route_id tidak ada di database anggota."""
        mock_cursor = MagicMock()
        mock_get_cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = None

        with self.assertRaises(ValueError) as ctx:
            get_average("m99")
        self.assertIn("tidak ditemukan", str(ctx.exception))


if __name__ == "__main__":
    unittest.main()