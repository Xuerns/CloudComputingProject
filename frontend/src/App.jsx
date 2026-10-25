import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import ServedByBanner from './components/ServedByBanner';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [lang, setLang] = useState('ID'); // 'ID' or 'EN'

  return (
    <div className="app-root">
      {/* 0. Intro Loader */}
      {!loadingDone && <IntroLoader onComplete={() => setLoadingDone(true)} />}

      {/* Floating Header Navigation */}
      <Navbar lang={lang} setLang={setLang} />

      <main>
        {/* Banner Identitas Server: Anda dilayani oleh laman <nama> (<NIM>) */}
        <ServedByBanner lang={lang} />

        {/* 1. Hero Section */}
        <Hero lang={lang} />

        {/* 2. Marquee Infinite Running Text */}
        <MarqueeTicker />

        {/* 3. About Section */}
        <About lang={lang} />

        {/* 4. Skills & Tech Stack Section */}
        <Skills lang={lang} />

        {/* 5. Projects Showcase */}
        <Projects lang={lang} />

        {/* 6. Credentials & Achievements (Carousel) */}
        <Credentials lang={lang} />

        {/* 7. Testimonials (Vertical Marquee) */}
        <Testimonials lang={lang} />

        {/* 8. Komentar & Rating (2-column layout + REST API) */}
        <ReviewsSection lang={lang} />
      </main>

      {/* 9. Footer Section */}
      <Footer lang={lang} />
    </div>
  );
}
