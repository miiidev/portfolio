import { useState, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';
import MobileCardStack from './MobileCardStack';
import { projects } from '../data';
import { fadeRightConfig } from '../utils/animations';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (idx >= 0 && idx < projects.length) {
        setCurrentIndex(idx);
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('portfolio:project', handler);
    return () => window.removeEventListener('portfolio:project', handler);
  }, []);

  const offset = isMobile ? 60 : 260;
  const farOffset = isMobile ? 100 : 420;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getPosition = (index: number) => {
    const diff = index - currentIndex;
    const length = projects.length;

    let normalizedDiff = diff;
    if (diff < -Math.floor(length / 2)) normalizedDiff += length;
    if (diff > Math.floor(length / 2)) normalizedDiff -= length;

    return normalizedDiff;
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      nextProject();
    } else if (offset > threshold || velocity > 500) {
      prevProject();
    }
  };

  return (
    <motion.section id="work" {...fadeRightConfig} className="min-h-screen flex flex-col justify-center py-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-copy">My Projects</h2>

        <div className="hidden sm:flex gap-3 relative z-10">
          <button
            onClick={prevProject}
            className="p-3 bg-surface border border-edge rounded-full text-muted hover:text-copy hover:border-edge-hover hover:shadow-glow-sm transition-all hover:scale-105"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={nextProject}
            className="p-3 bg-surface border border-edge rounded-full text-muted hover:text-copy hover:border-edge-hover hover:shadow-glow-sm transition-all hover:scale-105"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {isMobile ? (
        <div className="relative w-full h-[450px] mt-8">
          <MobileCardStack
            projects={projects}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            sensitivity={100}
          />
        </div>
      ) : (
        <motion.div
          className="relative w-full min-h-[550px] mt-8 overflow-clip"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragDirectionLock
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {projects.map((project, index) => {
            const pos = getPosition(index);
            const abs = Math.abs(pos);

            return (
              <motion.div
                key={project.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: 'min(100%, 420px)',
                  zIndex: pos === 0 ? 3 : abs === 1 ? 2 : 1,
                  pointerEvents: abs <= 1 ? 'auto' : 'none',
                }}
                animate={{
                  x: pos === 0 ? 0 : pos === -1 ? -offset : pos === 1 ? offset : pos < 0 ? -farOffset : farOffset,
                  scale: pos === 0 ? 1 : abs === 1 ? 0.9 : 0.78,
                  opacity: abs <= 1 ? (pos === 0 ? 1 : 0.7) : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 28,
                  mass: 0.8,
                }}
                onClick={() => { if (pos !== 0) setCurrentIndex(index); }}
              >
                <div style={{ transform: 'translate(-50%, -50%)' }}>
                  <ProjectCard project={project} isCenter={pos === 0} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-2 mt-8">
        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => setCurrentIndex(i)}
            className="w-11 h-11 flex items-center justify-center"
            aria-label={`Go to ${project.title}`}
            aria-current={i === currentIndex ? 'true' : undefined}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i === currentIndex ? 'bg-inverse shadow-glow-dot' : 'bg-dim hover:bg-muted'
              }`}
            />
          </button>
        ))}
      </div>
    </motion.section>
  );
}
