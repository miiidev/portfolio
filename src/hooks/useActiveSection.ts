import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const sectionIds = ['hero', 'about', 'experience', 'education', 'achievements', 'skills', 'work', 'contact'];

export function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0]);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 200) current = id;
    }
    setActive(current);
  });

  return active;
}