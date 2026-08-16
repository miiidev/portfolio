import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { heroContainerVariants, heroItemVariants } from '../utils/animations';
import LazyImage from './LazyImage';
import ContactModal from './ContactModal';
import MiniTerminal from './MiniTerminal';

export default function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const openContact = () => setContactOpen(true);
    window.addEventListener('portfolio:contact', openContact);
    return () => window.removeEventListener('portfolio:contact', openContact);
  }, []);

  return (
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex relative overflow-hidden"
    >
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="relative lg:w-1/2 w-full lg:h-screen flex flex-col items-center justify-center gap-6 py-10 shrink-0">
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-edge">
            <LazyImage
              src="/portfolio/assets/profile-image.jpeg"
              alt={personalInfo.name}
              className="w-full h-full"
              imgClassName="object-cover w-full h-full"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
          <motion.div variants={heroItemVariants} className="w-full max-w-md px-6 lg:px-0">
            <MiniTerminal />
          </motion.div>
        </div>

        <div className="lg:w-1/2 w-full flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
          <motion.h1 variants={heroItemVariants} className="text-4xl md:text-7xl font-extrabold text-copy mb-4 tracking-tight">
            {personalInfo.name}.
          </motion.h1>
          <motion.h2 variants={heroItemVariants} className="text-2xl md:text-5xl font-bold text-muted mb-6">
            {personalInfo.role}
          </motion.h2>
          <motion.p variants={heroItemVariants} className="text-lg text-muted max-w-xl leading-relaxed mb-8">
            {personalInfo.bio} Based in <span className="text-copy/80 font-medium">{personalInfo.location}</span>.
          </motion.p>
          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:border-edge-hover rounded-lg text-sm font-medium transition-all border border-edge min-h-11"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              View All Projects
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-3 bg-inverse text-inverse-copy font-semibold rounded-lg text-sm transition-all border border-edge min-h-11"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.header>
  );
}
