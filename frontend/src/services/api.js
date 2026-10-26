/**
 * Centralized API service for communicating with Python BaseHTTPRequestHandler backend.
 * PRD Requirement:
 * - Reads base URL from import.meta.env.VITE_API_BASE_URL (never expose database secrets)
 * - Centralized fetch handler with timeout and error handling
 * - Clean interface for get_ulasan, post_ulasan, and health check
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
const DEFAULT_ROUTE_ID = import.meta.env.VITE_MEMBER_ROUTE || 'm1';

/**
 * Generic request helper with timeout & standard JSON parsing
 */
async function request(endpoint, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with status ${response.status}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Koneksi timeout: Server backend tidak merespons dalam waktu yang ditentukan.');
      timeoutError.isTimeout = true;
      throw timeoutError;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const netError = new Error('Tidak dapat terhubung ke server backend (Offline / Network Error).');
      netError.isNetworkError = true;
      throw netError;
    }
    throw error;
  }
}

/**
 * Get reviews list with pagination and optional route_id filter
 */
export async function getUlasan({ page = 1, limit = 50, routeId = null } = {}) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (routeId && routeId !== 'all') {
    query.set('route_id', routeId);
  }

  return await request(`/api/ulasan?${query.toString()}`, {
    method: 'GET',
  });
}

/**
 * Submit new review & rating
 */
export async function postUlasan({ nama, comment, rating, routeId = DEFAULT_ROUTE_ID }) {
  // Client-side validations matching backend schema requirements
  if (!nama || typeof nama !== 'string' || nama.trim().length === 0) {
    throw new Error('Nama wajib diisi.');
  }
  if (nama.trim().length > 100) {
    throw new Error('Nama maksimal 100 karakter.');
  }

  if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
    throw new Error('Komentar tidak boleh kosong.');
  }

  const numericRating = Number(rating);
  if (!numericRating || numericRating < 1 || numericRating > 5) {
    throw new Error('Rating harus berupa angka antara 1 dan 5.');
  }

  const payload = {
    route_id: routeId,
    nama: nama.trim(),
    comment: comment.trim(),
    rating: numericRating,
  };

  return await request('/api/ulasan', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Check backend health
 */
export async function checkBackendHealth() {
  try {
    const res = await request('/api/health', { method: 'GET' }, 3000);
    return res?.status === 'ok';
  } catch {
    return false;
  }
}

/**
 * Get instance served by info
 */
export async function getServedByInfo() {
  try {
    return await request('/api/served_by', { method: 'GET' }, 4000);
  } catch {
    return null;
  }
}

/**
 * Utility: generate 1-2 letter initials from full name
 * Examples: "Ahmad Dani" -> "AD", "Budi" -> "B", " Siti  Nur  Haliza " -> "SN"
 */
export function getInitials(name = '') {
  if (!name || typeof name !== 'string') return 'AN';
  const clean = name.trim().replace(/\s+/g, ' ');
  if (!clean) return 'AN';

  const parts = clean.split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export { API_BASE_URL, DEFAULT_ROUTE_ID };
