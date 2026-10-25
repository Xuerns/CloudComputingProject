import React, { useState } from 'react';
import { MailIcon, GithubIcon, LinkedinIcon, InstagramIcon, CheckIcon, ExternalLinkIcon } from './Icons';

export default function Footer({ lang }) {
  const [copied, setCopied] = useState(false);
  const email = 'zynphronix404@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <div className="section-tag">06 // GET IN TOUCH</div>
            <h2 className="footer-headline">
              Let's build <br />
              <span>something</span> <br />
              worth remembering
            </h2>
          </div>

          <div className="footer-contact-box">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
              {lang === 'ID'
                ? 'Tertarik berkolaborasi untuk proyek baru, pengembangan sistem, atau sekadar berdiskusi mengenai teknologi? Hubungi saya kapan saja.'
                : 'Interested in collaborating on a new project, software architecture, or tech discussion? Feel free to reach out anytime.'}
            </p>

            <div className="email-copy-wrapper">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MailIcon size={18} />
                <span>{email}</span>
              </div>
              <button type="button" className="copy-btn" onClick={copyEmail}>
                {copied ? (
                  <>
                    <CheckIcon size={14} />
                    <span>{lang === 'ID' ? 'Tersalin!' : 'Copied!'}</span>
                  </>
                ) : (
                  <span>{lang === 'ID' ? 'Salin Email' : 'Copy'}</span>
                )}
              </button>
            </div>

            <div className="footer-social-links">
              <a
                href="https://github.com/Adam-Nugraha225"
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ExternalLinkIcon size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/adamnugraha-404s/"
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ExternalLinkIcon size={12} />
              </a>

              <a
                href="https://www.instagram.com/zynphronix/"
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
                <ExternalLinkIcon size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-brand">
            <div className="brand-badge" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
              AN
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Adam Nugraha</strong> — Full Stack Engineer
            </div>
          </div>

          <p>
            Building secure, functional, and user-centric web applications. &copy; 2026 Adam Nugraha.
          </p>
        </div>
      </div>
    </footer>
  );
}
