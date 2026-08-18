# Bento Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the IDE/editor theme with a playful bold bento look (rounded cards, soft shadows, orange accent, sticker chips), mobile-first, keeping light+dark toggle, all sections, and the projects carousel geometry.

**Architecture:** Restyle in place — the token names (`bg-canvas`, `bg-surface`, `text-copy`, `border-edge`, `text-accent`, etc.) stay identical, so components migrate without renames. Delete the IDE-only components (MiniTerminal, GitHubStats, StatusBar, FileExplorer, ContactModal, editor frame in ProjectsSection). New NavBar component renders a bottom pill bar (< md) and a top pill bar (≥ md). Tasks run in dependency order 1→8.

**Tech Stack:** React 19, Vite 8, Tailwind v4 (`@theme` tokens), framer-motion, existing hooks (`useActiveSection`), existing data shapes.

## Global Constraints

- No test framework — verification gate is `npm run build` + `npm run lint`, both must exit 0.
- No new dependencies; no changes to `src/data.ts` shapes.
- Motion diet: `min-h-11` (44px) touch targets, NO backdrop-blur, no em dashes, no emojis in UI copy, viewport-once reveals, `MotionConfig reducedMotion="user"`.
- Radius: cards `rounded-2xl`, chips/pills `rounded-full`, inputs `rounded-lg`. No `rounded-md` except where noted.
- Cards get shadow via the new `.card-shadow` utility (Task 1).
- Windows PowerShell: no `rg`; use `Select-String`.
- Spec: `docs/superpowers/specs/2026-08-18-bento-redesign-design.md` — read it before starting any task.

---

### Task 1: Tokens + layout foundation

**Files:**
- Modify: `src/index.css` (full replace)
- Modify: `src/App.tsx` (imports + main padding)

**Interfaces:**
- Produces: `--color-accent-2/3/4` tokens, `.card-shadow` utility class, removed `cursor-block`/`skill-icon-base`/code tokens/nav-edge. All other token names unchanged.
- Consumes: nothing.

- [ ] **Step 1: Replace `src/index.css`**

Replace the whole file with:

```css
@import "tailwindcss";

@theme {
  --breakpoint-xs: 25rem;
  --color-canvas: #141414;
  --color-surface: #1e1e1e;
  --color-elevated: #262626;
  --color-copy: #f5f5f4;
  --color-muted: #9a9a9a;
  --color-dim: #6e6e6e;
  --color-edge: #2e2e2e;
  --color-edge-hover: #f5f5f4;
  --color-inverse: #f5f5f4;
  --color-inverse-copy: #141414;
  --color-danger: #ff8a5c;
  --color-accent: #ff6b35;
  --color-accent-2: #ffb703;
  --color-accent-3: #4d7cff;
  --color-accent-4: #00a88e;
  --color-shadow-card: rgba(0, 0, 0, 0.35);
}

.light {
  --color-canvas: #fff8f0;
  --color-surface: #ffffff;
  --color-elevated: #f7f0e4;
  --color-copy: #171717;
  --color-muted: #6b6b6b;
  --color-dim: #9c948a;
  --color-edge: #efe4d4;
  --color-edge-hover: #171717;
  --color-inverse: #171717;
  --color-inverse-copy: #fff8f0;
  --color-danger: #d94f1d;
  --color-accent: #ff6b35;
  --color-accent-2: #b8891a;
  --color-accent-3: #3a5bd0;
  --color-accent-4: #007a68;
  --color-shadow-card: rgba(0, 0, 0, 0.07);
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}

.card-shadow {
  box-shadow: 0 3px 10px var(--color-shadow-card);
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

Note: accent-2/3/4 get dark-mode-suitable values in `.light` (darker yellow/blue/teal for contrast on white).

- [ ] **Step 2: Update `src/App.tsx` (padding only — imports unchanged)**

Change ONLY the `<main>` className. The file keeps its existing imports (Navbar, FileExplorer, StatusBar included — they are removed in Tasks 2-3):

```diff
-          <main className="px-6 md:px-12 lg:pl-48 max-w-6xl mx-auto overflow-hidden pb-6 md:pb-12">
+          <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden pb-28 md:pb-12">
```

(`pb-28` clears the mobile bottom bar.)

- [ ] **Step 3: Verify tokens compile**

Run: `npm run build; npm run lint` — both must exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.tsx
git commit -m "feat: bento tokens and layout foundation"
```

