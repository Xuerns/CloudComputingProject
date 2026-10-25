import React from 'react';
import { ExternalLinkIcon, GithubIcon } from './Icons';
import studyFlowImg from '../assets/StudyFlow.png';
import siagaKitaImg from '../assets/SiagaKita.png';
import aqualinkImg from '../assets/Aqualink.png';
import arMarketImg from '../assets/ARMARKET.png';
import arGamingImg from '../assets/ARGAMING.png';
import complexiGreenImg from '../assets/Complexi-green.png';
import arProjectImg from '../assets/ARPROJECT.png';

const PROJECTS_DATA = [
  {
    id: 'study-flow',
    title: 'StudyFlow',
    category: 'Productivity App',
    desc: 'An intuitive study management and productivity application designed to organize tasks, track study habits, and streamline daily workflow.',
    descId: 'Aplikasi manajemen belajar dan produktivitas yang intuitif untuk mengorganisasi tugas, memantau kebiasaan belajar, dan mengoptimalkan alur kerja harian.',
    tags: ['React', 'JavaScript', 'CSS3', 'Workflow'],
    demoUrl: 'https://studyflow-focus-zeta.vercel.app/',
    codeUrl: 'https://github.com/Adam-Nugraha225/studyflow-focus',
    image: studyFlowImg,
  },
  {
    id: 'siaga-kita',
    title: 'SiagaKita',
    category: 'Disaster Mitigation',
    desc: 'Real-time disaster preparedness and weather monitoring platform integrated with BMKG seismic data, emergency evacuation maps, and citizen reporting.',
    descId: 'Platform mitigasi bencana dan pemantauan cuaca terintegrasi dengan data seismik BMKG, peta evakuasi darurat, dan pelaporan situasi warga secara real-time.',
    tags: ['React', 'BMKG API', 'Emergency Maps', 'UI/UX'],
    demoUrl: 'https://siaga-kita.vercel.app/',
    codeUrl: 'https://github.com/Xuerns/SiagaKita',
    image: siagaKitaImg,
  },
  {
    id: 'aqualink',
    title: 'Aqualink (Vendor-Hub)',
    category: 'B2B Logistics',
    desc: 'B2B clean water distribution platform connecting buyers with verified water tanker logistics, regional vendor discovery, and transparent ordering.',
    descId: 'Platform logistik B2B distribusi air bersih terverifikasi yang menghubungkan pembeli dengan vendor tangki air, pencarian vendor terdekat, dan pemesanan transparan.',
    tags: ['React', 'Logistics', 'Vendor Portal', 'REST API'],
    demoUrl: 'https://depot-air-softdev.vercel.app/',
    codeUrl: 'https://github.com/Adam-Nugraha225/depot-air-softdev',
    image: aqualinkImg,
  },
  {
    id: 'ar-market',
    title: 'AR.Market',
    category: 'Digital Marketplace',
    desc: 'Curated digital directory and marketplace highlighting leading AI tools, developer software, productivity suites, and creative utilities.',
    descId: 'Direktori dan marketplace digital terkurasi yang menyajikan rekomendasi tools AI terdepan, software pemrograman, dan utilitas produktivitas modern.',
    tags: ['React', 'Directory', 'AI Tools', 'Modern UI'],
    demoUrl: 'https://adam-nugraha225.github.io/AR.MARKETT/',
    codeUrl: 'https://github.com/Adam-Nugraha225/AR.MARKETT',
    image: arMarketImg,
  },
  {
    id: 'ar-gaming',
    title: 'AR Gaming',
    category: 'Web Gaming Portal',
    desc: 'Interactive gaming entertainment platform featuring instant browser games, community hub, vibrant gaming visuals, and social integrations.',
    descId: 'Portal hiburan game interaktif yang menyediakan berbagai permainan web instan, pusat komunitas gamer, serta integrasi media sosial.',
    tags: ['JavaScript', 'HTML5 Games', 'CSS3', 'Web Design'],
    demoUrl: 'https://adam-nugraha225.github.io/AR.GAMING/',
    codeUrl: 'https://github.com/Adam-Nugraha225/AR.GAMING',
    image: arGamingImg,
  },
  {
    id: 'complexigreen',
    title: 'ComplexiGreen (Square Analysis)',
    category: 'Algorithm Analysis',
    desc: 'Algorithmic complexity visualizer comparing recursive vs. iterative mathematical computations with interactive charts and execution metrics.',
    descId: 'Visualisasi dan analisis komputasi kompleksitas algoritma perbandingan efisiensi fungsi rekursif vs iteratif pada deret kuadrat (Tugas Besar AKA Tel-U).',
    tags: ['Algorithms', 'AKA Tel-U', 'Data Visualization', 'Complexity'],
    demoUrl: 'https://complexi-green.lovable.app/',
    codeUrl: 'https://github.com/Adam-Nugraha225/complexi-green',
    image: complexiGreenImg,
  },
  {
    id: 'ar-project',
    title: 'AR Project',
    category: 'Personal Portfolio',
    desc: 'Creative developer portfolio and personal branding website showcasing web development projects, creative interfaces, and interactive features.',
    descId: 'Website portofolio pribadi dan personal branding interaktif untuk menampilkan karya pengembangan web, skill teknis, serta pengalaman proyek.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    demoUrl: 'https://adam-nugraha225.github.io/AR.PROJECT/',
    codeUrl: 'https://github.com/Adam-Nugraha225/AR.PROJECT',
    image: arProjectImg,
  },
  {
    id: 'review-service',
    title: 'Testimoni & Rating Microservice',
    category: 'Full Stack API',
    desc: 'Native 3-tier architecture with Python BaseHTTPRequestHandler and PostgreSQL database. Powers the live rating and testimonial system featured in this portfolio.',
    descId: 'Arsitektur native 3-tier dengan Python BaseHTTPRequestHandler dan database PostgreSQL. Menyediakan endpoint pengiriman rating aman dan paginasi ulasan di web ini.',
    tags: ['Python', 'PostgreSQL', 'BaseHTTPRequestHandler', 'REST API'],
    demoUrl: '#reviews',
    codeUrl: 'https://github.com/Xuerns/Aplikasi-Testimoni-Rating',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #0f172a 100%)',
    mockupAccent: '#ccff00',
  },
];

