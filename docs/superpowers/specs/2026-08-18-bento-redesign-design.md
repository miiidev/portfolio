# Bento Redesign — miii.dev Portfolio

Date: 2026-08-18
Status: Draft (user-approved design summary; pending spec review)

## Goal

Replace the IDE/editor theme with a **playful, bold bento** look, designed mobile-first with light and dark variants (existing toggle kept). Cut all editor chrome (windows, tab bars, file names, status bar, file explorer, cursor blink, terminal, GitHub stats card). Keep all sections and the projects carousel (restyled).

## Revision History

- Rev 1 (2026-08-18): initial design approval.

## Design Decisions (user-validated)

- Concept: **Bento blocks** — rounded cards (`rounded-2xl`), soft shadows, sticker chips, orange primary accent.
- Base tone: **both** — light cream + dark charcoal via the existing theme toggle.
- Mobile navigation: **floating bottom pill bar** (4 items: Work / Skills / About / Talk), always visible, below `md` only.
- Desktop navigation: **top pill bar** (name left, same 4 pills right).
- Cut: MiniTerminal, GitHubStats card, all editor chrome (editor windows, tab bars, file names, `cursor-block`, FileExplorer sidebar, StatusBar, editor frame around the carousel).
- Keep: all sections and their content; projects carousel geometry (spotlight 680px + edge peeks, MobileCardStack for ≤768px); scroll-spy; ThemeToggle; BackToTop; motion diet (44px touch targets, no backdrop-blur, no em dashes/emojis, viewport-once reveals, `MotionConfig reducedMotion="user"`); `portfolio:project` event contract.

## Tokens (CSS variables in src/index.css)

Replace the IDE token set. Keep the same variable names so existing components migrate without renaming:

| Token | Light | Dark |
|---|---|---|
| `--color-canvas` (page base) | `#FFF8F0` | `#141414` |
| `--color-surface` (card) | `#FFFFFF` | `#1E1E1E` |
| `--color-elevated` (hover/raised) | `#F7F0E4` | `#262626` |
| `--color-copy` (ink) | `#171717` | `#F5F5F4` |
| `--color-muted` | `#6B6B6B` | `#9A9A9A` |
| `--color-dim` | `#9C948A` | `#6E6E6E` |
| `--color-edge` (borders) | `#EFE4D4` | `#2E2E2E` |
| `--color-edge-hover` | `#171717` | `#F5F5F4` |
| `--color-accent` (primary) | `#FF6B35` | `#FF6B35` |
| `--color-danger` | `#D94F1D` | `#FF8A5C` |

New token: `--color-accent-2` `#FFB703` (yellow), `--color-accent-3` `#4D7CFF` (blue), `--color-accent-4` `#00A88E` (teal) — same in both themes; used for skill chips and sticker labels.

`--color-nav-edge` obsolete (no fixed navbar border); `--color-nav-edge`/`--color-nav-canvas` removed or repurposed. The `.light` class mechanism and `.dark` default stay unchanged. `.cursor-block` animation removed.

Shadows: cards use `shadow-[0_3px_10px_rgba(0,0,0,0.07)]` (light) / `shadow-[0_3px_12px_rgba(0,0,0,0.35)]` (dark) — via a `.card` utility class or inline Tailwind shadow tokens; decide at implementation.

Fonts: keep existing font stack; headings use font-extrabold with tight tracking (`tracking-tight`), name hero `text-5xl sm:text-6xl lg:text-7xl`.

## Navigation

### Mobile bottom bar (< md)

- Fixed bottom, centered, `max-w-sm` floating pill: `rounded-full bg-surface border border-edge shadow-lg`, 4 items with icon + label, `min-h-11` tap targets.
- Active item (scroll-spy, existing `useActiveSection`): accent text + accent tint background.
- Always visible (simple, predictable; no scroll-direction hide logic).

### Desktop top bar (≥ md)

- `sticky top-0 z-50`, page base background (no blur — motion diet), name left (`miiidev`, bold, `text-copy`), 4 pills right (`Work Skills About Talk`) + ThemeToggle.
- Pills: `rounded-full px-4 py-2 min-h-11` hover accent tint; active accent.
- Scroll-spy drives the active pill (same `useActiveSection` hook).

## Sections

### Hero

- Big name: `Hey, I'm miii**dev**` (accent on `dev`), tagline line, `Say hello` pill CTA (accent bg, ink text, `min-h-11`, scrolls to contact). 
- No editor window, no terminal, no code decorations.
- Full-height (`min-h-[calc(100vh-...)]`) centered column; desktop: larger type, max-w-6xl.

### About

- One rounded-2xl card: short bio paragraphs, quick facts (role, location), social chips (GitHub / Email / WhatsApp as pill links).
- Desktop: card max-w-3xl centered (content unchanged).

### Experience / Education / Achievements

- Each section: heading (`SectionHeading` component restyled — bold display, sticker label; content structure unchanged) + rows of rounded-2xl cards with soft shadow.
- Experience: per-item card (title, org, period, bullets). Education: card(s) with degree/school/years + details. Achievements: cards with title/description. Existing accordion patterns kept where present (Education/Achievements currently use tree accordions — restyle the tree as stacked cards with chevron headers, same expand/collapse behavior).
- Desktop: experience items `md:grid md:grid-cols-2 gap-6`; education/achievements single column max-w-3xl.

