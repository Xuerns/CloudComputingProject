-- ==========================================================
-- Skema Database MySQL / MariaDB (XAMPP / phpMyAdmin)
-- Database Target: kelompok_db
-- ==========================================================

-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS kelompok_db;
USE kelompok_db;

-- 1. Tabel Anggota (m0 s/d m4)
CREATE TABLE IF NOT EXISTS anggota (
    route_id VARCHAR(10) PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Isi Data Anggota Kelompok
INSERT INTO anggota (route_id, nim, nama) VALUES
    ('m0', '103012400171', 'Dida Maesal Maulana'),
    ('m1', '103012400280', 'Adam Nugraha'),
    ('m2', '103012400271', 'Alvon Nicola Wiguna'),
    ('m3', '103012400368', 'Muhammad Naufal Hartono'),
    ('m4', '103012400342', 'Sendy Dwi Wijaya')
ON DUPLICATE KEY UPDATE 
    nim = VALUES(nim),
    nama = VALUES(nama);

-- 3. Tabel Ulasan / Testimoni
CREATE TABLE IF NOT EXISTS ulasan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id VARCHAR(10) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ulasan_anggota FOREIGN KEY (route_id) REFERENCES anggota(route_id) ON DELETE CASCADE,
    INDEX idx_ulasan_route_id (route_id),
    INDEX idx_ulasan_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
