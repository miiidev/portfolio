import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import { projects, personalInfo } from './data';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Helper function to determine the 3D position classes
  const getCarouselClass = (index: number) => {
    const diff = index - currentIndex;
    const length = projects.length;

    // Normalize to handle circular wrapping
    let normalizedDiff = diff;
    if (diff < -Math.floor(length / 2)) normalizedDiff += length;
    if (diff > Math.floor(length / 2)) normalizedDiff -= length;

    if (normalizedDiff === 0) return 'is-center';
    if (normalizedDiff === -1) return 'is-left';
    if (normalizedDiff === 1) return 'is-right';
    if (normalizedDiff < -1) return 'is-far-left';
    if (normalizedDiff > 1) return 'is-far-right';
    return 'is-hidden';
  };

  const fadeUpConfig = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
      <Navbar />

      <main className="px-6 md:px-12 max-w-6xl mx-auto">

        {/* HERO SECTION */}
        <motion.header {...fadeUpConfig} className="min-h-screen flex flex-col justify-center py-12">
          <p className="text-zinc-400 font-mono text-sm mb-3 font-semibold tracking-wider uppercase">
            Hi, my name is
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            {personalInfo.name}.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-400 mb-6">
            {personalInfo.role}.
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-8">
            {personalInfo.bio} Based in <span className="text-zinc-300 font-medium">{personalInfo.location}</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors border border-zinc-800">
              GitHub
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors border border-zinc-800">
              LinkedIn
            </a>
            <a href={personalInfo.socials.email} className="px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-white/5">
              Get In Touch
            </a>
          </div>
        </motion.header>

        {/* SKILLS SECTION */}
        <motion.section id="about" {...fadeUpConfig} className="min-h-screen flex flex-col justify-center py-12 scroll-mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-zinc-500 font-mono text-sm">01.</span> Core Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {personalInfo.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-center text-sm font-medium font-mono text-zinc-400 transition-all duration-200 hover:border-zinc-600 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:-translate-y-1 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section id="work" {...fadeUpConfig} className="min-h-screen flex flex-col justify-center py-12 scroll-mt-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-zinc-500 font-mono text-sm">02.</span> Selected Work
            </h2>

            {/* Controls */}
            <div className="flex gap-3 relative z-10">
              <button
                onClick={prevProject}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-500 transition-all hover:scale-105"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                onClick={nextProject}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-500 transition-all hover:scale-105"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          {/* 3D CAROUSEL VIEW */}
          <div className="carousel-3d-wrapper">
            <div className="carousel-3d-list">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`carousel-3d-item ${getCarouselClass(index)}`}
                  // Allow clicking side cards to jump to them
                  onClick={() => {
                    if (getCarouselClass(index) !== 'is-center') setCurrentIndex(index);
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FOOTER / CONTACT */}
        <motion.footer id="contact" {...fadeUpConfig} className="min-h-screen flex flex-col justify-center py-12 border-t border-zinc-900 text-center space-y-4 scroll-mt-16">
          <div className="w-full py-6">
            <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-8">
              Whether you want to collaborate on a project or just want to say hi, my inbox is always open.
            </p>
            <p className="text-xs text-zinc-600 pt-8 font-mono border-t border-zinc-900/50">
              &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React, TS, and Tailwind.
            </p>
          </div>
        </motion.footer>

      </main>
    </div>
  );
}