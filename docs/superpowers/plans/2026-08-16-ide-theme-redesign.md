# IDE Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's terminal/macOS visual language with a VSCode-like IDE theme (menu bar, file explorer, status bar, editor windows, syntax colors) so it is visually distinct from hytechster.com while keeping all existing behavior.

**Architecture:** Pure frontend restyle. Global tokens move to GitHub dark/light palettes in `index.css` `@theme` + `.light`. New chrome components (`StatusBar`, `FileExplorer`, `SectionHeading`, `useActiveSection` hook) are shared by all sections. Each section component is restyled in place; no data or logic changes.

**Tech Stack:** React 19, Vite, Tailwind CSS v4 (CSS-first `@theme` tokens), framer-motion, TypeScript. No test framework — verification is `npm run build` (tsc -b && vite build) and `npm run lint` (eslint), both must exit 0.

## Global Constraints

- Copy rules: no em dashes, no emojis, no lorem ipsum; all existing copy stays except where the spec changes it.
- Touch targets: minimum 44px height (`min-h-11`) on interactive elements.
- No backdrop-blur anywhere. Rounded corners max `rounded-md` (no pills, no `rounded-full` cards, no traffic lights).
- Accessibility: `aria-expanded`, `aria-label`, `aria-current` on interactive chrome; motion respects `prefers-reduced-motion` (already global in CSS).
- Tailwind v4 class names derive from `@theme` tokens: `--color-accent` → `text-accent`, `border-accent`, `bg-accent`; `--color-code-keyword` → `text-code-keyword`, etc.
- Every task ends with `npm run build` + `npm run lint` passing and a commit.
- Section ids (anchors, unchanged): `hero`, `about`, `experience`, `education`, `achievements`, `skills`, `work`, `contact`.

---

### Task 1: IDE color tokens in index.css

**Files:**
- Modify: `src/index.css` (whole file)

**Interfaces:**
- Produces: theme tokens used by every later task — `canvas/surface/elevated/copy/muted/dim/edge/edge-hover/nav-edge/inverse/inverse-copy/danger/accent` + syntax tokens `code-keyword/code-string/code-function/code-type/code-comment/code-const` (dark + `.light` variants), `shadow-glow-dot` removed, `.cursor-block` blink utility added.

- [ ] **Step 1: Replace index.css**

```css
@import "tailwindcss";

@theme {
  --breakpoint-xs: 25rem;
  --color-canvas: #0d1117;
  --color-surface: #161b22;
  --color-elevated: #21262d;
  --color-copy: #e6edf3;
  --color-muted: #8b949e;
  --color-dim: #6e7781;
  --color-edge: #30363d;
  --color-edge-hover: #e6edf3;
  --color-nav-edge: rgba(240, 246, 252, 0.1);
  --color-inverse: #e6edf3;
  --color-inverse-copy: #0d1117;
  --color-danger: #ff7b72;
  --color-accent: #58a6ff;
  --color-code-keyword: #ff7b72;
  --color-code-string: #a5d6ff;
  --color-code-function: #d2a8ff;
  --color-code-type: #ffa657;
  --color-code-comment: #8b949e;
  --color-code-const: #79c0ff;
}

.light {
  --color-canvas: #ffffff;
  --color-surface: #f6f8fa;
  --color-elevated: #eaeef2;
  --color-copy: #1f2328;
  --color-muted: #59636e;
  --color-dim: #6e7781;
  --color-edge: #d0d7de;
  --color-edge-hover: #1f2328;
  --color-nav-edge: rgba(31, 35, 40, 0.12);
  --color-inverse: #1f2328;
  --color-inverse-copy: #ffffff;
  --color-danger: #cf222e;
  --color-accent: #0969da;
  --color-code-keyword: #cf222e;
  --color-code-string: #0a3069;
  --color-code-function: #8250df;
  --color-code-type: #953800;
  --color-code-comment: #6e7781;
  --color-code-const: #0550ae;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}

@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor-block {
  animation: cursor-blink 1.1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Remove glow-dot usages elsewhere**

Run: `rg -n "shadow-glow-dot" src` — expected: no matches (SideStepper is deleted in Task 3; ProjectsSection dots already removed). If any match remains, remove it before continuing.

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0, no errors or warnings.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: IDE theme color tokens (GitHub dark/light palettes)"
```

