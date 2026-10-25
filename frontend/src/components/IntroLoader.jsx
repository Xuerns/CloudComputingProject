import React, { useState, useEffect } from 'react';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Realistic variable progress increments
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + increment, 100);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className={`intro-loader-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="loader-mesh-bg" />
      <div className="loader-content">
        <h1 className="loader-brand-name">Adam</h1>
        <p className="loader-tagline">PORTFOLIO LOADING</p>

        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-stats">
          <span>INITIALIZING DIGITAL ARCHITECTURE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
