import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, AwardIcon } from './Icons';

const CERTIFICATES_DATA = [
  {
    id: 'ai-fundamentals',
    issuer: 'DICODING INDONESIA',
    badge: 'VERIFIED CREDENTIAL',
    title: 'Learn AI Fundamentals',
    recipient: 'ADAM NUGRAHA',
    certId: 'CERT-AI-2026-98124',
    date: 'JAN 2026',
    desc: 'Covered AI fundamentals, machine learning workflows, deep learning basics, practical AI applications in web services, and prompt engineering.',
    descId: 'Mempelajari dasar-dasar kecerdasan buatan, alur kerja machine learning, penerapan AI praktis pada aplikasi modern, serta teknik prompt engineering.',
    credentialUrl: 'https://www.dicoding.com',
  },
  {
    id: 'web-dev-basics',
    issuer: 'DICODING INDONESIA',
    badge: 'ACCREDITED COURSE',
    title: 'Belajar Dasar Pemrograman Web',
    recipient: 'ADAM NUGRAHA',
    certId: 'CERT-WEB-2025-44219',
    date: 'NOV 2025',
    desc: 'Mastered semantic HTML5 markup, advanced CSS styling, Flexbox, CSS Grid layouts, and responsive design systems across multiple viewports.',
    descId: 'Menguasai markup HTML5 semantik, teknik styling CSS modern, layout Flexbox & CSS Grid, serta perancangan website yang sepenuhnya responsif.',
    credentialUrl: 'https://www.dicoding.com',
  },
  {
    id: 'fcc-js-algorithms',
    issuer: 'FREECODECAMP',
    badge: 'CERTIFIED DEVELOPER',
    title: 'JavaScript Algorithms & Data Structures',
    recipient: 'ADAM NUGRAHA',
    certId: 'FCC-JS-90312-AUTH',
    date: 'AUG 2025',
    desc: 'Comprehensive mastery of ECMAScript 6+, Object-Oriented Programming, functional programming, data structures, and algorithmic complexity.',
    descId: 'Pemahaman mendalam mengenai JavaScript modern (ES6+), pemrograman berorientasi objek, functional programming, dan struktur data algoritma.',
    credentialUrl: 'https://freecodecamp.org',
  },
  {
    id: 'aws-cloud-foundations',
    issuer: 'AWS ACADEMY',
    badge: 'CLOUD ACCREDITED',
    title: 'Cloud Foundations & Infrastructure',
    recipient: 'ADAM NUGRAHA',
    certId: 'AWS-ACAD-77182-GL',
    date: 'JUN 2025',
    desc: 'Cloud architectural principles, core AWS compute, networking, scalable storage services, IAM security policies, and cost management.',
    descId: 'Prinsip arsitektur komputasi awan, layanan komputasi inti, jaringan virtual, penyimpanan terukur, serta tata kelola keamanan IAM.',
    credentialUrl: 'https://aws.amazon.com',
  },
];

export default function Credentials({ lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CERTIFICATES_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CERTIFICATES_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="credentials" className="credentials-section">
      <div className="container">
        <div className="section-tag">[ 05 ] // CREDENTIALS</div>
        <h2 className="section-title">Certificates and achievements</h2>
        <p className="section-subtitle">
          {lang === 'ID'
            ? 'Kumpulan sertifikasi kompetensi resmi, program pelatihan intensif, dan pencapaian profesional yang telah saya raih.'
            : "A collection of verified certificates, intensive training programs, and professional credentials I've received."}
        </p>

        <div className="credentials-carousel-container">
          <div className="credentials-viewport">
            <div
              className="credentials-slider"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {CERTIFICATES_DATA.map((cert) => (
                <div key={cert.id} className="credential-slide">
                  <div className="cert-card">
                    {/* Simulated High-Fi Certificate Mockup */}
                    <div className="cert-preview-frame">
                      <div className="cert-badge-row">
                        <span className="cert-issuer-logo">{cert.issuer}</span>
                        <span className="cert-verified-stamp">✓ {cert.badge}</span>
                      </div>

                      <h3 className="cert-certificate-title">{cert.title}</h3>
                      <p className="cert-recipient-name">Diberikan kepada: {cert.recipient}</p>
                      <div className="cert-id-tag">ID: {cert.certId}</div>
                    </div>

                    {/* Certificate Details */}
                    <div className="cert-details-column">
                      <div className="cert-date-badge"> {cert.date}</div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                        {cert.title}
                      </h4>
                      <p className="cert-desc-text">
                        {lang === 'ID' ? cert.descId : cert.desc}
                      </p>

                      <div style={{ marginTop: '10px' }}>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline"
                          style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                        >
                          <AwardIcon size={16} />
                          <span>{lang === 'ID' ? 'Lihat Kredensial Resmi' : 'Verify Credential'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Bar */}
          <div className="carousel-controls">
            <div className="carousel-dots">
              {CERTIFICATES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to certificate slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="carousel-arrows">
              <button
                type="button"
                className="arrow-btn"
                onClick={prevSlide}
                aria-label="Previous certificate"
              >
                <ChevronLeftIcon size={18} />
              </button>
              <button
                type="button"
                className="arrow-btn"
                onClick={nextSlide}
                aria-label="Next certificate"
              >
                <ChevronRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
