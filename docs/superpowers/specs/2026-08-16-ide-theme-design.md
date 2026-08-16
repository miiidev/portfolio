# IDE Theme Redesign — miii.dev Portfolio

Date: 2026-08-16
Status: Approved (user approved Parts 1-3)

## Goal

Make the portfolio **structurally and visually distinct** from hytechster.com while keeping a developer ("techy") identity. The previous design borrowed hytechster's terminal-window contact layout; this redesign replaces the whole visual language with an **IDE / code-editor theme** so the site reads as its own artifact: "the miii.dev source, rendered as an open editor."

## Decisions

- Full visual overhaul (layout structure + color identity + chrome).
- Theme: IDE / code-editor (VSCode-like). Not a terminal-only theme.
- Palette: classic dev syntax colors (GitHub dark/light inspired).
- Both dark and light modes kept (toggle switches the IDE palette).
- Hero MiniTerminal kept, restyled as the IDE's integrated terminal panel.
- Reusable components kept: carousel, accordions, form logic, modal, LazyImage, Formspree, theme toggle.

## Global Chrome

### Menu bar (replaces Navbar pill/island)

- Full-width editor toolbar, fixed top, squared corners (rounded-sm max), 1px bottom border.
- Left: `miii.` logo + active file name (e.g. `projects.tsx`).
- Right: open-file tabs per section (About, Experience, Education, Skills, Work, Contact) + theme toggle.
- Active tab: accent-blue underline/edge + lighter bg.
- Scroll: bar gains background + bottom border (no island shrink, no rounded pill).
- Mobile: logo + hamburger + theme toggle; explorer becomes a dropdown "file list" (same collapsible-menu behavior as current hamburger).

### File explorer sidebar (new, desktop only)

- Collapsible left rail (VSCode explorer style), `hidden lg:block`.
- Files: `README.md`, `about.ts`, `experience.ts`, `education.ts`, `achievements.ts`, `skills.ts`, `projects.tsx`, `contact.ts`.
- Active file = section in view (scroll spy), accent color + active indicator.
- Replaces the SideStepper (removed).

### Status bar (new, fixed bottom)

- Tiny monospace bar: left `main*  TypeScript  UTF-8`; right `Ln x, Col y · miii.dev`.
- Replaces the mobile bottom dot bar (removed). Hidden or minimal on mobile.

## Colors (GitHub dark/light classics)

Dark:
- canvas `#0d1117`, surface `#161b22`, elevated `#21262d`
- copy `#e6edf3`, muted `#8b949e`, dim `#6e7781`
- edge `#30363d`, nav-edge `rgba(240,246,252,0.1)`
- keyword `#ff7b72`, string `#a5d6ff`, function `#d2a8ff`, type `#ffa657`, comment `#8b949e`, const `#79c0ff`
- UI accent (active tab/focus): `#58a6ff`

Light:
- canvas `#ffffff`, surface `#f6f8fa`, elevated `#eaeef2`
- copy `#1f2328`, muted `#59636e`, dim `#6e7781`
- edge `#d0d7de`, nav-edge `rgba(31,35,40,0.12)`
- keyword `#cf222e`, string `#0a3069`, function `#8250df`, type `#953800`, comment `#6e7781`, const `#0550ae`
- UI accent: `#0969da`

Inverse (buttons) follows existing copy/inverse pattern.

## Sections

### Hero

- Left: editor window card, code-styled intro with syntax colors:
  `// miii.ts` header tab, `const developer = { name: 'Ahmad Syahmi', role: 'Software & AI Developer', location: 'Malaysia', openToWork: true }`, closing `};`, blinking block-cursor line.
- Right: profile image in a file-preview tab (`profile.png`) + integrated terminal panel below.
- Terminal panel: tab bar reads `TERMINAL` (no traffic lights); keeps interactive type-"help" behavior; prompt `miii@portfolio:~$`.
- CTA buttons stay (View All Projects / Get In Touch).

### Section headings

- Become mono code comments: `// Experience`, `// Work`, etc. (comment gray, keyword-colored `//`).

### Section frames

- Cards keep border/rounded-sm chrome; header rows get a tiny file-chip (e.g. `experience.ts`).
- Education/Achievements: accordion behavior kept, rows styled as editor tree view (chevron + filename; expanded content indented).
- Projects: coverflow carousel kept; cards get mini tab header (`projects/rikugan.tsx`) + mono tag chips; body reads like code comments.
- Skills: chips color-coded by domain using syntax palette (AI/ML = function purple, Frontend = string blue, Tools = type orange); GitHub stats card gets editor frame.
- Typography: prose sans; chrome/headings/labels/code mono.

### Contact

- Editor window form card: tab bar `contact.ts` + decorative close ✕ (no traffic lights).
- Fields keep `> name`, `> subject`, `> message` prompt labels; flat inputs; accent-blue focus border; Send message button (send icon, Formspree unchanged).
- Below window: email link + social links row; copyright line styled as code comment: `// © 2026 Ahmad Syahmi`.

## Removals

- Traffic lights everywhere (MiniTerminal, About, contact).
- Island navbar shrink/rounded pill behavior.
- SideStepper + mobile bottom dot bar.
- `shadow-glow-dot` motif (replaced by cursor-block motif).
- Terminal-window chrome in About (becomes editor window / code card).

## Kept

- Carousel + MobileCardStack behavior (incl. one-way sync fix).
- Accordion behavior (Education/Achievements).
- ContactModal + ContactForm logic (Formspree, validation, `>` labels).
- LazyImage, eager hero profile image, scroll-to-top on reload.
- Theme toggle (now toggles IDE palettes).

## Personality touches

- Status bar `Ln x, Col y` values.
- Tab hover reveals decorative ✕.
- Hero code window blinking block cursor.
- `// TODO: hire me` easter egg in contact file block.

## Components

New: `StatusBar.tsx`, `FileExplorer.tsx` (desktop rail; mobile rendered inside Navbar dropdown).
Rewritten chrome: `Navbar.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `ExperienceSection.tsx`, `EducationSection.tsx`, `AchievementsSection.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx` + `ProjectCard.tsx`, `ContactFooter.tsx` + `ContactForm.tsx`, `MiniTerminal.tsx`, `GitHubStats.tsx`.
Removed: `SideStepper.tsx`.
Tokens: `index.css` `@theme` + `.light` block.

## Out of scope

- No new backend/interactivity (form still Formspree; no real editor).
- No changes to content/data (experience, projects, education entries unchanged).
- No perf/framework changes.

## Acceptance criteria

- No traffic lights or island navbar anywhere.
- Status bar + explorer present on desktop; mobile has hamburger file list.
- Syntax colors visible in hero/about/projects; light mode renders a clean GitHub-light palette.
- Existing behaviors (carousel swipe, accordions, terminal help, form submit, modal) unchanged.
- Build + lint pass.
