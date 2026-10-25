import React from 'react';

export default function MarqueeTicker() {
  const phrase1 = (
    <>
      <span>Hello I'm <span className="highlight">Adam</span></span>
      <span className="marquee-separator">—</span>
    </>
  );

  const phrase2 = (
    <>
      <span>Fullstack Web Developer</span>
      <span className="marquee-separator">—</span>
    </>
  );

  return (
    <div className="marquee-section" aria-hidden="true">
      {/* Row 1: Leftward Infinite Marquee */}
      <div className="marquee-row">
        <div className="marquee-track track-left">
          {[...Array(6)].map((_, i) => (
            <div key={`left-a-${i}`} className="marquee-item solid">
              {phrase1}
            </div>
          ))}
        </div>
        <div className="marquee-track track-left">
          {[...Array(6)].map((_, i) => (
            <div key={`left-b-${i}`} className="marquee-item solid">
              {phrase1}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward Infinite Marquee */}
      <div className="marquee-row">
        <div className="marquee-track track-right">
          {[...Array(6)].map((_, i) => (
            <div key={`right-a-${i}`} className="marquee-item muted">
              {phrase2}
            </div>
          ))}
        </div>
        <div className="marquee-track track-right">
          {[...Array(6)].map((_, i) => (
            <div key={`right-b-${i}`} className="marquee-item muted">
              {phrase2}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
