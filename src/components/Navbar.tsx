import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollRef.current;
    if (diff > 0 && latest > 200) {
      setHidden(true);
    } else if (diff < 0) {
      setHidden(false);
    }
    lastScrollRef.current = latest;
  });

  return (
    <motion.div
      variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="w-full max-w-6xl backdrop-blur-md bg-surface/70 border border-edge/50 rounded-full px-6 py-3 flex justify-between items-center shadow-glow-nav transition-all duration-300">
        
        <a href="#" className="text-lg font-bold text-copy tracking-tighter hover:opacity-90 transition-opacity">
          miii.
        </a>
        
        <div className="flex items-center gap-5 sm:gap-6">
          <a href="#about" className="text-xs sm:text-sm font-medium text-muted hover:text-copy hover:drop-shadow-glow transition-all duration-200">About</a>
          <a href="#work" className="text-xs sm:text-sm font-medium text-muted hover:text-copy hover:drop-shadow-glow transition-all duration-200">Work</a>
          <a href="#contact" className="text-xs sm:text-sm font-medium text-muted hover:text-copy hover:drop-shadow-glow transition-all duration-200">Contact</a>
          <ThemeToggle />
        </div>
        
      </nav>
    </motion.div>
  );
}