---

### Task 2: NavBar — bottom bar (mobile) + top pills (desktop)

**Files:**
- Create: `src/components/NavBar.tsx`
- Delete: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `useActiveSection` (returns section id string), `ThemeToggle` (existing component, unchanged).
- Produces: default export `NavBar` — no props. Renders: bottom bar below `md` (fixed, `min-h-11` items), top pill bar at `md+` (sticky). Nav items: `[{ id: 'work', label: 'Work' }, { id: 'skills', label: 'Skills' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Talk' }]`.

- [ ] **Step 1: Create `src/components/NavBar.tsx`**

```tsx
import ThemeToggle from './ThemeToggle';
import { useActiveSection } from '../hooks/useActiveSection';

const items = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Talk' },
];

export default function NavBar() {
  const active = useActiveSection();

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden md:flex items-center gap-1 sticky top-0 z-50 bg-canvas/95 px-4 lg:px-8 border-b border-edge"
      >
        <a href="#hero" className="flex items-center gap-2 shrink-0 text-copy hover:opacity-90 transition-opacity mr-4">
          <span className="font-extrabold tracking-tight text-lg">miiidev</span>
        </a>
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>

      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center justify-around rounded-full border border-edge bg-surface card-shadow px-2 py-1.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full text-xs font-bold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
```

Note: the desktop nav uses `bg-canvas/95` (a solid-ish canvas, not a blur — motion diet allows opacity, not backdrop-blur).

- [ ] **Step 2: Delete the old navbar**

```bash
git rm src/components/Navbar.tsx
```

- [ ] **Step 3: Update `src/App.tsx` — swap the import and JSX tag**

```diff
-import Navbar from './components/Navbar';
+import NavBar from './components/NavBar';
```

```diff
-          <Navbar />
+          <NavBar />
```

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.tsx src/App.tsx
git commit -m "feat: bento nav - bottom bar mobile, top pills desktop"
```

---

### Task 3: Cut IDE chrome — delete components, rewrite Hero

**Files:**
- Delete: `src/components/MiniTerminal.tsx`, `src/components/GitHubStats.tsx`, `src/components/StatusBar.tsx`, `src/components/FileExplorer.tsx`, `src/components/ContactModal.tsx`
- Modify: `src/components/HeroSection.tsx` (full replace)

**Interfaces:**
- Consumes: `personalInfo` (fields `role`, `location`), `LazyImage`, `heroContainerVariants`/`heroItemVariants` from `../utils/animations`.
- Produces: HeroSection with no editor window, no terminal, no modal, no `portfolio:contact` listener; CTA "Say hello" scrolls to `#contact`.
- Note: ProjectsSection still imports nothing deleted; its `portfolio:project` listener is removed in Task 6.

- [ ] **Step 1: Delete the five files**

```bash
git rm src/components/MiniTerminal.tsx src/components/GitHubStats.tsx src/components/StatusBar.tsx src/components/FileExplorer.tsx src/components/ContactModal.tsx
```

- [ ] **Step 2: Update `src/App.tsx` — remove StatusBar and FileExplorer**

```diff
-import FileExplorer from './components/FileExplorer';
...
-import StatusBar from './components/StatusBar';
```

```diff
-          <FileExplorer />
...
-          <StatusBar />
```

- [ ] **Step 3: Replace `src/components/HeroSection.tsx`**

