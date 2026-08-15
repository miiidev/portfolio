# Portfolio Standout — Design Spec

Date: 2026-08-16
Status: Approved with critique fixes (awaiting implementation plan)

## Context

The portfolio (React 19 + Vite + TypeScript + Tailwind 4 + Framer Motion, deployed to GitHub Pages) currently has: Hero with typing effect and parallax photo, flat skills grid, 3D project carousel, Formspree contact form, theme toggle, particles, side/bottom steppers.

A Uizze critique (2026-08-15, score 23/40) found the current design reads as AI-generated (numbered section markers, eyebrow, glow-on-everything, uniform reveals) and carries two P0 issues (dead placeholder social links, zero reduced-motion handling). All critique fixes are folded into this spec.

Goal: make it stand out for a **mixed audience — job applications and personal brand** — using only content the owner actually has. Available material: current Java tutoring gig, 3rd place in a state-level Android app competition (2023), and 3 shipped projects (autoteambuild, rikugan, LAWCATOR). No impact numbers, no writing samples, no resume file.

Approach chosen: **C — Combined**: "Proof of Work" foundation (About, Timeline, live GitHub stats, domain-grouped skills) plus one interactive element (mini terminal in the hero).

## Architecture

New components under `src/components/`:

- `AboutSection.tsx` — story + stats strip, between Hero and Skills
- `TimelineSection.tsx` — achievement timeline
- `GitHubStats.tsx` — live stats card (rendered inside About)
- `MiniTerminal.tsx` — interactive terminal card in the hero
- `SectionHeading.tsx` — shared heading (only if reuse justifies it; otherwise inline the heading as the other sections do). **No numbered markers** (critique ban).

New page order: Hero (with terminal) → About (story + GitHub stats) → Skills → Timeline → Projects → Contact.

Navbar/steppers: `#about` link already exists; add `#timeline` entry to `SideStepper.tsx` sections array and Navbar link.

## Data model (`src/data.ts`)

- **Remove placeholder socials (P0)**: `linkedin` and `x` in `personalInfo.socials` point to `yourusername` URLs. Delete both fields and their conditional rendering blocks.
- **Normalize email**: store the bare address, build `mailto:` at render (currently stored with prefix and stripped — fragile).
- `personalInfo.skills` restructured from flat `Skill[]` to grouped:
  ```ts
  skills: { domain: string; icon: string; items: Skill[] }[]
  ```
  Groups:
  - AI/ML & Data — Python, PyTorch
  - Frontend — React, TypeScript, Tailwind CSS, Next.js, Framer Motion
  - Tools & Backend — Node.js, Git, Vite
- New `timeline: TimelineItem[]`:
  ```ts
  interface TimelineItem {
    year: string;
    title: string;
    org?: string;
    description: string;
    type: 'work' | 'achievement' | 'focus';
  }
  ```
  Entries:
  1. Now — Programming Tutor (work) — teaching Java to beginners
  2. 2023 — 3rd Place, Pertandingan Pembangunan Aplikasi Android (achievement) — built an Android app from scratch in a state-level competition
  3. Current focus — Software & AI Developer (focus) — shipped autoteambuild (RL-powered Pokémon VGC team builder), rikugan (offline deepfake detection), LAWCATOR
- New GitHub fallback stat (static numbers) in case the API fails: 24+ repos, always building.
- Fix placeholder socials: `linkedin` and `x` in `personalInfo.socials` currently point to placeholder URLs — either correct them or remove them.

## Feature behaviors

### About section

Two-column layout matching hero style: left = story text; right = GitHub stats card + quick facts (location, currently tutoring Java, focus areas). Story reframes tutoring as proof of communication/teaching skill.

### Timeline

Vertical line with dots, alternating sides on desktop, stacked on mobile. Three entries per the data model above.

### Live GitHub stats

- Client-side fetch on mount:
  - `GET https://api.github.com/users/miiidev` (repos count, follower count)
  - `GET https://api.github.com/users/miiidev/repos?per_page=100` (top languages computed from repo `language` field, last push date)
- Cache result in `localStorage` with 1h TTL (unauthenticated rate limit is 60 req/hr; 2 calls per load).
- Display: 24+ repos built, top languages, recent activity (last push date). Do NOT lead with star count (currently only 2 stars total — not impressive).
- Fallback: if either fetch fails, render the static fallback card from `data.ts`; single `console.warn`, no broken UI.

### Mini terminal

