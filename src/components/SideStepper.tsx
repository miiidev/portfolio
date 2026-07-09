import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function SideStepper() {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    const scrollPos = window.scrollY + 200;
    let active = 0;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollPos) {
        active = i;
        break;
      }
    }
    setActiveSection(active);
  });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <div className="flex flex-col items-center">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative group/step">
              <button
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0 ${
                  activeSection === i
                    ? 'bg-inverse shadow-glow-dot'
                    : 'bg-dim hover:bg-muted'
                }`}
                aria-label={section.label}
              />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs font-medium font-mono text-muted whitespace-nowrap opacity-0 group-hover/step:opacity-100 transition-opacity duration-200 pointer-events-none">
                {section.label}
              </span>
            </div>
            {i < sections.length - 1 && <div className="w-px h-6 bg-edge" />}
          </div>
        ))}
      </div>
    </div>
  );
}
