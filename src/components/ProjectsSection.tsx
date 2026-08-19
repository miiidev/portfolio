import { useState, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';
import MobileCardStack from './MobileCardStack';
import { projects, personalInfo } from '../data';
import { fadeRightConfig } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const offset = isMobile ? 60 : 100;
  const farOffset = isMobile ? 100 : 300;

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
    const offsetDrag = info.offset.x;

    if (offsetDrag < -threshold || velocity < -500) {
      nextProject();
    } else if (offsetDrag > threshold || velocity > 500) {
      prevProject();
    }
  };

  const dots = projects.map((project, index) => (
    <button
      key={project.id}
      onClick={() => setCurrentIndex(index)}
      aria-label={`Show project ${index + 1} of ${projects.length}`}
      aria-current={index === currentIndex ? 'true' : undefined}
      className="min-h-11 min-w-11 flex items-center justify-center font-mono text-sm font-bold transition-colors"
    >
      <span className={index === currentIndex ? 'text-accent' : 'text-dim hover:text-copy'}>
        [{index === currentIndex ? '_' : ' '}]
      </span>
    </button>
  ));

  return (
    <motion.section id="work" {...fadeRightConfig} className="flex flex-col justify-center py-12">
      <div className="flex items-center justify-between mb-6">
        <SectionHeading>Work</SectionHeading>
      </div>

      {isMobile ? (
        <div className="relative w-full h-[450px] mt-6">
          <MobileCardStack
            projects={projects}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            sensitivity={100}
          />
        </div>
      ) : (
        <div className="relative mt-6">
          <motion.div
            className="relative w-full min-h-[560px] overflow-clip"
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
                    width: 'min(100%, 680px)',
                    zIndex: pos === 0 ? 3 : abs === 1 ? 2 : 1,
                    pointerEvents: pos === 0 ? 'auto' : 'none',
                  }}
                  animate={{
                    x: pos === 0 ? 0 : pos === -1 ? -offset : pos === 1 ? offset : pos < 0 ? -farOffset : farOffset,
                    scale: pos === 0 ? 1 : abs === 1 ? 0.9 : 0.78,
                    opacity: abs <= 1 ? (pos === 0 ? 1 : 0.4) : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 28,
                    mass: 0.8,
                  }}
                >
                  <div style={{ transform: 'translate(-50%, -50%)' }}>
                    <ProjectCard project={project} isCenter={pos === 0} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <button
            onClick={prevProject}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={nextProject}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}

      <div className="mt-2 flex justify-center gap-1">
        {dots}
      </div>
      <div className="mt-2 flex justify-center">
        <a
          href={personalInfo.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 min-h-11 px-4 text-sm font-bold text-dim hover:text-accent transition-colors"
        >
          More on GitHub
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      </div>
    </motion.section>
  );
}