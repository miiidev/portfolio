# Portfolio Standout — Design Spec

Date: 2026-08-16
Status: Approved (awaiting implementation plan)

## Context

The portfolio (React 19 + Vite + TypeScript + Tailwind 4 + Framer Motion, deployed to GitHub Pages) currently has: Hero with typing effect and parallax photo, flat skills grid, 3D project carousel, Formspree contact form, theme toggle, particles, side/bottom steppers.

Goal: make it stand out for a **mixed audience — job applications and personal brand** — using only content the owner actually has. Available material: current Java tutoring gig, 3rd place in a state-level Android app competition (2023), and 3 shipped projects (autoteambuild, rikugan, LAWCATOR). No impact numbers, no writing samples, no resume file.

Approach chosen: **C — Combined**: "Proof of Work" foundation (About, Timeline, live GitHub stats, domain-grouped skills) plus one interactive element (mini terminal in the hero).

## Architecture

New components under `src/components/`:

- `AboutSection.tsx` — story + stats strip, between Hero and Skills
- `TimelineSection.tsx` — achievement timeline
- `GitHubStats.tsx` — live stats card (rendered inside About)
- `MiniTerminal.tsx` — interactive terminal card in the hero
- `SectionHeading.tsx` — shared numbered heading (only if reuse justifies it; otherwise inline the heading as the other sections do)

New page order: Hero (with terminal) → About (story + GitHub stats) → Skills → Timeline → Projects → Contact.

Navbar/steppers: `#about` link already exists; add `#timeline` entry to `SideStepper.tsx` sections array and Navbar link.

## Data model (`src/data.ts`)

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

Grouped cards: group headers + skill items, same hover-glow card style. No proficiency bars.

## Error handling

- GitHub API: try/catch on both fetches; either failure → static fallback card.
- Terminal: unknown command → typed "command not found" message; empty input → no-op.
- Images: reuse existing `LazyImage`.

## Testing & verification

- `npm run build` (tsc -b && vite build) passes.
- `npm run lint` passes.
- Manual checks: all terminal commands work; GitHub stats render and fallback renders when offline; timeline/skills responsive at mobile widths; dark and light themes both correct.
- No automated test framework exists in the project; keep parity (no new test infra).

## Non-goals (YAGNI)

No blog, no resume PDF, no SEO/meta overhaul, no project detail modals, no proficiency bars, no testimonials. Future iterations once more content exists.
