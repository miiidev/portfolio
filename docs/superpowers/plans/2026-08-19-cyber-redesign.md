# Cyber Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the shipped bento portfolio from warm playful bento to "Linear x monitor glow": cool slate + neon palette, Geist/Geist Mono typography, terminal texture (grid, cursor, mono labels, glow) at 60% loud, without any structural change.

**Architecture:** Surface restyle only. All color/type moves live in the existing token system (`src/index.css` `@theme` + `.light`) plus new CSS utilities (hero grid, cursor blink, status dot pulse, glow shadow classes). Component changes are class/token swaps plus a small set of additions in HeroSection (grid layer, mono status line, status chip), ProjectCard (glow prop), and hover-glow states. Carousel geometry, section order, nav structure, and both themes stay untouched.

**Tech Stack:** React 19 + Vite 8 + Tailwind CSS v4 (CSS-first `@theme`) + framer-motion. Verification gate is `npm run build` + `npm run lint` (no test framework) plus grep gates.

## Global Constraints

- No test framework: every task verifies with `npm run build; npm run lint` (both must exit 0) plus the task's grep gates.
- Fonts: Geist (400/500/600/700/800) + Geist Mono (400/700) from Google Fonts via `index.html` `<link>`; Tailwind `--font-sans`/`--font-mono` in `@theme`. Never import font packages via npm.
- Tokens: keep every existing variable name (`--color-canvas`, `--color-surface`, ...); only values change, plus two new tokens `--color-glow` and `--color-glow-soft`. `.light` class mechanism and `.dark` default unchanged.
- Final token values come from the spec table (light accent `#007A9E`, light accent-3 `#0B7A52`, light dim `#666E7B`, dark dim `#7A8291`). Do not change them.
- No structural changes: no section reorder, no carousel geometry change, no new sections/imagery, no copy rewrites except the hero mono line `~/miiidev $`.
- Motion diet: 44px touch targets, no backdrop-blur, no em dashes/emojis, viewport-once reveals, `MotionConfig reducedMotion="user"` stays. New animations (cursor blink, status dot pulse) MUST have `@media (prefers-reduced-motion: reduce)` fallbacks.
- Mono is texture only: nav labels, chips, periods, hero line, dots. Never for body prose or headings.
- Git: one commit per task, message style `feat: ...` matching repo history. Push + deploy happen once after all tasks.
- Windows PowerShell (no `rg`): use `Select-String` for grep gates.

---

### Task 1: Tokens, fonts, base CSS, selection

**Files:**
- Modify: `index.html` (fonts)
- Modify: `src/index.css` (tokens, font stacks, new utilities)
- Modify: `src/App.tsx` (selection color)

**Interfaces:**
- Consumes: nothing.
- Produces: CSS classes `.card-glow`, `.card-glow-soft`, `.hero-grid`, `.cursor-block`, `.status-dot` and tokens `--color-glow`, `--color-glow-soft` used by Tasks 2, 5. Font stacks `font-sans`/`font-mono` used by Tasks 3, 4, 5.

- [ ] **Step 1: Add Google Fonts to index.html**

In `index.html`, replace the `<title>` line block with the title plus font links (keep the title):

