import { useState, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';
import MobileCardStack from './MobileCardStack';
import { projects } from '../data';
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
        <SectionHeading>Work</SectionHeading>
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
        <div className="hidden md:block border border-edge rounded-md overflow-hidden relative mt-2 bg-canvas/40">
          {/* Breadcrumb bar */}
          <div className="flex items-center justify-between px-3 py-1 font-mono text-[10px] border-b border-edge bg-elevated/40" aria-hidden="true">
            <span>
              <span className="text-dim">work</span>
              <span className="text-muted"> / projects.tsx</span>
            </span>
            <span className="text-dim"> main</span>
          </div>
          {/* Carousel with gutter */}
          <div className="relative">
            {/* Gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-7 border-r border-edge bg-canvas flex flex-col items-center py-[3px] text-edge font-mono text-[10px] leading-5" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <motion.div
              className="relative w-full min-h-[560px] overflow-clip pl-7"
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
            {/* Arrows repositioned inside frame */}
            <button
              onClick={prevProject}
              className="absolute left-11 top-1/2 -translate-y-1/2 z-10 p-3 bg-surface border border-edge rounded-md text-muted hover:text-copy hover:border-accent transition-all"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextProject}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 bg-surface border border-edge rounded-md text-muted hover:text-copy hover:border-accent transition-all"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          {/* Status line */}
          <div className="flex items-center justify-between px-3 py-1 font-mono text-[10px] border-t border-edge bg-elevated/40" aria-hidden="true">
            <span className="text-dim">Ln 1, Col 7</span>
            <span className="text-dim">3 projects</span>
            <span className="text-dim">utf-8</span>
          </div>
        </div>
      )}
    </motion.section>
  );
}