```tsx
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
            {personalInfo.role} based in {personalInfo.location}. Building AI-powered and security-focused applications.
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
```

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0. Also grep for leftovers:

```
Select-String -Path src -Pattern "portfolio:contact|ContactModal|MiniTerminal|GitHubStats|StatusBar|FileExplorer" -Recurse
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.tsx src/App.tsx
git commit -m "feat: hero without editor chrome, cut terminal and stats"
```

---

### Task 4: SectionHeading + About + Skills

**Files:**
- Modify: `src/components/SectionHeading.tsx` (full replace)
- Modify: `src/components/AboutSection.tsx` (full replace)
- Modify: `src/components/SkillsSection.tsx` (full replace)

**Interfaces:**
- Consumes: `personalInfo` (`role`, `location`, `skills: { domain, items: { name, icon } }[]`, `socials`), `containerVariants`/`itemVariants`.
- Produces: `SectionHeading` with signature `{ children: string }` (the `file` prop is GONE — all call sites in this and later tasks use the new signature).
- Produces: `accentCycle` chip classes pattern: `['text-accent bg-accent/10', 'text-accent-2 bg-accent-2/10', 'text-accent-3 bg-accent-3/10', 'text-accent-4 bg-accent-4/10']`.

- [ ] **Step 1: Replace `src/components/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  children: string;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/components/AboutSection.tsx`**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

const socials = [
  { label: 'GitHub', href: personalInfo.socials.github },
  { label: 'WhatsApp', href: personalInfo.socials.whatsapp ?? '#' },
  { label: 'Email', href: `mailto:${personalInfo.socials.email}` },
];

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
        <SectionHeading>About</SectionHeading>
      </motion.div>
      <motion.div variants={itemVariants} className="rounded-2xl bg-surface border border-edge card-shadow p-6 sm:p-8 max-w-3xl">
        <p className="text-base sm:text-lg text-copy leading-relaxed mb-4">
          I&apos;m a {personalInfo.role} based in {personalInfo.location}, building AI-powered and security-focused applications with machine learning, computer vision, and real-time systems.
        </p>
        <p className="text-base text-muted leading-relaxed mb-6">
          I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.
        </p>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="inline-flex items-center min-h-11 px-5 rounded-full bg-accent/10 text-accent text-sm font-bold transition-colors hover:bg-accent hover:text-canvas"
            >
              {social.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
```

- [ ] **Step 3: Replace `src/components/SkillsSection.tsx`**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

const accentCycle = [
  'text-accent bg-accent/10',
  'text-accent-2 bg-accent-2/10',
  'text-accent-3 bg-accent-3/10',
  'text-accent-4 bg-accent-4/10',
];

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
        <SectionHeading>Skills</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {personalInfo.skills.map((group, gi) => {
          const color = accentCycle[gi % accentCycle.length];
          return (
            <motion.div
              key={group.domain}
              variants={itemVariants}
              className="rounded-2xl bg-surface border border-edge card-shadow p-6"
            >
              <h3 className="text-base font-extrabold text-copy mb-4">{group.domain}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${color}`}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt=""
                      className="w-4 h-4"
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

Note: `skill-icon-base` inversion CSS was removed in Task 1; the simpleicons icons render white on the tinted chip backgrounds in both themes — acceptable (chips have colored translucent backgrounds in both themes).

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0. Grep for old heading usage:

```
Select-String -Path src -Pattern "file=\"about.ts\"|file=\"skills.ts\"" -Recurse
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionHeading.tsx src/components/AboutSection.tsx src/components/SkillsSection.tsx
git commit -m "feat: bento headings, about card, skill chips"
```

---

### Task 5: Experience + Education + Achievements

**Files:**
- Modify: `src/components/ExperienceSection.tsx` (full replace)
- Modify: `src/components/EducationSection.tsx` (full replace)
- Modify: `src/components/AchievementsSection.tsx` (full replace)