### Skills

- Domain groups as cards; chips per skill in `rounded-full` with the 4-accent cycle (`accent` orange, `accent-2` yellow, `accent-3` blue, `accent-4` teal), `bg-[accent-tint]` at 12% tint + colored text.
- Desktop: `md:grid md:grid-cols-2 lg:grid-cols-3` cards.

### Projects (Work)

- Carousel restyle only: cards become `rounded-2xl bg-surface shadow` with `border-accent` (orange, full) on the active card; tag chips → colored pill chips (same 4-accent cycle); screenshot full-width natural aspect on top (no crop, current behavior), content below; arrow buttons `rounded-full bg-surface border border-edge shadow min-h-11 min-w-11`.
- Geometry unchanged: 680px center, offsets 100/300, scale 1/0.9/0.78, opacity 1/0.4/0, `pointer-events: none` non-center, drag/swipe, `portfolio:project`.
- Mobile (≤768px): MobileCardStack unchanged structure, restyled cards.
- **No editor frame** (breadcrumb/gutter/status removed — deleted with the rest of the chrome).

### Contact

- One rounded-2xl card: heading, email/WhatsApp/GitHub pill links (large `min-h-11`), no editor window.

## Removed Components

- `MiniTerminal.tsx` — delete component + its `portfolio:project` dispatch stays ONLY in... wait, the dispatch lives in MiniTerminal. Removing the terminal removes the terminal's ability to jump to projects. The event contract `portfolio:project` is kept (no other senders needed); ProjectsSection listener stays (harmless).
- `GitHubStats.tsx` — delete (plus `fetchGitHubStats` cache code — it lives inside GitHubStats.tsx; remove with it).
- `StatusBar.tsx` — delete.
- `FileExplorer.tsx` — delete.
- `EditorFrame` chrome in ProjectsSection — remove breadcrumb/gutter/status wrappers, restore `mt-8`→`mt-2`? Keep spacing consistent per new design (heading-to-content gap `mt-6`).
- `cursor-block` CSS animation — remove from index.css.
- Navbar menu-bar tabs + `activeFile` scroll-spy text — replaced by top pill bar (desktop) / bottom bar (mobile).

## Architecture

- `App.tsx`: remove StatusBar, FileExplorer, MiniTerminal imports; layout becomes `<div class="bg-canvas text-copy min-h-screen">` + `<main class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-24 md:pb-12">` (pb-24 clears the bottom bar on mobile). ThemeToggle moves into the nav bar (shared by desktop pills and mobile bar).
- New `NavBar.tsx` (replaces Navbar.tsx): renders top pill bar ≥ md, bottom pill bar < md; both use the same `items` array (`Work Skills About Talk` → section ids `work skills achievements? ...`). Map: Work→#work, Skills→#skills, About→#about, Talk→#contact. Active state from `useActiveSection`.
- MobileCardStack keeps structure; card styling updated with the new tokens.
- SectionHeading restyled (bold display + sticker label), same props.
- `useActiveSection` unchanged. `fadeRightConfig`/animations unchanged.

## Motion Diet (unchanged)

- 44px minimum touch targets (`min-h-11`).
- No backdrop-blur anywhere.
- No em dashes; no emojis in UI copy.
- Viewport-once reveals; `MotionConfig reducedMotion="user"`.
- Max `rounded-2xl` on cards (chips/pills stay `rounded-full`).

## Desktop Acceptance (explicit, per user concern)

1. ≥ `md`: top pill nav visible, bottom bar hidden; sticky top.
2. Cards grid out (2-col md, 3-col lg) without overflowing; content max-w-6xl centered.
3. Carousel: 680px center spotlight + peeks render as before, arrows round and ≥ 44px, no editor frame.
4. Hero type scales up (lg:text-7xl); page remains balanced (no giant empty areas).
5. ≤768px: bottom bar works, no horizontal scroll anywhere, touch targets ≥ 44px.

## Acceptance Criteria

1. Light + dark toggle works across the whole site with the new tokens; no IDE leftovers (no `miii.ts`, `projects/{title}.tsx` tab strings, `TERMINAL`, `github-stats.ts`, status bar, file explorer, editor frame).
2. All 8 sections present with existing content (hero, about, experience, education, achievements, skills, work, contact).
3. Projects carousel: geometry + behavior unchanged; restyled cards; mobile stack restyled.
4. Nav: bottom bar < md, top pills ≥ md, active states follow scroll-spy, theme toggle accessible on both.
5. Motion diet respected; no new dependencies; `Project`/`personalInfo` data shapes untouched.
6. `npm run build` and `npm run lint` both exit 0.

## Out of Scope

- No data changes.
- No new dependencies.
- No changes to content text (except removing terminal/stats-driven copy).
- The `portfolio:project` event was only ever sent by MiniTerminal. With the terminal deleted, remove the listener + `scrollIntoView` handler in ProjectsSection and the dispatch contract entirely (the event is gone from the codebase).