export default function Projects({ lang }) {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-tag">03 // PORTFOLIO</div>
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          {lang === 'ID'
            ? 'Koleksi proyek terpilih yang mencakup aplikasi web modern, frontend interaktif, hingga arsitektur backend berkinerja tinggi.'
            : 'Some of my best works encompassing modern web applications, interactive interfaces, and scalable backend services.'}
        </p>

        <div className="projects-grid">
          {PROJECTS_DATA.map((proj) => (
            <article key={proj.id} className="project-card">
              <div className="project-thumb-frame">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="project-thumb-bg project-thumb-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                    }}
                  />
                ) : (
                  <div
                    className="project-thumb-bg"
                    style={{
                      background: proj.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: proj.mockupAccent,
                        textShadow: `0 0 20px ${proj.mockupAccent}66`,
                      }}
                    >
                      &lt;{proj.title.split(' ')[0]} /&gt;
                    </div>
                  </div>
                )}
                <span className="project-overlay-badge">{proj.category}</span>
              </div>

              <div className="project-info">
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">
                  {lang === 'ID' ? proj.descId : proj.desc}
                </p>

                <div className="project-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={proj.demoUrl}
                    className="project-btn-demo"
                    target={proj.demoUrl.startsWith('#') ? '_self' : '_blank'}
                    rel="noreferrer"
                  >
                    <span>{lang === 'ID' ? 'Lihat Preview' : 'Live Preview'}</span>
                    <ExternalLinkIcon size={14} />
                  </a>

                  <a
                    href={proj.codeUrl}
                    className="project-btn-code"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon size={16} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