**Interfaces:**
- Consumes: `experience: { period, title, org?, description, tags: string[] }[]`, `education: { period, title, org, description? }[]`, `achievements: { year, title, description }[]`, `containerVariants`/`itemVariants`.
- Produces: restyled cards; accordions keep identical state behavior (`openIndex`, chevron rotate).

- [ ] **Step 1: Replace `src/components/ExperienceSection.tsx`**

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
        <SectionHeading>Experience</SectionHeading>
      </motion.div>
      <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-2xl bg-surface border border-edge card-shadow p-6"
          >
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{item.period}</p>
            <h3 className="text-lg font-extrabold text-copy mb-1">{item.title}</h3>
            {item.org && <p className="text-sm text-muted mb-3">{item.org}</p>}
            <p className="text-sm text-muted leading-relaxed mb-4">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold"
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

- [ ] **Step 2: Replace `src/components/EducationSection.tsx`**

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
        <SectionHeading>Education</SectionHeading>
      </motion.div>
      <div className="space-y-3 max-w-3xl">
        {education.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl bg-surface border border-edge card-shadow overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 py-4 min-h-11 text-left"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.period}</p>
                  <h3 className="text-base font-extrabold text-copy">{item.title}</h3>
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
                    <div className="pl-12 pr-5 pb-4 text-sm text-muted leading-relaxed">
                      {item.description || 'More details coming soon.'}
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

- [ ] **Step 3: Replace `src/components/AchievementsSection.tsx`**

Same as Step 2's structure with achievements data. Replace the whole file with:

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
        <SectionHeading>Achievements</SectionHeading>
      </motion.div>
      <div className="space-y-3 max-w-3xl">
        {achievements.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl bg-surface border border-edge card-shadow overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 py-4 min-h-11 text-left"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.year}</p>
                  <h3 className="text-base font-extrabold text-copy">{item.title}</h3>
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
                    <div className="pl-12 pr-5 pb-4 text-sm text-muted leading-relaxed">
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

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExperienceSection.tsx src/components/EducationSection.tsx src/components/AchievementsSection.tsx
git commit -m "feat: bento experience, education, achievements"
```

---

### Task 6: Projects — cards, carousel, no editor frame

**Files:**
- Modify: `src/components/ProjectCard.tsx` (full replace)
- Modify: `src/components/ProjectsSection.tsx` (full replace)
- Modify: `src/components/MobileCardStack.tsx` (one class change)

**Interfaces:**
- Consumes: `projects: Project[]` (`id`, `title`, `description`, `tags: string[]`, `repo?`, `demo?`, `image?`), `LazyImage`.
- Produces: `ProjectCard` signature unchanged `{ project, isCenter }`. `ProjectsSection` keeps the carousel geometry EXACTLY (680px center, offset 100/60, farOffset 300/100, scale 1/0.9/0.78, opacity 1/0.4/0, pointer-events none, spring 250/28/0.8, drag, `getPosition`, MobileCardStack for ≤768px) — the `portfolio:project` listener is REMOVED.

- [ ] **Step 1: Replace `src/components/ProjectCard.tsx`**

```tsx
import type { Project } from '../data';
import LazyImage from './LazyImage';

const accentCycle = [
  'text-accent bg-accent/10',
  'text-accent-2 bg-accent-2/10',
  'text-accent-3 bg-accent-3/10',
  'text-accent-4 bg-accent-4/10',
];

export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col card-shadow ${
        isCenter ? 'border-accent' : 'border-edge hover:border-accent'
      }`}
    >
      {project.image ? (
        <div className="w-full border-b border-edge overflow-hidden">
          <LazyImage src={project.image} alt={project.title} className="w-full" imgClassName="w-full h-auto object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-video border-b border-edge bg-elevated/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span className="text-xs font-bold opacity-30">Screenshot</span>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h3 className="text-lg font-extrabold text-copy mb-2">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${accentCycle[index % accentCycle.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-auto pt-1">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

Note: screenshot keeps natural aspect (1920x912 = 21:10) — `w-full h-auto`, no crop, per the earlier fix.

- [ ] **Step 2: Replace `src/components/ProjectsSection.tsx`**

Keep the exact carousel logic (isMobile state, matchMedia, offset/farOffset, getPosition, handleDragEnd, next/prev) and replace the render with:

```tsx
import { useState, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';
import MobileCardStack from './MobileCardStack';
import { projects } from '../data';
import { fadeRightConfig } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const offset = isMobile ? 60 : 100;
  const farOffset = isMobile ? 100 : 300;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getPosition = (index: number) => {
    const diff = index - currentIndex;
    const length = projects.length;

    let normalizedDiff = diff;
    if (diff < -Math.floor(length / 2)) normalizedDiff += length;
    if (diff > Math.floor(length / 2)) normalizedDiff -= length;

    return normalizedDiff;
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offsetDrag = info.offset.x;

    if (offsetDrag < -threshold || velocity < -500) {
      nextProject();
    } else if (offsetDrag > threshold || velocity > 500) {
      prevProject();
    }
  };

  return (
    <motion.section id="work" {...fadeRightConfig} className="flex flex-col justify-center py-12">
      <div className="flex items-center justify-between mb-6">
        <SectionHeading>Work</SectionHeading>
      </div>

      {isMobile ? (
        <div className="relative w-full h-[450px] mt-6">
          <MobileCardStack
            projects={projects}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            sensitivity={100}
          />
        </div>
      ) : (
        <div className="relative mt-6">
          <motion.div
            className="relative w-full min-h-[560px] overflow-clip"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragDirectionLock
            onDragEnd={handleDragEnd}
            style={{ touchAction: 'pan-y' }}
          >
            {projects.map((project, index) => {
              const pos = getPosition(index);
              const abs = Math.abs(pos);

              return (
                <motion.div
                  key={project.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: 'min(100%, 680px)',
                    zIndex: pos === 0 ? 3 : abs === 1 ? 2 : 1,
                    pointerEvents: pos === 0 ? 'auto' : 'none',
                  }}
                  animate={{
                    x: pos === 0 ? 0 : pos === -1 ? -offset : pos === 1 ? offset : pos < 0 ? -farOffset : farOffset,
                    scale: pos === 0 ? 1 : abs === 1 ? 0.9 : 0.78,
                    opacity: abs <= 1 ? (pos === 0 ? 1 : 0.4) : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 28,
                    mass: 0.8,
                  }}
                >
                  <div style={{ transform: 'translate(-50%, -50%)' }}>
                    <ProjectCard project={project} isCenter={pos === 0} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <button
            onClick={prevProject}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={nextProject}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </motion.section>
  );
}
```

- [ ] **Step 3: Update `src/components/MobileCardStack.tsx`**

One line: line 114 `className="rounded-md overflow-hidden w-full h-full"` → `className="rounded-2xl overflow-hidden w-full h-full"`. Nothing else changes.

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0. Grep for frame leftovers:

```
Select-String -Path src -Pattern "portfolio:project|breadcrumb|Ln 1|utf-8|grid-cols-2" -Recurse
```

Expected: no matches (the `grid-cols-2` in old AboutSection was already replaced in Task 4).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsSection.tsx src/components/MobileCardStack.tsx
git commit -m "feat: bento project cards, carousel without editor frame"
```

---

### Task 7: Contact + BackToTop

**Files:**
- Modify: `src/components/ContactFooter.tsx` (full replace)
- Modify: `src/components/ContactForm.tsx` (two class changes)
- Modify: `src/components/BackToTop.tsx` (one class change)

**Interfaces:**
- Consumes: `personalInfo` (`socials`, `formspreeId`, `name`), `ContactForm` (existing behavior).
- Produces: contact card without editor window; form labels without `>` prefix.

- [ ] **Step 1: Replace `src/components/ContactFooter.tsx`**

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
      className="flex flex-col justify-center py-12"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.div variants={itemVariants}>
          <SectionHeading>Contact</SectionHeading>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-surface border border-edge card-shadow p-6 sm:p-8"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-edge pt-6"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-dim mb-2">Direct</p>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              className="block break-all text-lg font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              {personalInfo.socials.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="inline-flex items-center min-h-11 px-4 rounded-full bg-accent/10 text-accent text-sm font-bold transition-colors hover:bg-accent hover:text-canvas"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-center text-xs text-dim"
        >
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
```

- [ ] **Step 2: Update `src/components/ContactForm.tsx`**

Two changes:

1. Line 12-13 `inputClass`: replace `rounded-md` with `rounded-lg`.
2. Labels: replace `&gt; name` with `Name`, `&gt; subject` with `Subject`, `&gt; message` with `Message` (lines 76, 101, 117).
3. Submit button (line 147): replace class `rounded-md bg-inverse text-inverse-copy` with `rounded-full bg-accent text-canvas`.

- [ ] **Step 3: Update `src/components/BackToTop.tsx`**

Line 20: replace `rounded-md` with `rounded-full` and `bg-surface border-edge` with `bg-surface border border-edge card-shadow`.

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint` — both must exit 0. Grep:

```
Select-String -Path src -Pattern "TODO: hire me|contact.ts|bg-inverse|rounded-md" -Recurse
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactFooter.tsx src/components/ContactForm.tsx src/components/BackToTop.tsx
git commit -m "feat: bento contact card and back-to-top"
```

---

### Task 8: Final QA + push + deploy

**Files:**
- Verify: whole `src/`

**Interfaces:**
- Consumes: Tasks 1-7.
- Produces: shipped site.

- [ ] **Step 1: Grep for IDE leftovers**

```
Select-String -Path src -Pattern "miii\.ts|about\.ts|experience\.ts|education\.ts|achievements\.ts|skills\.ts|projects\.tsx|contact\.ts|TERMINAL|github-stats|cursor-block|code-keyword|code-string|code-function|code-type|code-comment|code-const|font-mono|Ln 1|localhost:5173|file=\"" -Recurse
```

Expected: no matches. (Exceptions allowed: `src/data.ts` if it legitimately contains such strings — check and confirm they are not UI copy.)

- [ ] **Step 2: Full verification**

Run:

```
npm run build
npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Manual check summary for the user** (no action, list in report)

- `npm run dev` → check bottom bar on mobile width, top pills on desktop, both themes via toggle, carousel arrows round, no horizontal scroll at 360px width, contact form layout.

- [ ] **Step 4: Push and deploy**

```bash
git push origin main
npm run deploy
```

Expected: push succeeds, `Published` output from gh-pages.

- [ ] **Step 5: Smoke check**

Run: `Invoke-WebRequest -Uri "https://miiidev.github.io/portfolio/" -UseBasicParsing` — expected: StatusCode 200.

---

## Self-Review Notes

- **Spec coverage:** tokens (Task 1), nav bottom bar/top pills (Task 2), cut components + hero (Task 3), heading/about/skills (Task 4), experience/education/achievements (Task 5), carousel restyle + frame removal + listener removal (Task 6), contact/backtotop (Task 7), desktop acceptance + QA + deploy (Task 8). `portfolio:project`/`portfolio:contact` events fully removed. Data untouched. No new deps.
- **Type consistency:** `ProjectCard` signature unchanged; `SectionHeading` props become `{ children: string }` in Task 4 — all call sites across Tasks 4-7 use it; no other file imports `sectionFiles` (only Navbar did, deleted in Task 2). `NavBar` default export matches App.tsx import (Task 2).
- **Placeholders:** none — every task has full file literals or exact class changes.
- **Risk notes:** App.tsx changes are split across Tasks 1-3 so every commit stays green (Task 1: padding only; Task 2: NavBar swap; Task 3: StatusBar/FileExplorer removal).
