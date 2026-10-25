import React from 'react';

export default function About({ lang }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-tag">01 // ABOUT</div>
        <h2 className="section-title">
          I build digital systems <br />
          that connect software, design &amp; technology
        </h2>

        <div className="about-grid">
          {/* Left: Interactive Code Card */}
          <div className="code-card">
            <div className="code-card-header">
              <div className="window-dots">
                <span className="window-dot dot-red" />
                <span className="window-dot dot-yellow" />
                <span className="window-dot dot-green" />
              </div>
              <span className="window-title">developer_profile.json</span>
            </div>

            <pre className="code-body">
              <code>
                <span className="c-punct">&#123;</span>{'\n'}
                {'  '}<span className="c-key">"developer"</span><span className="c-punct">:</span> <span className="c-string">"Adam Nugraha"</span><span className="c-punct">,</span>{'\n'}
                {'  '}<span className="c-key">"nim"</span><span className="c-punct">:</span> <span className="c-string">"103012400280"</span><span className="c-punct">,</span>{'\n'}
                {'  '}<span className="c-key">"role"</span><span className="c-punct">:</span> <span className="c-string">"Full Stack Engineer"</span><span className="c-punct">,</span>{'\n'}
                {'  '}<span className="c-key">"focus"</span><span className="c-punct">: [</span>{'\n'}
                {'    '}<span className="c-string">"Full Stack Web"</span><span className="c-punct">,</span>{'\n'}
                {'    '}<span className="c-string">"Web Design"</span><span className="c-punct">,</span>{'\n'}
                {'    '}<span className="c-string">"Mobile Developer"</span>{'\n'}
                {'  '}<span className="c-punct">],</span>{'\n'}
                {'  '}<span className="c-key">"architecture"</span><span className="c-punct">:</span> <span className="c-string">"3-Tier &amp; Microservices"</span><span className="c-punct">,</span>{'\n'}
                {'  '}<span className="c-key">"passionate"</span><span className="c-punct">:</span> <span className="c-string">"High Performance &amp; Clean UI"</span>{'\n'}
                <span className="c-punct">&#125;</span>
              </code>
            </pre>
          </div>

          {/* Right: Description & Metrics */}
          <div className="about-details">
            <p className="about-text">
              {lang === 'ID' ? (
                <>
                  Saya membangun aplikasi web dan mobile dengan fokus pada pengembangan
                  full-stack dan desain antarmuka. Saya menggabungkan kemampuan teknis dengan perhatian pada detail visual,
                  menciptakan pengalaman digital yang fungsional, modern, elegan, dan mudah digunakan.
                </>
              ) : (
                <>
                  I build web and mobile applications with a focus on full-stack development and interface design.
                  I combine technical expertise with an eye for visual detail to create digital experiences that are functional,
                  modern, elegant, and easy to use.
                </>
              )}
            </p>

            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-num">
                  21<span className="accent">+</span>
                </div>
                <div className="stat-label">
                  {lang === 'ID' ? 'Proyek Selesai' : 'Completed Projects'}
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-num">
                  <span className="accent">Full</span>
                </div>
                <div className="stat-label">
                  {lang === 'ID' ? 'Stack Berkelanjutan' : 'End-to-End Stack'}
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-num">
                  99<span className="accent">%</span>
                </div>
                <div className="stat-label">
                  {lang === 'ID' ? 'Kualitas & Presisi' : 'Code Precision'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