```html
    <title>Ahmad Syahmi - Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 2: Replace the token sets in src/index.css**

Replace the entire `@theme { ... }` block (currently lines 3-21) with:

```css
@theme {
  --breakpoint-xs: 25rem;
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --color-canvas: #0a0b0e;
  --color-surface: #131519;
  --color-elevated: #1c1f26;
  --color-copy: #f2f4f8;
  --color-muted: #9aa3b2;
  --color-dim: #7a8291;
  --color-edge: #23262e;
  --color-edge-hover: #f2f4f8;
  --color-inverse: #f2f4f8;
  --color-inverse-copy: #0a0b0e;
  --color-danger: #ff5c7a;
  --color-accent: #00d4ff;
  --color-accent-2: #7c6cff;
  --color-accent-3: #3ddb85;
  --color-accent-4: #ff5c8a;
  --color-shadow-card: rgba(0, 10, 24, 0.5);
  --color-glow: rgba(0, 212, 255, 0.25);
  --color-glow-soft: rgba(0, 212, 255, 0.15);
}
```

Replace the entire `.light { ... }` block (currently lines 23-40) with:

```css
.light {
  --color-canvas: #f4f6fa;
  --color-surface: #ffffff;
  --color-elevated: #e9edf4;
  --color-copy: #14161c;
  --color-muted: #5a6270;
  --color-dim: #666e7b;
  --color-edge: #d7dce5;
  --color-edge-hover: #14161c;
  --color-inverse: #14161c;
  --color-inverse-copy: #f4f6fa;
  --color-danger: #d6336c;
  --color-accent: #007a9e;
  --color-accent-2: #5b4bd1;
  --color-accent-3: #0b7a52;
  --color-accent-4: #d6336c;
  --color-shadow-card: rgba(16, 24, 40, 0.08);
  --color-glow: rgba(0, 122, 158, 0.18);
  --color-glow-soft: rgba(0, 122, 158, 0.1);
}
```

- [ ] **Step 3: Add the new utilities to src/index.css**

Append after the existing `.card-shadow` rule (line ~51-53):

```css
.card-glow {
  box-shadow: 0 3px 10px var(--color-shadow-card), 0 0 48px var(--color-glow);
}

.card-glow-soft {
  box-shadow: 0 3px 10px var(--color-shadow-card), 0 0 32px var(--color-glow-soft);
}

.hero-grid {
  background-image:
    linear-gradient(to right, rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
}

.light .hero-grid {
  background-image:
    linear-gradient(to right, rgba(0, 122, 158, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 122, 158, 0.07) 1px, transparent 1px);
}

@keyframes cursor-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.cursor-block {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  margin-left: 0.15em;
  vertical-align: text-bottom;
  background-color: var(--color-accent);
  animation: cursor-blink 1.1s step-end infinite;
}

@keyframes status-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.status-dot {
  animation: status-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-block {
    animation: none;
  }
  .status-dot {
    animation: none;
  }
}
```

Note: the `@media (prefers-reduced-motion: reduce)` block above is separate from the existing one at the bottom of the file; both stay.

- [ ] **Step 4: Selection color in App.tsx**

In `src/App.tsx`, change the shell div (line ~30) from `selection:bg-elevated` to `selection:bg-accent/30`:

```tsx
<div className="min-h-screen bg-canvas text-copy selection:bg-accent/30">
```

- [ ] **Step 5: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gates (PowerShell, from repo root):

```powershell
Select-String -Path src\index.css -Pattern "#141414|#ff6b35|#fff8f0"
```

Expected: no matches (old warm tokens gone).

```powershell
Select-String -Path index.html -Pattern "fonts.googleapis.com"
```

Expected: 2 matches (preconnect + stylesheet).

```powershell
Select-String -Path src\index.css -Pattern "card-glow|cursor-blink|status-pulse|hero-grid"
```

Expected: matches present.

- [ ] **Step 6: Commit**

```bash
git add index.html src/index.css src/App.tsx
git commit -m "feat: cyber tokens, geist fonts, glow and terminal utilities"
```

---

### Task 2: Hero terminal texture

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Interfaces:**
- Consumes: `.hero-grid`, `.cursor-block`, `.status-dot` CSS from Task 1; tokens `--color-accent-3` (both themes), `bg-accent-3/10`.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Add the grid layer and status line**

In `src/components/HeroSection.tsx`, modify the section opening and the text column:

Change the section element (line 8-15) from:

```tsx
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
```

to:

```tsx
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="relative min-h-screen flex items-center py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
```

Change the text column (line 17-18) from:

```tsx
        <motion.div variants={heroItemVariants}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-copy">
```

to:

```tsx
        <motion.div variants={heroItemVariants}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 font-mono text-sm text-muted">
            <span>
              ~/miiidev $
              <span className="cursor-block" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-3/10 text-accent-3 px-3 py-1 text-xs font-bold">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent-3" aria-hidden="true" />
              all systems go
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-copy">
```

- [ ] **Step 2: Add hover glows to the hero buttons**

Change the "View my work" button class (line 27) from:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-accent text-canvas font-bold text-sm transition-opacity hover:opacity-90"
```

to:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-accent text-canvas font-bold text-sm transition-all hover:opacity-90 hover:shadow-[0_0_24px_var(--color-glow)]"
```

Change the "Say hello" button class (line 33) from:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-surface border border-edge text-copy font-bold text-sm transition-colors hover:border-accent"
```

to:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-surface border border-edge text-copy font-bold text-sm transition-all hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)]"
```

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate:

```powershell
Select-String -Path src\components\HeroSection.tsx -Pattern "hero-grid|~/miiidev|all systems go|cursor-block"
```

Expected: matches present.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: hero terminal line, grid texture, button glows"
```

