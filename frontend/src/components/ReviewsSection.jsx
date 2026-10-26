import React, { useState, useEffect, useCallback } from 'react';
import { getUlasan, postUlasan, getInitials, DEFAULT_ROUTE_ID } from '../services/api';
import { StarIcon, UserIcon, SendIcon, CheckIcon } from './Icons';

const NODE_OPTIONS = ['all', 'm0', 'm1', 'm2', 'm3', 'm4'];

export default function ReviewsSection({ lang }) {
  // Reviews List State
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_data: 0, total_pages: 1 });
  const [filterNode, setFilterNode] = useState('all');
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  // Form State
  const [nama, setNama] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formAlert, setFormAlert] = useState(null); // { type: 'success' | 'error', message: '' }

  // Load reviews from backend
  const fetchReviews = useCallback(async (nodeToFetch) => {
    const targetNode = nodeToFetch !== undefined ? nodeToFetch : filterNode;
    setIsLoadingReviews(true);
    setReviewsError(null);
    try {
      const response = await getUlasan({
        page: 1,
        limit: 50,
        routeId: targetNode === 'all' ? null : targetNode,
      });
      if (response && response.status === 'success') {
        setReviews(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setReviews(response?.data || []);
      }
    } catch (err) {
      console.warn('Reviews fetch warning:', err.message);
      setReviewsError(
        lang === 'ID'
          ? 'Belum dapat terhubung ke server backend lokal (http://localhost:8000). Pastikan backend Python sudah berjalan.'
          : 'Could not connect to local backend server (http://localhost:8000). Please ensure Python backend is running.'
      );
    } finally {
      setIsLoadingReviews(false);
    }
  }, [lang, filterNode]);

  useEffect(() => {
    fetchReviews(filterNode);
  }, [filterNode]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAlert(null);

    // Validation
    const cleanNama = nama.trim();
    const cleanComment = comment.trim();

    if (!cleanNama) {
      setFormAlert({
        type: 'error',
        message: lang === 'ID' ? 'Mohon masukkan nama Anda.' : 'Please enter your name.',
      });
      return;
    }

    if (cleanNama.length > 100) {
      setFormAlert({
        type: 'error',
        message: lang === 'ID' ? 'Nama maksimal 100 karakter.' : 'Name maximum 100 characters.',
      });
      return;
    }

    if (!cleanComment) {
      setFormAlert({
        type: 'error',
        message: lang === 'ID' ? 'Mohon tulis komentar Anda.' : 'Please write your comment.',
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      setFormAlert({
        type: 'error',
        message: lang === 'ID' ? 'Pilih rating antara 1 hingga 5 bintang.' : 'Please choose a rating between 1 and 5.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await postUlasan({
        nama: cleanNama,
        comment: cleanComment,
        rating,
        routeId: DEFAULT_ROUTE_ID,
      });

      setFormAlert({
        type: 'success',
        message:
          lang === 'ID'
            ? 'Ulasan Anda berhasil dikirim! Terima kasih atas masukan Anda.'
            : 'Your review was submitted successfully! Thank you for your feedback.',
      });

      // Clear form inputs
      setNama('');
      setComment('');
      setRating(5);

      // Refresh list
      await fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
      setFormAlert({
        type: 'error',
        message:
          err.message ||
          (lang === 'ID'
            ? 'Gagal mengirim ulasan ke server backend. Periksa koneksi backend Anda.'
            : 'Failed to submit review to backend server. Please check your backend connection.'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating safely
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / reviews.length).toFixed(1)
      : null;

  // Format date helper (YYYY-MM-DD)
  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return '';
    }
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-tag">05 // COMMUNITY FEEDBACK</div>
        <h2 className="section-title">
          {lang === 'ID' ? 'Ulasan & Rating Pengunjung' : 'Visitor Reviews & Ratings'}
        </h2>
        <p className="section-subtitle">
          {lang === 'ID'
            ? 'Bagikan masukan, rating bintang, dan feedback Anda mengenai karya atau kolaborasi dengan Adam Nugraha.'
            : 'Share your genuine impressions, star rating, and thoughts on projects and work delivered by Adam Nugraha.'}
        </p>

        <div className="reviews-grid-layout">
          {/* =========================================================
              LEFT COLUMN: Form Tinggalkan Komentar & Rating
              ========================================================= */}
          <div className="review-form-card">
            <div className="form-header-badge">
              <span className="dot-pulse" />
              <span>{lang === 'ID' ? 'FORMULIR ULASAN' : 'FEEDBACK FORM'}</span>
            </div>

            <h3 className="form-title">
              {lang === 'ID' ? 'Tinggalkan Komentar' : 'Leave a Review'}
            </h3>
            <p className="form-desc">
              {lang === 'ID'
                ? 'Bagikan pengalaman, pertanyaan, atau pendapatmu tentang proyek dari karya yang saya buat.'
                : 'Share your feedback, inquiries, or thoughts regarding my projects and engineering works.'}
            </p>

            {formAlert && (
              <div className={`form-alert ${formAlert.type}`} role="alert">
                {formAlert.type === 'success' ? <CheckIcon size={18} /> : <span>⚠️</span>}
                <span>{formAlert.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Nama Input */}
              <div className="form-group">
                <label className="form-label" htmlFor="review-name">
                  {lang === 'ID' ? 'Nama Anda' : 'Your Name'}
                </label>
                <div className="input-with-icon">
                  <UserIcon size={18} className="input-icon" />
                  <input
                    id="review-name"
                    type="text"
                    className="custom-input"
                    placeholder={lang === 'ID' ? 'Contoh: Ahmad Dani' : 'e.g., Alex Johnson'}
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    maxLength={100}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Star Rating Selector */}
              <div className="form-group">
                <label className="form-label">
                  {lang === 'ID' ? 'Rating Anda' : 'Your Rating'}
                </label>
                <div className="star-selector-row">
                  <div className="stars-interactive">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${
                          (hoverRating || rating) >= star ? 'active' : ''
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        disabled={isSubmitting}
                        aria-label={`Beri bintang ${star}`}
                      >
                        <StarIcon filled={(hoverRating || rating) >= star} size={24} />
                      </button>
                    ))}
                  </div>
                  <span className="rating-text-feedback">
                    {rating} / 5{' '}
                    {rating === 5
                      ? '⭐ Luar biasa!'
                      : rating === 4
                      ? '👍 Sangat bagus'
                      : rating === 3
                      ? '👌 Cukup baik'
                      : '📝 Terima kasih'}
                  </span>
                </div>
              </div>

              {/* Komentar Input */}
              <div className="form-group">
                <label className="form-label" htmlFor="review-comment">
                  {lang === 'ID' ? 'Isi Komentar' : 'Your Comment'}
                </label>
                <textarea
                  id="review-comment"
                  className="custom-textarea"
                  placeholder={
                    lang === 'ID'
                      ? 'Tulis komentar atau pengalaman Anda di sini...'
                      : 'Write your constructive thoughts or experience here...'
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-review-btn"
                className="submit-review-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    <span>{lang === 'ID' ? 'Mengirim Ulasan...' : 'Sending Review...'}</span>
                  </>
                ) : (
                  <>
                    <SendIcon size={18} />
                    <span>{lang === 'ID' ? 'Kirim Komentar' : 'Submit Review'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Daftar Komentar & Rating (Live Data)
              ========================================================= */}
          <div className="reviews-list-card">
            <div className="reviews-list-header">
              <div className="reviews-header-title">
                <span>{lang === 'ID' ? 'Komentar' : 'Reviews'}</span>
                <span className="reviews-count-pill">
                  {pagination.total_data || reviews.length}{' '}
                  {lang === 'ID' ? 'KOMENTAR' : 'REVIEWS'}
                </span>
              </div>

              {averageRating && (
                <div className="rating-avg-badge" title="Rata-rata Rating">
                  <span>★</span>
                  <span>{averageRating} / 5.0</span>
                </div>
              )}
            </div>

            {/* Node Filter Bar */}
            <div className="filter-node-container">
              <span className="filter-node-label">FILTER NODE:</span>
              <div className="filter-node-buttons">
                {NODE_OPTIONS.map((node) => (
                  <button
                    key={node}
                    type="button"
                    className={`filter-node-btn ${filterNode === node ? 'active' : ''}`}
                    onClick={() => setFilterNode(node)}
                  >
                    {node === 'all' ? (lang === 'ID' ? 'SEMUA' : 'ALL') : node}
                  </button>
                ))}
              </div>
            </div>

            {/* Error State Banner */}
            {reviewsError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '0.84rem',
                  color: '#fca5a5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span>{reviewsError}</span>
                <button
                  type="button"
                  onClick={() => fetchReviews(filterNode)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang === 'ID' ? 'Coba Lagi' : 'Retry'}
                </button>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoadingReviews ? (
              <div className="review-empty-state">
                <div className="spinner" style={{ borderColor: 'rgba(204, 255, 0, 0.3)', borderTopColor: '#ccff00' }} />
                <p>{lang === 'ID' ? 'Memuat komentar...' : 'Loading reviews...'}</p>
              </div>
            ) : reviews.length === 0 ? (
              /* Empty State */
              <div className="review-empty-state">
                <div style={{ fontSize: '2.5rem', opacity: 0.5 }}>💬</div>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                  {lang === 'ID' ? 'Belum Ada Ulasan' : 'No Reviews Yet'}
                </h4>
                <p>
                  {lang === 'ID'
                    ? 'Jadilah orang pertama yang memberikan komentar dan rating di website ini!'
                    : 'Be the first person to share a review and rating on this portfolio!'}
                </p>
              </div>
            ) : (
              /* Reviews List */
              <div className="reviews-items-container">
                {reviews.map((rev, index) => {
                  const initial = getInitials(rev.nama);
                  const revRating = Number(rev.rating) || 5;

                  return (
                    <div key={rev.id || `rev-${index}`} className="review-item">
                      {/* Avatar Initial (e.g. Ahmad Dani -> "AD") */}
                      <div className="review-avatar-initials" title={rev.nama}>
                        {initial}
                      </div>

                      <div className="review-body">
                        <div className="review-meta-top">
                          <span className="review-author-name">{rev.nama}</span>
                          <span className="review-date">
                            LOG: {formatDate(rev.created_at)}
                          </span>
                        </div>

                        {/* Star Rating Display */}
                        <div className="review-stars-row">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              filled={star <= revRating}
                              size={15}
                            />
                          ))}
                        </div>

                        {/* Comment Text Escaped as Safe Plain Text */}
                        <p className="review-text-content">{rev.comment}</p>

                        {/* Origin Node Indicator */}
                        <div className="review-node-footer">
                          <span className="node-caption">ORIGIN NODE</span>
                          <span className="node-badge" title={`Server Node: ${rev.route_id || 'm1'}`}>
                            {rev.route_id || 'm1'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
