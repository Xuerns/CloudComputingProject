import React from 'react';
import {
  HtmlIcon,
  CssIcon,
  TailwindIcon,
  JavascriptIcon,
  ReactIcon,
  NextjsIcon,
  NodejsIcon,
  ExpressIcon,
  PythonIcon,
  PhpIcon,
  GolangIcon,
  JavaIcon,
  CplusplusIcon,
  PostgresIcon,
  MongoIcon,
  GithubIconFull,
  VscodeIcon,
} from './TechIcons';

const SKILLS_DATA = [
  { name: 'HTML5', icon: <HtmlIcon size={34} />, color: '#E44D26' },
  { name: 'CSS3', icon: <CssIcon size={34} />, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: <TailwindIcon size={34} />, color: '#38BDF8' },
  { name: 'JavaScript', icon: <JavascriptIcon size={34} />, color: '#F7DF1E' },
  { name: 'React JS', icon: <ReactIcon size={34} />, color: '#61DAFB' },
  { name: 'Next.js', icon: <NextjsIcon size={34} />, color: '#FFFFFF' },
  { name: 'Node JS', icon: <NodejsIcon size={34} />, color: '#339933' },
  { name: 'Express JS', icon: <ExpressIcon size={34} />, color: '#E2E8F0' },
  { name: 'Python', icon: <PythonIcon size={34} />, color: '#3776AB' },
  { name: 'PHP', icon: <PhpIcon size={34} />, color: '#777BB4' },
  { name: 'Golang', icon: <GolangIcon size={34} />, color: '#00ADD8' },
  { name: 'Java', icon: <JavaIcon size={34} />, color: '#E76F00' },
  { name: 'C++', icon: <CplusplusIcon size={34} />, color: '#00599C' },
  { name: 'PostgreSQL', icon: <PostgresIcon size={34} />, color: '#336791' },
  { name: 'MongoDB', icon: <MongoIcon size={34} />, color: '#47A248' },
  { name: 'GitHub', icon: <GithubIconFull size={34} />, color: '#FFFFFF' },
  { name: 'VS Code', icon: <VscodeIcon size={34} />, color: '#007ACC' },
];

export default function Skills({ lang }) {
  return (
    <section id="skills" className="skills-section">
      <div className="container skills-wrapper">
        <div className="skills-cosmic-ring" />

        <div className="section-tag">02 // TECH STACK</div>
        <h2 className="section-title">Skills &amp; Technologies</h2>
        <p className="section-subtitle">
          {lang === 'ID'
            ? 'Teknologi dan perangkat modern yang saya gunakan untuk merancang antarmuka cepat, arsitektur terukur, dan sistem berkinerja tinggi.'
            : 'Technologies and tools I use to build modern web applications and scalable solutions.'}
        </p>

        <div className="skills-grid">
          {SKILLS_DATA.map((skill) => (
            <div key={skill.name} className="skill-pill-card">
              <div className="skill-icon-wrap">
                {skill.icon}
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