- Card in the hero; styled input with `>` prompt.
- Autofocus on mount, `Enter` submits, `Esc` blurs, empty input is a no-op.
- Commands:
  - `help` — lists available commands
  - `about` — prints a one-line summary
  - `skills` — lists skill domains
  - `projects` — lists the 3 projects numbered 1-3
  - `contact` — prints contact links (GitHub, email, WhatsApp)
  - `clear` — clears terminal output
  - `1` / `2` / `3` after `projects` — scroll to that specific project card. Mechanism: the terminal dispatches a custom event (`window.dispatchEvent(new CustomEvent('portfolio:project', { detail: index }))`); `ProjectsSection` listens for it, sets `currentIndex`, and scrolls `#work` into view. This avoids lifting state out of `ProjectsSection`.
  - Unknown command → "command not found, try `help`"
- Output is typed line-by-line, matching the existing typing effect style.

### Skills

Grouped cards: group headers + skill items, same card style as the rest of the page after the motion diet (see below). No proficiency bars. Fix the Next.js icon color (`#FFFFFF` makes the hover swap invisible on light surfaces; use a dark-theme-appropriate color or drop the swap for white icons).

## Critique fixes (full motion diet + cleanup)

Folded in from the 2026-08-15 Uizze critique (23/40). All apply to existing components as well as new ones:

**P0 — Remove placeholder socials**: delete `linkedin`/`x` from `data.ts` and their conditional render blocks (done via data model above).

**P0 — Reduced motion**: gate every animation behind `prefers-reduced-motion` via a shared `useMediaQuery('(prefers-reduced-motion: reduce)')` hook: no particles, no typing effect (render full text instantly), no glows, no parallax, no springs (carousel snaps), no pulse cursor. Add CSS fallbacks where applicable. This is a hard requirement, not optional.

**P1 — Kill the glow system**: remove all 5 glow shadow tokens (`--shadow-glow-*`, `--drop-shadow-glow`) from `index.css` and every `shadow-glow-*` / `drop-shadow-glow` / `hover:shadow-glow-*` usage. Remove the Particles component entirely. Remove the cursor-tracking radial spotlight over the portrait (HeroSection mouse handler). Keep exactly one glow: the active stepper dot. Remove `--glow-rgb` machinery if unused afterwards.

**P1 — Kill the template scaffold**:
- Remove numbered markers (`01.` `02.`) from all section headings
- Remove the `HI, MY NAME IS` eyebrow; replace with a concrete fact (e.g. location + availability) or nothing
- Set `viewport={{ once: true }}` on all section reveals; vary choreography per section instead of the identical `containerVariants` stagger everywhere
- The hero typing effect on the role line: remove it (render the role statically). The mini terminal's typed output is the one place typed text stays — it is interactive, user-invoked output, not decoration

**P1 — Hero portrait**: keep the image; remove parallax drift (`imageY`) and the spotlight overlay. Clean photo with LazyImage crossfade only.

**P2 — Contrast (light theme)**: darken `--color-dim` (#a3a3a3 → ≈ #737373 or darker) so muted text and placeholders hit ≥4.5:1 on canvas #fafafa; errors to red-500/600 instead of red-400.

**P2 — Touch targets**: stepper dots ≥44px hit area (visual size can stay small, padding expands the target); nav links and hero buttons ≥44px height.

**P2 — Forms**: add `autocomplete` attributes (`name`, `email`); add `maxlength` where sensible; show per-field errors (currently only the first is shown); error messages specific and in `aria-live` region.

**P2 — Carousel position indicator**: show which of the N projects is active (dots or 1/N counter) in `ProjectsSection`.

**Minor fixes**: LAWCATOR description capitalization + trailing period; `main` `overflow-hidden` clipped effects (revisit after glow removal; keep only if needed); footer: replace boilerplate sign-off with a real close — closing line "Currently open to software & AI roles" + the email CTA, no em-dashes; nav "About" label vs "Tech Stacks" heading mismatch (rename heading or nav link for consistency); `LazyImage` `onError` fallback (show placeholder instead of empty box); clipboard copy try/catch; MobileCardStack random rotation → deterministic layout; single contact path — hero modal is primary, footer links to it via the same custom-event pattern as the terminal (`portfolio:contact`), and the duplicate inline `ContactForm` is removed from the footer.

## Error handling

- GitHub API: try/catch on both fetches; either failure → static fallback card.
- Terminal: unknown command → typed "command not found" message; empty input → no-op.
- Images: reuse existing `LazyImage` with `onError` fallback.

## Testing & verification

- `npm run build` (tsc -b && vite build) passes.
- `npm run lint` passes.
- Manual checks: all terminal commands work; GitHub stats render and fallback renders when offline; timeline/skills responsive at mobile widths; dark and light themes both correct; `prefers-reduced-motion` enabled → no particles, no typing, no glows, carousel snaps; all touch targets ≥44px; contrast spot-checks in light theme.
- No automated test framework exists in the project; keep parity (no new test infra).

## Non-goals (YAGNI)

No blog, no resume PDF, no SEO/meta overhaul, no project detail modals, no proficiency bars, no testimonials. No new glow/particle effects of any kind (the motion diet applies to new sections too). Future iterations once more content exists.
