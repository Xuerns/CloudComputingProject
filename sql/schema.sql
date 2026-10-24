-- ==========================================================
-- Skema Database: Aplikasi Testimoni & Rating
-- Mendukung: PostgreSQL (Supabase) dan MySQL / MariaDB
-- ==========================================================

-- 1. Tabel Anggota (m0 s/d m4)
CREATE TABLE IF NOT EXISTS anggota (
    route_id VARCHAR(10) PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(100) NOT NULL
);

-- 2. Isi Data Anggota Kelompok
-- Menggunakan ON CONFLICT DO UPDATE (PostgreSQL) agar idempotent / aman dijalankan berulang kali
INSERT INTO anggota (route_id, nim, nama) VALUES
    ('m0', '103012400171', 'Dida Maesal Maulana'),
    ('m1', '103012400280', 'Adam Nugraha'),
    ('m2', '103012400271', 'Alvon Nicola Wiguna'),
    ('m3', '103012400368', 'Muhammad Naufal Hartono'),
    ('m4', '103012400342', 'Sendy Dwi Wijaya')
ON CONFLICT (route_id) DO UPDATE 
SET nim = EXCLUDED.nim, nama = EXCLUDED.nama;

-- 3. Tabel Ulasan / Testimoni
-- Diperuntukkan bagi fitur: post_ulasan, get_ulasan, dan get_average
CREATE TABLE IF NOT EXISTS ulasan (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(10) NOT NULL REFERENCES anggota(route_id) ON DELETE CASCADE,
    nama VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk mempercepat query get_ulasan (paginasi per server) dan get_average (agregasi rating)
CREATE INDEX IF NOT EXISTS idx_ulasan_route_id ON ulasan(route_id);
CREATE INDEX IF NOT EXISTS idx_ulasan_created_at ON ulasan(created_at DESC);
