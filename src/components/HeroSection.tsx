import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { heroContainerVariants, heroItemVariants } from '../utils/animations';
import LazyImage from './LazyImage';

export default function HeroSection() {
  return (
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
        <motion.div variants={heroItemVariants}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-copy">
            Hey, I&apos;m miii<span className="text-accent">dev</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
            {personalInfo.role} based in {personalInfo.location}. I build AI, computer vision, and real-time apps.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-accent text-canvas font-bold text-sm transition-opacity hover:opacity-90"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-surface border border-edge text-copy font-bold text-sm transition-colors hover:border-accent"
            >
              Say hello
            </a>
          </div>
        </motion.div>

        <motion.div variants={heroItemVariants} className="w-full max-w-sm mx-auto">
          <div className="rounded-2xl overflow-hidden card-shadow">
            <LazyImage
              src="/portfolio/assets/profile-image.jpeg"
              alt={personalInfo.name}
              className="w-full aspect-square"
              imgClassName="object-cover w-full h-full"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
