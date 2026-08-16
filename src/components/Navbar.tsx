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
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-0"
    >
      <nav className="w-full max-w-6xl bg-surface border border-edge/50 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center transition-all duration-300">
        
        <a href="#" className="text-lg font-bold text-copy tracking-tighter hover:opacity-90 transition-opacity">
          miii.
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { href: '#about', label: 'About' },
            { href: '#experience', label: 'Experience' },
            { href: '#education', label: 'Education' },
            { href: '#skills', label: 'Skills' },
            { href: '#work', label: 'Work' },
            { href: '#contact', label: 'Contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center px-3 py-3 text-xs sm:text-sm font-medium text-muted hover:text-copy transition-colors duration-200 min-h-11"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
        
      </nav>
    </motion.div>
  );
}