---

### Task 3: Nav mono labels and active glow

**Files:**
- Modify: `src/components/NavBar.tsx`

**Interfaces:**
- Consumes: `font-mono` stack from Task 1; `--color-glow` token.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Desktop nav links**

Change the desktop link class (lines 29-33) from:

```tsx
              className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
```

to:

```tsx
              className={`inline-flex items-center min-h-11 px-4 rounded-full font-mono text-sm font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
```

- [ ] **Step 2: Mobile nav links**

Change the mobile link class (lines 54-58) from:

```tsx
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full text-xs font-bold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy'
              }`}
```

to:

```tsx
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full font-mono text-xs font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy'
              }`}
```

Note: the brand mark "miiidev" and the nav item labels in `items` array stay unchanged (labels get the mono font from the link classes).

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate:

```powershell
Select-String -Path src\components\NavBar.tsx -Pattern "font-mono|shadow-\[0_0_16px_var"
```

Expected: 2 matches for `font-mono`, 2 for the glow shadow.

- [ ] **Step 4: Commit**

```bash
git add src/components/NavBar.tsx
git commit -m "feat: mono nav labels with active glow"
```

---

### Task 4: Mono chips and period labels

**Files:**
- Modify: `src/components/SkillsSection.tsx`
- Modify: `src/components/ExperienceSection.tsx`
- Modify: `src/components/EducationSection.tsx`
- Modify: `src/components/AchievementsSection.tsx`

**Interfaces:**
- Consumes: `font-mono` stack from Task 1.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Skills chips mono**

In `src/components/SkillsSection.tsx`, change the chip span (line 40) from:

```tsx
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${color}`}
```

to:

```tsx
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold ${color}`}
```

- [ ] **Step 2: Experience period labels mono lowercase**

In `src/components/ExperienceSection.tsx`, change line 26 from:

```tsx
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{item.period}</p>
```

to:

```tsx
            <p className="font-mono text-xs font-bold text-accent lowercase mb-2">{item.period}</p>
```

- [ ] **Step 3: Education period labels mono lowercase**

In `src/components/EducationSection.tsx`, change line 51 from:

```tsx
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.period}</p>
```

to:

```tsx
                  <p className="font-mono text-xs font-bold text-accent lowercase mb-0.5">{item.period}</p>
```

- [ ] **Step 4: Achievement year labels mono lowercase**

In `src/components/AchievementsSection.tsx`, change line 51 from:

```tsx
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.year}</p>
```

to:

```tsx
                  <p className="font-mono text-xs font-bold text-accent lowercase mb-0.5">{item.year}</p>
```

- [ ] **Step 5: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (should return exactly 1 match — the "Direct" label in ContactFooter.tsx is exempt and stays as-is):

```powershell
Get-ChildItem src\components -Filter "*.tsx" | Select-String -Pattern "uppercase tracking-wider"
```

Expected: exactly 1 match, and it must be `src\components\ContactFooter.tsx` line ~40.

- [ ] **Step 6: Commit**

```bash
git add src/components/SkillsSection.tsx src/components/ExperienceSection.tsx src/components/EducationSection.tsx src/components/AchievementsSection.tsx
git commit -m "feat: mono chips and lowercase period labels"
```

---

### Task 5: Carousel neon glow

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectsSection.tsx`

**Interfaces:**
- Consumes: `.card-glow`, `.card-glow-soft` from Task 1; `--color-glow` token.
- Produces: new optional prop `glow?: 'full' | 'soft'` on `ProjectCard`. Desktop branch passes `glow="full"`; MobileCardStack (unchanged) relies on the `'soft'` default for its top card.

- [ ] **Step 1: Add the glow prop to ProjectCard**

In `src/components/ProjectCard.tsx`, change the component signature and root className (lines 11-17) from:

```tsx
export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col card-shadow ${
        isCenter ? 'border-accent' : 'border-edge hover:border-accent'
      }`}
    >
