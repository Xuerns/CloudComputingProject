import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, MenuIcon, CloseIcon } from './Icons';

const NAV_ITEMS = [
  { id: 'about', labelID: 'Tentang', labelEN: 'About', num: '01' },
  { id: 'skills', labelID: 'Stack', labelEN: 'Stack', num: '02' },
  { id: 'projects', labelID: 'Proyek', labelEN: 'Projects', num: '03' },
  { id: 'credentials', labelID: 'Sertifikat', labelEN: 'Credentials', num: '04' },
  { id: 'testimonials', labelID: 'Testimoni', labelEN: 'Testimonials', num: '05' },
  { id: 'reviews', labelID: 'Ulasan', labelEN: 'Reviews', num: '06' },
];

export default function Navbar({ lang, setLang }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'credentials', 'testimonials', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ID' ? 'EN' : 'ID'));
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-wrapper">
        <nav className="navbar-pill">
          {/* Brand */}
          <a href="#home" onClick={closeMenu} className="navbar-brand">
            <div className="brand-badge">AN</div>
            <div className="brand-info">
              <span className="brand-name">Adam Nugraha</span>
              <span className="brand-role">Full Stack Developer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {lang === 'ID' ? item.labelID : item.labelEN}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Nav Actions */}
          <div className="nav-actions">
            <button
              type="button"
              className="lang-switch"
              onClick={toggleLang}
              title="Ganti Bahasa / Switch Language"
            >
              {lang === 'ID' ? '🌐 ID' : '🌐 EN'}
            </button>

            <a href="#contact" className="nav-cta-btn">
              <span>{lang === 'ID' ? 'Kontak' : 'Contact'}</span>
              <ArrowRightIcon size={14} />
            </a>
          </div>

          {/* Mobile & Tablet Toggle Controls */}
          <div className="mobile-nav-controls">
            <button
              type="button"
              className="lang-switch mobile-compact-lang"
              onClick={toggleLang}
              title="Ganti Bahasa / Switch Language"
            >
              {lang === 'ID' ? '🌐 ID' : '🌐 EN'}
            </button>

            <button
              type="button"
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile & Tablet Navigation Modal Drawer */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="mobile-nav-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="mobile-nav-header">
            <div className="mobile-nav-brand">
              <div className="brand-badge">AN</div>
              <div>
                <span className="mobile-brand-name">Adam Nugraha</span>
                <div className="mobile-status-row">
                  <span className="dot-pulse" style={{ width: 6, height: 6 }} />
                  <span className="mobile-status-text">Available for Projects</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={closeMenu}
              aria-label="Tutup Menu"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="mobile-nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="mobile-item-index">{item.num} //</span>
                  <span className="mobile-item-label">
                    {lang === 'ID' ? item.labelID : item.labelEN}
                  </span>
                  {isActive ? (
                    <span className="mobile-item-active-dot" />
                  ) : (
                    <ArrowRightIcon size={14} className="mobile-item-arrow" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="mobile-nav-footer">
            <div className="mobile-footer-meta">
              <button
                type="button"
                className="mobile-footer-lang-btn"
                onClick={toggleLang}
              >
                <span>🌐 {lang === 'ID' ? 'Bahasa: Indonesia (ID)' : 'Language: English (EN)'}</span>
                <span className="mobile-lang-pill-badge">{lang === 'ID' ? 'Ubah ke EN' : 'Switch to ID'}</span>
              </button>
            </div>

            <a
              href="#contact"
              className="mobile-cta-btn"
              onClick={closeMenu}
            >
              <span>{lang === 'ID' ? 'Mulai Proyek / Hubungi' : "Let's Connect / Contact"}</span>
              <ArrowRightIcon size={16} />
            </a>

            <div className="mobile-email-hint">
              <span>zynphronix404@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