---

### Task 2: SectionHeading component

**Files:**
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<SectionHeading file="experience.ts">Experience</SectionHeading>` — renders a mono `// Name` code-comment heading with an optional dim file chip to its right.

- [ ] **Step 1: Create the component**

```tsx
interface SectionHeadingProps {
  file: string;
  children: string;
}

export default function SectionHeading({ file, children }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <h2 className="font-mono text-2xl font-semibold tracking-tight">
        <span className="text-code-comment">// </span>
        <span className="text-code-keyword">{children}</span>
      </h2>
      <span className="font-mono text-xs text-dim">{file}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeading.tsx
git commit -m "feat: add code-comment section heading component"
```

---

### Task 3: useActiveSection hook + StatusBar, remove SideStepper

**Files:**
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/components/StatusBar.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/SideStepper.tsx`

**Interfaces:**
- Produces: `sectionFiles` (array of `{ id, file }`) and `useActiveSection()` returning the active section id — used by Tasks 5 and 6. `StatusBar` component (fixed bottom bar). `App.tsx` now wraps content in `<main className="lg:pl-48 pb-6">` and renders `<StatusBar />`; SideStepper is gone.

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
Run: `rg -n "SideStepper" src` — expected: no matches.

- [ ] **Step 5: Verify**

Run: `npm run build; npm run lint` — expected: exit 0 (Navbar is not yet restyled; it still compiles as-is).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add status bar and active-section hook, remove side stepper"
```

---

### Task 4: Navbar restyle — menu bar with tabs and mobile file list

**Files:**
- Modify: `src/components/Navbar.tsx` (full replace)

**Interfaces:**
- Consumes: `sectionFiles` + `useActiveSection` (Task 3), `ThemeToggle`.
- Produces: fixed menu bar (h-14, border-b, no island behavior), left = logo + active file name, desktop tabs for About/Experience/Education/Skills/Work/Contact with accent underline on active, right = ThemeToggle + mobile hamburger; mobile dropdown lists all `sectionFiles`.

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { sectionFiles, useActiveSection } from '../hooks/useActiveSection';

const tabs = sectionFiles.slice(1);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const activeFile = sectionFiles.find((s) => s.id === active)?.file ?? sectionFiles[0].file;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 border-b border-nav-edge">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-3 sm:px-6">
        <a href="#" className="flex items-baseline gap-2 shrink-0 text-copy hover:opacity-90 transition-opacity">
          <span className="font-bold tracking-tighter text-lg">miii.</span>
          <span className="hidden sm:inline font-mono text-xs text-dim">{activeFile}</span>
        </a>

        <nav className="hidden lg:flex items-center h-14 ml-6">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={active === tab.id ? 'page' : undefined}
              className={`inline-flex items-center h-14 px-3 font-mono text-sm border-b-2 transition-colors duration-200 ${
                active === tab.id
                  ? 'border-accent text-copy bg-elevated/50'
                  : 'border-transparent text-muted hover:text-copy hover:bg-elevated/30'
              }`}
            >
              {tab.file}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close file list' : 'Open file list'}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-copy hover:opacity-80 transition-opacity"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-b border-nav-edge bg-canvas"
          >
            <nav className="mx-auto max-w-6xl px-3 sm:px-6 py-2">
              {sectionFiles.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === section.id ? 'page' : undefined}
                  className={`flex items-center min-h-11 px-3 font-mono text-sm rounded-md transition-colors duration-200 ${
                    active === section.id
                      ? 'text-copy bg-elevated/50 border-l-2 border-accent'
                      : 'text-muted hover:text-copy'
                  }`}
                >
                  {section.file}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: restyle navbar as IDE menu bar with file tabs"