```

to:

```tsx
export default function ProjectCard({
  project,
  isCenter = true,
  glow = 'soft',
}: {
  project: Project;
  isCenter?: boolean;
  glow?: 'full' | 'soft';
}) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col ${
        isCenter
          ? `border-accent ${glow === 'full' ? 'card-glow' : 'card-glow-soft'}`
          : 'card-shadow border-edge hover:border-accent'
      }`}
    >
```

- [ ] **Step 2: Desktop branch passes glow="full"**

In `src/components/ProjectsSection.tsx`, in the desktop branch, change the ProjectCard usage (around line 121) from:

```tsx
                    <ProjectCard project={project} isCenter={pos === 0} />
```

to:

```tsx
                    <ProjectCard project={project} isCenter={pos === 0} glow="full" />
```

- [ ] **Step 3: Arrow hover glow**

In `src/components/ProjectsSection.tsx`, change BOTH arrow buttons (lines ~129 and ~136) from:

```tsx
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
```

and

```tsx
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
```

to the same classes but with `hover:shadow-[0_0_16px_var(--color-glow-soft)]` appended:

```tsx
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all"
```

and

```tsx
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all"
```

- [ ] **Step 4: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate:

```powershell
Select-String -Path src\components\ProjectCard.tsx -Pattern "card-glow"; Select-String -Path src\components\ProjectsSection.tsx -Pattern 'glow="full"|hover:shadow'
```

Expected: `card-glow` and `card-glow-soft` in ProjectCard, `glow="full"` and 2 `hover:shadow` in ProjectsSection.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsSection.tsx
git commit -m "feat: neon glow on carousel cards and arrows"
```

Note for the reviewer: the carousel container uses `overflow-clip`; the 48px glow can clip at the top/bottom edge of the container. This is expected at current strength. If it is visibly cut, reduce the container class to `overflow-visible` on desktop only, or drop the glow blur to 32px, then re-verify.

---

### Task 6: Button and BackToTop glow

**Files:**
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/BackToTop.tsx`

**Interfaces:**
- Consumes: `--color-glow`, `--color-glow-soft` tokens.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: ContactForm submit button glow**

In `src/components/ContactForm.tsx`, change the submit button class (line 147) from:

```tsx
        className="inline-flex items-center gap-2 rounded-full bg-accent text-canvas font-semibold h-11 px-5 text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
```

to:

```tsx
        className="inline-flex items-center gap-2 rounded-full bg-accent text-canvas font-semibold h-11 px-5 text-sm transition-all hover:opacity-90 hover:shadow-[0_0_24px_var(--color-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
```

- [ ] **Step 2: BackToTop hover glow**

In `src/components/BackToTop.tsx`, change the button class (line 20) from:

```tsx
          className="fixed bottom-8 right-8 z-40 p-3 bg-surface border border-edge card-shadow rounded-full text-muted hover:text-copy hover:border-copy transition-all shadow-lg"
```

to:

```tsx
          className="fixed bottom-8 right-8 z-40 p-3 bg-surface border border-edge card-shadow rounded-full text-muted hover:text-accent hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all shadow-lg"
```

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate:

```powershell
Select-String -Path src\components\ContactForm.tsx -Pattern "hover:shadow"; Select-String -Path src\components\BackToTop.tsx -Pattern "hover:shadow"
```

Expected: 1 match each.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.tsx src/components/BackToTop.tsx
git commit -m "feat: glow on primary button and back-to-top"
```

---

## Post-Tasks (after all 6 tasks pass review)

1. Full verification: `npm run build; npm run lint` both exit 0.
2. Final grep sweep: no `#ff6b35`, `#141414`, `#fff8f0`, `#9c948a`, `#6e6e6e` anywhere in `src/`; no `uppercase tracking-wider` except ContactFooter.tsx; `~/miiidev` present in HeroSection.tsx.
3. Commit any remaining artifact files (ledger, briefs) as `chore: ...`.
4. `git push origin main`, then `npm run deploy`, then smoke `Invoke-WebRequest -Uri "https://miiidev.github.io/portfolio/" -UseBasicParsing -Method Head` expecting 200.
5. Report to the user: what changed per surface, glow-strength note (they will tune later if needed).
