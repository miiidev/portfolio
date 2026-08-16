### Task 3: useActiveSection hook + StatusBar, remove SideStepper

**Files:**
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/components/StatusBar.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/SideStepper.tsx`

**Interfaces:**
- Produces: `sectionFiles` (array of `{ id, file }`) and `useActiveSection()` returning the active section id â€” used by Tasks 5 and 6. `StatusBar` component (fixed bottom bar). `App.tsx` now wraps content in `<main className="lg:pl-48 pb-6">` and renders `<StatusBar />`; SideStepper is gone.

- [ ] **Step 1: Create the hook**

```tsx
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
    const pos = window.scrollY + 200;
    let current = sectionFiles[0].id;
    for (const section of sectionFiles) {
      const el = document.getElementById(section.id);
      if (el && el.offsetTop <= pos) current = section.id;
    }
    setActive(current);
  });

  return active;
}
```

- [ ] **Step 2: Create StatusBar**

```tsx
export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:flex h-6 items-center justify-between bg-surface border-t border-edge px-3 font-mono text-[11px] text-muted">
      <div className="flex items-center gap-4">
        <span className="text-code-function">main*</span>
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
      <div>Ln 42, Col 7 &middot; {new Date().getFullYear()} miii.dev</div>
    </div>
  );
}
```

- [ ] **Step 3: Update App.tsx**

Replace the file's content with:

```tsx
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactFooter from './components/ContactFooter';
import StatusBar from './components/StatusBar';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main className="lg:pl-48 pb-6">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <AchievementsSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactFooter />
        </main>
        <StatusBar />
        <BackToTop />
      </MotionConfig>
    </ThemeProvider>
  );
}
```

- [ ] **Step 4: Delete SideStepper and its references**

Run: `Remove-Item src/components/SideStepper.tsx`
Run: `rg -n "SideStepper" src` â€” expected: no matches.

- [ ] **Step 5: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0 (Navbar is not yet restyled; it still compiles as-is).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add status bar and active-section hook, remove side stepper"
```

---