```

---

### Task 5: FileExplorer sidebar (desktop)

**Files:**
- Create: `src/components/FileExplorer.tsx`
- Modify: `src/App.tsx` (render it)

**Interfaces:**
- Consumes: `sectionFiles` + `useActiveSection` (Task 3).
- Produces: `<FileExplorer />` — fixed left rail below the menu bar, above the status bar, `hidden lg:flex`, clickable file rows with accent active state.

- [ ] **Step 1: Create the component**

```tsx
import { sectionFiles, useActiveSection } from '../hooks/useActiveSection';

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default function FileExplorer() {
  const active = useActiveSection();

  return (
    <aside className="fixed left-0 top-14 bottom-6 z-30 hidden lg:flex w-48 flex-col border-r border-edge bg-canvas/60">
      <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-dim">Explorer</p>
      <nav className="flex-1 overflow-y-auto py-1">
        {sectionFiles.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'page' : undefined}
            className={`flex items-center gap-2 min-h-9 px-3 font-mono text-xs border-l-2 transition-colors duration-200 ${
              active === section.id
                ? 'text-copy bg-elevated/60 border-accent'
                : 'text-muted hover:text-copy border-transparent hover:bg-elevated/30'
            }`}
          >
            <FileIcon />
            {section.file}
          </a>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Render it in App.tsx**

Add `import FileExplorer from './components/FileExplorer';` and `<FileExplorer />` directly after `<Navbar />` inside the `MotionConfig` block.

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/FileExplorer.tsx src/App.tsx
git commit -m "feat: add file explorer sidebar"
```

---

### Task 6: MiniTerminal restyle — integrated terminal panel

**Files:**
- Modify: `src/components/MiniTerminal.tsx` (lines 79-90, the chrome block)

**Interfaces:**
- Consumes: existing behavior (lines, help, jump commands) — untouched.
- Produces: terminal window with tab bar `TERMINAL` (no traffic lights), prompt `miii@portfolio:~$` on the input row. Used by Task 7.

- [ ] **Step 1: Replace the chrome block**

Replace the current `<div className="w-full max-w-md rounded-xl border ...">` opening and the title bar (the block containing the three `<span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ... }} />` dots) with:

```tsx
  return (
    <div
      className="w-full max-w-md rounded-md border border-edge bg-surface text-sm font-mono overflow-hidden"
      role="region"
      aria-label="Terminal"
    >
      <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
        <span className="text-xs text-muted">TERMINAL</span>
        <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
      </div>
```

- [ ] **Step 2: Update the input prompt**

Replace the input row's prompt span `<span className="text-copy font-semibold">&gt;</span>` with:

```tsx
          <span className="text-code-keyword font-semibold shrink-0">miii@portfolio:~$</span>
```

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/MiniTerminal.tsx
git commit -m "feat: restyle terminal as IDE integrated terminal panel"
```

---

### Task 7: Hero restyle — code intro window, profile preview, terminal panel

**Files:**
- Modify: `src/components/HeroSection.tsx` (full replace)

**Interfaces:**
- Consumes: `LazyImage`, `MiniTerminal` (Task 6), `ContactModal`, `heroContainerVariants`/`heroItemVariants` from `src/utils/animations`, `personalInfo`.
- Produces: hero with left editor window (`miii.ts` tab, line-numbered code intro with syntax colors, blinking cursor, CTA buttons) and right column (profile image in `profile.png` preview card + terminal panel).

- [ ] **Step 1: Replace HeroSection.tsx**

```tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { heroContainerVariants, heroItemVariants } from '../utils/animations';
import LazyImage from './LazyImage';
import ContactModal from './ContactModal';
import MiniTerminal from './MiniTerminal';

const codeLines = [
  { key: 'const', text: 'const developer = {', color: 'text-code-keyword' },
  { key: 'name', text: "  name: 'Ahmad Syahmi',", color: 'text-code-string' },
  { key: 'role', text: "  role: 'Software & AI Developer',", color: 'text-code-string' },
  { key: 'location', text: "  location: 'Malaysia',", color: 'text-code-string' },
  { key: 'open', text: '  openToWork: true,', color: 'text-code-const' },
  { key: 'close', text: '};', color: '' },
];

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
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div variants={heroItemVariants} className="w-full">
          <div className="rounded-md border border-edge bg-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2 group">
              <span className="text-xs text-muted">miii.ts</span>
              <span className="text-xs text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&#10005;</span>
            </div>
            <div className="p-5 sm:p-7 font-mono text-sm leading-7 overflow-x-auto">
              <div className="flex">
                <div className="pr-4 text-right text-dim select-none shrink-0">
                  {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                  <div className="cursor-block text-copy">&#9632;</div>
                </div>
                <div>
                  {codeLines.map((line) => (
                    <div key={line.key} className={line.color || 'text-copy'}>
                      {line.text}
                    </div>
                  ))}
                  <div className="cursor-block text-copy">&#9632;</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:border-accent rounded-md text-sm font-medium transition-all border border-edge text-copy min-h-11"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              View All Projects
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-3 bg-inverse text-inverse-copy font-semibold rounded-md text-sm transition-all border border-edge hover:opacity-90 min-h-11"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        <motion.div variants={heroItemVariants} className="w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="rounded-md border border-edge bg-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
              <span className="text-xs text-muted">profile.png</span>
              <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
            </div>
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
          <MiniTerminal />
        </motion.div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0. (TS may flag `color: ''` in the `codeLines` array literal; if so, type the array: `const codeLines: { key: string; text: string; color: string }[] = [...]`.)

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: restyle hero as editor window with code intro"
```

---

### Task 8: AboutSection restyle — editor code card

**Files:**
- Modify: `src/components/AboutSection.tsx` (full replace)

**Interfaces:**
- Consumes: `SectionHeading` (Task 2), `LazyImage`-free (no image here), `GitHubStats`, `personalInfo`.
- Produces: About section with `// About` heading + `about.ts` chip; left editor card (`about.ts` tab) with bio as comment lines and location/status as code; right GitHub stats in editor frame.

- [ ] **Step 1: Replace AboutSection.tsx**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';
import GitHubStats from './GitHubStats';

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="about.ts">About</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={itemVariants} className="rounded-md border border-edge bg-surface overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
            <span className="text-xs text-muted">about.ts</span>
            <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <p className="text-code-comment">// I&apos;m a {personalInfo.role} based in {personalInfo.location}, building AI-powered and security-focused applications with machine learning, computer vision, and real-time systems.</p>
            <p className="text-code-comment">// I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.</p>
            <div className="pt-3 space-y-1.5">
              <p className="text-copy">
                <span className="text-code-keyword">const</span> <span className="text-code-function">location</span> = <span className="text-code-string">&apos;{personalInfo.location}&apos;</span>;
              </p>
              <p className="text-copy">
                <span className="text-code-keyword">const</span> <span className="text-code-function">status</span> = <span className="text-code-string">&apos;Open to opportunities&apos;</span>;
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <GitHubStats />
        </motion.div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Frame GitHubStats with an editor tab**

In `src/components/GitHubStats.tsx`, wrap the root `<div className="bg-surface/50 border border-edge rounded-xl p-6">` (line 78) — replace `rounded-xl` with `rounded-md`, and prepend the tab bar inside the card, directly above the `p-6` content:

```tsx
<div className="bg-surface/50 border border-edge rounded-md overflow-hidden">
  <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
    <span className="text-xs text-muted">github-stats.ts</span>
    <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
  </div>
  <div className="p-6">
```

(The rest of the component's JSX moves one level deeper; re-indent the existing `p-6` children accordingly and close the extra `</div>` before the component's closing tag.)

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutSection.tsx src/components/GitHubStats.tsx
git commit -m "feat: restyle about section as editor code card"
```

---

### Task 9: ExperienceSection restyle

**Files:**
- Modify: `src/components/ExperienceSection.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2).
- Produces: `// Experience` heading; cards `rounded-md` with a file-chip header row (period as `// {period}` comment + `experience.ts` chip), mono tag chips.

