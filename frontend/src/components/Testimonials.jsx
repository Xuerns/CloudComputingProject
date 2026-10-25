import React from 'react';
import { QuoteIcon } from './Icons';

const TESTIMONIALS_DATA = [
  {
    quote:
      "Clean code, thoughtful architecture, and great taste. The handoff was smoother than any contractor we've hired.",
    quoteId:
      "Kode bersih, arsitektur terpikirkan matang, dan selera visual luar biasa. Proses serah terima berjalan sangat mulus melebihi ekspektasi.",
    name: 'Bilal Ahmed',
    role: 'Engineering Lead, FinTech',
    avatar: 'BA',
  },
  {
    quote:
      'Seamless collaboration with our design team. Translated every Figma detail perfectly into production-ready code.',
    quoteId:
      'Kolaborasi sangat nyaman dengan tim desain. Setiap detail di Figma diubah secara presisi menjadi kode siap produksi.',
    name: 'Omar Raza',
    role: 'CEO, StartupCo',
    avatar: 'OR',
  },
  {
    quote:
      'The attention to micro-interactions elevated the entire product. Users noticed the difference right after deployment.',
    quoteId:
      'Perhatian terhadap mikro-interaksi mengangkat kualitas produk secara keseluruhan. Pengguna langsung merasakan responsivitasnya.',
    name: 'Farhan Siddiqui',
    role: 'Founder, CloudFlow',
    avatar: 'FS',
  },
  {
    quote:
      'Exceptionally reliable. Delivered our full-stack review portal ahead of schedule with zero database hiccups.',
    quoteId:
      'Sangat dapat diandalkan. Menyelesaikan modul backend dan integrasi rating tepat waktu tanpa kendala database.',
    name: 'Nadia Pratama',
    role: 'Product Manager',
    avatar: 'NP',
  },
  {
    quote:
      'Understands both systems architecture and user experience. Adam is a true high-calibre developer.',
    quoteId:
      'Memahami arsitektur sistem sekaligus pengalaman pengguna. Adam adalah developer berkaliber tinggi.',
    name: 'Marcus Chen',
    role: 'Senior Tech Architect',
    avatar: 'MC',
  },
  {
    quote:
      'Quick response time, proactive problem solving, and extremely polite communication throughout the sprint.',
    quoteId:
      'Respon cepat, proaktif memecahkan masalah, dan komunikasi yang sangat santun di sepanjang sprint.',
    name: 'Sarah Wijaya',
    role: 'Lead UI/UX Designer',
    avatar: 'SW',
  },
];

export default function Testimonials({ lang }) {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-tag">04 // TESTIMONIALS</div>
        <h2 className="section-title">Kind words from people I've worked with</h2>
        <p className="section-subtitle">
          {lang === 'ID'
            ? 'Kesan dan pengalaman nyata dari rekan satu tim, klien, dan kolaborator selama proses pengembangan proyek bersama.'
            : 'A few words from clients, teammates, and collaborators on projects we delivered together.'}
        </p>

        {/* Vertical Scrolling Container */}
        <div className="testimonials-scroll-container">
          <div className="testimonials-vertical-track">
            {/* Set 1 */}
            <div className="testimonial-card-row">
              {TESTIMONIALS_DATA.slice(0, 3).map((item, idx) => (
                <div key={`t1-${idx}`} className="testimonial-bubble">
                  <QuoteIcon size={26} />
                  <p className="testimonial-quote">
                    "{lang === 'ID' ? item.quoteId : item.quote}"
                  </p>
                  <div className="testimonial-author-row">
                    <div className="author-avatar-img">{item.avatar}</div>
                    <div className="author-meta">
                      <span className="author-name">{item.name}</span>
                      <span className="author-role">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-card-row">
              {TESTIMONIALS_DATA.slice(3, 6).map((item, idx) => (
                <div key={`t2-${idx}`} className="testimonial-bubble">
                  <QuoteIcon size={26} />
                  <p className="testimonial-quote">
                    "{lang === 'ID' ? item.quoteId : item.quote}"
                  </p>
                  <div className="testimonial-author-row">
                    <div className="author-avatar-img">{item.avatar}</div>
                    <div className="author-meta">
                      <span className="author-name">{item.name}</span>
                      <span className="author-role">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (for seamless loop) */}
            <div className="testimonial-card-row">
              {TESTIMONIALS_DATA.slice(0, 3).map((item, idx) => (
                <div key={`t3-${idx}`} className="testimonial-bubble">
                  <QuoteIcon size={26} />
                  <p className="testimonial-quote">
                    "{lang === 'ID' ? item.quoteId : item.quote}"
                  </p>
                  <div className="testimonial-author-row">
                    <div className="author-avatar-img">{item.avatar}</div>
                    <div className="author-meta">
                      <span className="author-name">{item.name}</span>
                      <span className="author-role">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-card-row">
              {TESTIMONIALS_DATA.slice(3, 6).map((item, idx) => (
                <div key={`t4-${idx}`} className="testimonial-bubble">
                  <QuoteIcon size={26} />
                  <p className="testimonial-quote">
                    "{lang === 'ID' ? item.quoteId : item.quote}"
                  </p>
                  <div className="testimonial-author-row">
                    <div className="author-avatar-img">{item.avatar}</div>
                    <div className="author-meta">
                      <span className="author-name">{item.name}</span>
                      <span className="author-role">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
