# Brief: Rev 3 Task 5 — Editor frame around the desktop carousel

**Run:** card-split-rev3 · **Date:** 2026-08-18 · **Status:** in progress

**Spec:** docs/superpowers/specs/2026-08-17-project-card-split-pane-design.md — "Editor Frame (ProjectsSection, desktop carousel only)".
**Plan:** docs/superpowers/plans/2026-08-17-project-card-split-pane.md — Task 5 (structural, explicit offsets).

## Scope

In `src/components/ProjectsSection.tsx`, wrap the **desktop carousel only** (the `isMobile ? <MobileCardStack/> : ...` branch already splits mobile/desktop — the desktop branch is what gets framed; MobileCardStack path must stay untouched) in editor chrome visible **md+ only**:

- Outer wrapper: `hidden md:block border border-edge rounded-md overflow-hidden relative`.
- Breadcrumb bar (top): `work` (text-dim) `/` `projects.tsx` (text-muted) + right-aligned `● main` (text-dim). font-mono text-[10px], `border-b border-edge`, `bg-elevated/40`.
- Carousel host keeps `overflow-clip` + `min-h-[560px]`; add `left-7`/`pl-7` (or equivalent) so cards center right of the gutter.
- Gutter (absolute, left, full height, w-7): static numbers `1..12`, `border-r border-edge`, `bg-canvas`, `text-edge`, font-mono text-[10px].
- Left arrow: move to `left-11` (44px) — clear of the 28px gutter. Right arrow: unchanged (`right-3`).
- Status line (bottom): `Ln 1, Col 7` (left) / `3 projects` (center) / `utf-8` (right). font-mono text-[10px], `border-t border-edge`, `bg-elevated/40`.
- ALL chrome is decorative: `aria-hidden="true"`. No new interactive elements.

Read the existing file first; nest the existing desktop carousel markup inside the frame, adjust the arrow offsets, add chrome. Do not change carousel geometry (width 680px, offsets 100/300, scale/opacity, pointer-events, drag/swipe, `portfolio:project` dispatch, spring config).

## Constraints

- No new dependencies; no data shape changes; no test framework — verify with `npm run build` + `npm run lint` (both must exit 0).
- No code comments; no em dashes/emojis in UI copy.
- Windows PowerShell: use `Select-String` if grepping (no `rg`).

## Do

1. Implement per the plan/spec.
2. Run `npm run build; npm run lint` — both must exit 0.
3. Commit ONLY `src/components/ProjectsSection.tsx` with message:
   `feat: editor frame around work carousel`
4. Do NOT touch ProjectCard.tsx (a parallel agent handles it). Do NOT push.

## Report back

- Commit hash, build/lint results, exact classes used for the wrapper/offsets, any deviation.