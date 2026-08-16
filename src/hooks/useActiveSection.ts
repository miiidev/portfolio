import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export const sectionFiles = [
  { id: 'hero', file: 'README.md' },
  { id: 'about', file: 'about.ts' },
  { id: 'experience', file: 'experience.ts' },
  { id: 'education', file: 'education.ts' },
  { id: 'achievements', file: 'achievements.ts' },
  { id: 'skills', file: 'skills.ts' },
  { id: 'work', file: 'projects.tsx' },
  { id: 'contact', file: 'contact.ts' },
];

export function useActiveSection() {
  const [active, setActive] = useState(sectionFiles[0].id);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    let current = sectionFiles[0].id;
    for (const section of sectionFiles) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= 200) current = section.id;
    }
    setActive(current);
  });

  return active;
}