- [ ] **Step 1: Replace ExperienceSection.tsx**

```tsx
import { motion } from 'framer-motion';
import { experience } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="experience.ts">Experience</SectionHeading>
      </motion.div>
      <div className="space-y-3">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-surface border border-edge rounded-md p-6"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="font-mono text-xs text-code-comment">// {item.period}</p>
              <span className="font-mono text-xs text-dim border border-edge rounded px-2 py-0.5">experience.ts</span>
            </div>
            <h3 className="text-lg font-bold text-copy mb-1">{item.title}</h3>
            {item.org && <p className="text-sm text-muted mb-2">{item.org}</p>}
            <p className="text-sm text-muted leading-relaxed mb-4">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs bg-canvas text-muted px-3 py-1.5 rounded-full border border-edge"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ExperienceSection.tsx
git commit -m "feat: restyle experience section with code-comment metadata"
```

---

### Task 10: EducationSection restyle — tree accordion

**Files:**
- Modify: `src/components/EducationSection.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2).
- Produces: accordion rows styled as editor tree entries: chevron + period comment + title; expanded body is an indented comment line; `rounded-md`.

- [ ] **Step 1: Replace EducationSection.tsx**

```tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { education } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function EducationSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="education"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="education.ts">Education</SectionHeading>
      </motion.div>
      <div className="space-y-2">
        {education.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-surface border border-edge rounded-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 py-4 min-h-11 text-left font-mono"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-code-comment mb-0.5">// {item.period}</p>
                  <h3 className="text-base font-bold text-copy">{item.title}</h3>
                  <p className="text-sm text-muted">{item.org}</p>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-5 pb-4 font-mono text-sm text-code-comment leading-relaxed">
                      // {item.description || 'More details coming soon.'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/EducationSection.tsx
git commit -m "feat: restyle education as editor tree accordion"
```

---

### Task 11: AchievementsSection restyle — tree accordion

**Files:**
- Modify: `src/components/AchievementsSection.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2).
- Produces: same tree-accordion pattern as Task 10 with `achievements.ts` chip.

