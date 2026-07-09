import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data';
import { heroContainerVariants, heroItemVariants } from '../utils/animations';
import LazyImage from './LazyImage';
import ContactModal from './ContactModal';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const imagePanelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imagePanelRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const [displayedRole, setDisplayedRole] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const roleText = personalInfo.role;

  useEffect(() => {
    setDisplayedRole('');
    setTypingDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < roleText.length) {
        setDisplayedRole(roleText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTypingDone(true);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      id="hero"
      ref={heroRef}
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "-100px" }}
      className="min-h-screen flex relative"
    >
      <div
        onMouseMove={handleMouseMove}
        className="flex flex-1 flex-col lg:flex-row"
      >
        <div
          ref={imagePanelRef}
          className="relative lg:w-1/2 w-full lg:h-screen h-[50vh] overflow-hidden shrink-0"
        >
          <motion.div style={{ y: imageY }} className="w-full h-full">
            <LazyImage
              src="/portfolio/assets/profile-image.jpeg"
              alt={personalInfo.name}
              className="w-full h-full"
              imgClassName="object-cover object-center lg:object-[center_30%]"
            />
          </motion.div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--glow-rgb), ${Math.max(0, 0.15 * (1 - Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y) / 600))}) 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-canvas to-transparent hidden lg:block" />
        </div>

        <div className="lg:w-1/2 w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
          <motion.p variants={heroItemVariants} className="text-muted font-mono text-sm mb-3 font-semibold tracking-wider uppercase">
            Hi, my name is
          </motion.p>
          <motion.h1 variants={heroItemVariants} className="text-5xl md:text-7xl font-extrabold text-copy mb-4 tracking-tight">
            {personalInfo.name}.
          </motion.h1>
          <motion.h2 variants={heroItemVariants} className="text-3xl md:text-5xl font-bold text-muted mb-6 min-h-[1.2em]">
              {displayedRole}
              {!typingDone && <span className="text-copy animate-pulse">|</span>}
            </motion.h2>
          <motion.p variants={heroItemVariants} className="text-lg text-muted max-w-xl leading-relaxed mb-8">
            {personalInfo.bio} Based in <span className="text-copy/80 font-medium">{personalInfo.location}</span>.
          </motion.p>
          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface hover:border-edge-hover hover:shadow-glow-btn rounded-lg text-sm font-medium transition-all border border-edge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              View All Projects
            </button>
            <button onClick={() => setContactOpen(true)} className="px-5 py-2.5 bg-inverse text-inverse-copy hover:border-edge-hover hover:shadow-glow-btn font-semibold rounded-lg text-sm transition-all border border-edge shadow-lg">
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.header>
  );
}
