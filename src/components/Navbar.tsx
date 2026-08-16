import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'pt-3' : 'pt-0'
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? 'h-12 max-w-5xl rounded-full bg-surface border border-nav-edge px-4 sm:px-6'
            : 'h-16 max-w-6xl rounded-none bg-transparent border border-transparent px-4 sm:px-6'
        }`}
      >
        <a href="#" className="text-lg font-bold text-copy tracking-tighter hover:opacity-90 transition-opacity shrink-0">
          miii.
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-muted hover:text-copy transition-colors duration-200 min-h-11"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}