- [ ] **Step 1: Replace AchievementsSection.tsx**

```tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { achievements } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function AchievementsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="achievements"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="achievements.ts">Achievements</SectionHeading>
      </motion.div>
      <div className="space-y-2">
        {achievements.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-surface border border-edge rounded-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 py-4 min-h-11 text-left font-mono"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-code-comment mb-0.5">// {item.year}</p>
                  <h3 className="text-base font-bold text-copy">{item.title}</h3>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-5 pb-4 font-mono text-sm text-muted leading-relaxed">
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/AchievementsSection.tsx
git commit -m "feat: restyle achievements as editor tree accordion"
```

---

### Task 12: SkillsSection restyle — domain-colored chips

**Files:**
- Modify: `src/components/SkillsSection.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2), `personalInfo.skills`.
- Produces: `// Skills` heading; domain cards `rounded-md` with mono comment domain labels colored per index (`code-function`, `code-string`, `code-type`); chips inherit the domain color.

- [ ] **Step 1: Replace SkillsSection.tsx**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

const domainColors = ['text-code-function', 'text-code-string', 'text-code-type'];

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="skills.ts">Skills</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personalInfo.skills.map((group, gi) => {
          const color = domainColors[gi % domainColors.length];
          return (
            <motion.div
              key={group.domain}
              variants={itemVariants}
              className="bg-surface/50 border border-edge rounded-md p-6"
            >
              <h3 className={`font-mono text-sm mb-4 ${color}`}>
                <span className="text-code-comment">// </span>
                {group.domain}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-edge bg-canvas text-xs font-mono ${color}`}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt=""
                      className="w-4 h-4 skill-icon-base"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
```

(Note: skill icons are kept — render `<img src={`https://cdn.simpleicons.org/${skill.icon}/white`} alt="" className="w-4 h-4 skill-icon-base" />` inside each chip before the name, exactly as the current SkillsSection does.)

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat: restyle skills with domain-colored syntax chips"
```

---

### Task 13: Projects restyle — tab headers on cards

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectsSection.tsx` (arrows restyle only)

**Interfaces:**
- Consumes: existing `projects` data, carousel logic (untouched).
- Produces: cards with editor tab bar (`projects/{title}.tsx`), `rounded-md`, mono tag chips; prev/next arrows `rounded-md` and accent hover.

- [ ] **Step 1: Replace ProjectCard.tsx**

```tsx
import type { Project } from '../data';
import LazyImage from './LazyImage';

export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div
      className={`bg-surface border border-edge rounded-md overflow-hidden group h-full w-full flex flex-col ${isCenter ? 'hover:border-accent/60' : ''}`}
    >
      <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2 shrink-0">
        <span className="font-mono text-xs text-muted">projects/{project.title}.tsx</span>
        <span className="font-mono text-xs text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&#10005;</span>
      </div>
      {project.image ? (
        <div className="shrink-0">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full aspect-video"
          />
        </div>
      ) : (
        <div className="shrink-0 w-full aspect-video bg-gradient-to-br from-surface via-elevated to-surface flex items-center justify-center border-b border-edge">
          <div className="flex flex-col items-center gap-2 text-muted">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span className="text-xs font-mono opacity-30">Screenshot</span>
          </div>
        </div>
      )}
      <div className="p-5 sm:p-8 flex flex-col flex-1">
        <p className="font-mono text-xs text-code-comment mb-2">// {project.title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-copy mb-3">{project.title}</h3>
        <p className="text-muted text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span key={index} className="font-mono text-xs bg-canvas text-muted px-3 py-1.5 rounded-full border border-edge">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update ProjectsSection arrows**

In `src/components/ProjectsSection.tsx`, change the two arrow buttons' classes `p-3 bg-surface border border-edge rounded-full ... hover:border-edge-hover ... hover:scale-105` to `p-3 bg-surface border border-edge rounded-md text-muted hover:text-copy hover:border-accent transition-all` (keep the `aria-label`s). Also change the section's heading `<h2 className="text-2xl font-bold text-copy">My Projects</h2>` to use `SectionHeading`:

```tsx
import SectionHeading from './SectionHeading';
...
<motion.div variants={itemVariants} className="flex items-center justify-between mb-2">
  <SectionHeading file="projects.tsx">Work</SectionHeading>
  <div className="hidden sm:flex gap-3 relative z-10"> ... arrows unchanged except classes above ... </div>
</motion.div>
```

The `ProjectsSection` section wrapper keeps `{...fadeRightConfig}`; note the section element already receives variants via `fadeRightConfig` — if `SectionHeading` sits inside a `motion.div` without variants, wrap it as shown above (if the existing heading is a direct child, keep the same wrapper structure).

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsSection.tsx
git commit -m "feat: restyle project cards with editor tab headers"
```

---

### Task 14: Contact restyle — editor window form

**Files:**
- Modify: `src/components/ContactFooter.tsx`
- Modify: `src/components/ContactForm.tsx` (input focus color only)

**Interfaces:**
- Consumes: `SectionHeading` (Task 2), `ContactForm`, `personalInfo`.
- Produces: `// Contact` heading + `contact.ts` chip + `// TODO: hire me` comment; editor window card with `contact.ts` tab + close X; form fields unchanged (`> name`, `> subject`, `> message`); email + social links row; copyright as code comment.

- [ ] **Step 1: Replace ContactFooter.tsx**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';

const socialLinks = [
  { label: 'GitHub', href: personalInfo.socials.github },
  { label: 'WhatsApp', href: personalInfo.socials.whatsapp ?? '#' },
  { label: 'Email', href: `mailto:${personalInfo.socials.email}` },
];

export default function ContactFooter() {
  return (
    <motion.footer
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <SectionHeading file="contact.ts">Contact</SectionHeading>
          <p className="font-mono text-sm text-code-const -mt-4 mb-8">// TODO: hire me</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl rounded-md border border-edge bg-surface overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
            <span className="text-xs text-muted">contact.ts</span>
            <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="p-4 sm:p-6">
            <ContactForm />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-edge/50 pt-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-dim mb-2">Direct</p>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              className="block break-all text-lg text-copy hover:text-accent transition-colors duration-200"
            >
              {personalInfo.socials.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-copy transition-colors duration-200 min-h-11"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-center font-mono text-xs text-dim"
        >
          // &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
```

- [ ] **Step 2: Update ContactForm input focus**

In `src/components/ContactForm.tsx`, change `inputClass`:

```tsx
const inputClass =
  'w-full rounded-md border border-edge bg-transparent px-3 py-2.5 text-sm text-copy outline-none placeholder:text-dim focus-visible:border-accent transition-colors duration-200';
```

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactFooter.tsx src/components/ContactForm.tsx
git commit -m "feat: restyle contact as editor window form"
```

---

### Task 15: Final pass — global consistency

**Files:**
- Modify: any component still using old chrome (run greps first)

- [ ] **Step 1: Grep for leftover old-chrome classes**

Run:
- `rg -n "rounded-xl" src` — fix any remaining `rounded-xl` card/panel uses (allowed only on nothing; convert to `rounded-md`).
- `rg -n "rounded-full" src` — allowed ONLY for tag chips (Experience tags, Skills chips, ProjectCard tags) and nothing else; convert any other uses (e.g. BackToTop button, ContactModal) to `rounded-md`.
- `rg -n "traffic|ff5f56|ffbd2e|27c93f|shadow-glow-dot|bg-dim\" />" src` — expected: no matches.
- `rg -n "bg-dim" src` — allowed in: terminal hint lines (MiniTerminal uses `text-muted` now) — convert any remaining `bg-dim` dots to nothing (they should all be gone).

- [ ] **Step 2: BackToTop + ContactModal rounding**

- `src/components/BackToTop.tsx`: change `rounded-full` → `rounded-md` (keep `bottom-8 right-8`).
- `src/components/ContactModal.tsx`: change the dialog `rounded-2xl` → `rounded-md`; modal header/footer `border-b border-edge` stays.

- [ ] **Step 3: Verify + commit**

Run: `npm run build; npm run lint` — expected: exit 0.

```bash
git add -A
git commit -m "chore: final IDE chrome consistency pass"
```

---

### Task 16: Deploy

- [ ] **Step 1: Push and deploy**

```bash
git push origin main
npm run deploy
```

- [ ] **Step 2: Manual smoke check (user)**

Check on the live site: menu bar tabs highlight per section; explorer shows active file; status bar visible on desktop; hero code window + blinking cursor; terminal still accepts `help`; accordions expand; carousel swipes (mobile); light/dark toggle switches GitHub palettes; contact form submits to Formspree; no traffic lights anywhere.

---

## Self-Review Notes

- Spec coverage: all spec sections map to tasks — tokens (1), menu bar (4), explorer (5), status bar (3), hero (7), headings (2 + per-section), tree accordions (10/11), project tabs (13), contact (14), removals (3/15), light mode (1), easter eggs (7/14), mobile hamburger file list (4).
- Type consistency: `useActiveSection`/`sectionFiles` defined in Task 3, consumed in Tasks 4/5; `SectionHeading` defined Task 2, consumed Tasks 8-14. Token names consistent across all tasks.
- No placeholders; every step has concrete code or commands.