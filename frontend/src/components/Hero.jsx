import React from 'react';
import { ArrowRightIcon, ExternalLinkIcon } from './Icons';

export default function Hero({ lang }) {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-available">
              <span className="dot-pulse" />
              <span>{lang === 'ID' ? 'TERSEDIA UNTUK PEKERJAAN' : 'AVAILABLE FOR WORK'}</span>
            </div>

            <h1 className="hero-headline">
              I craft digital <br />
              <span className="gradient-text">architecture</span> &amp; code
            </h1>

            <p className="hero-bio">
              {lang === 'ID' ? (
                <>
                  Halo, saya <strong>Adam Nugraha</strong>. Saya membangun aplikasi web modern,
                  sistem machine learning, dan solusi IoT untuk kebutuhan dunia nyata yang scalable dan reliabel.
                </>
              ) : (
                <>
                  Hi, I'm <strong>Adam Nugraha</strong>. I build web applications, machine learning
                  systems, and IoT solutions for real-world needs.
                </>
              )}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>{lang === 'ID' ? 'Lihat Proyek' : 'View Projects'}</span>
                <ArrowRightIcon size={16} />
              </a>

              <a
                href="https://linkedin.com/in/adamnugraha-404s"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                <span>LinkedIn Profile</span>
                <ExternalLinkIcon size={15} />
              </a>
            </div>
          </div>

          <div className="hero-visual-wrapper">
            <div className="avatar-orbit-container">
              <div className="avatar-ambient-glow" />

              {/* Floating Tech Chips */}
              <div className="floating-chip chip-react">
                <span className="chip-dot" style={{ background: '#61dafb' }} />
                <span>React</span>
              </div>
              <div className="floating-chip chip-next">
                <span className="chip-dot" style={{ background: '#ffffff' }} />
                <span>Next.js</span>
              </div>
              <div className="floating-chip chip-python">
                <span className="chip-dot" style={{ background: '#3b82f6' }} />
                <span>Python</span>
              </div>
              <div className="floating-chip chip-ts">
                <span className="chip-dot" style={{ background: '#3178c6' }} />
                <span>TypeScript</span>
              </div>
              <div className="floating-chip chip-node">
                <span className="chip-dot" style={{ background: '#22c55e' }} />
                <span>Node.js</span>
              </div>
              <div className="floating-chip chip-tailwind">
                <span className="chip-dot" style={{ background: '#38bdf8' }} />
                <span>Tailwind</span>
              </div>

              {/* Avatar Frame - user's photo */}
              <div className="avatar-neon-frame">
                <img
                  src="/adam-nugraha.jpg"
                  alt="Adam Nugraha - Full Stack Developer"
                  className="avatar-img"
                  onError={(e) => {
                    // Fallback to high tech avatar illustration if local image fails
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' fill='%230f141e'><rect width='400' height='400'/><circle cx='200' cy='150' r='70' fill='%231f2937'/><circle cx='200' cy='360' r='140' fill='%231f2937'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='64' fill='%23ccff00'>AN</text></svg>";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
