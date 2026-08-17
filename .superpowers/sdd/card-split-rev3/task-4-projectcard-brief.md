# Brief: Rev 3 Task 4 — ProjectCard stacked restructure

**Run:** card-split-rev3 · **Date:** 2026-08-18 · **Status:** in progress

**Spec:** docs/superpowers/specs/2026-08-17-project-card-split-pane-design.md — "Rev 3 — Stacked Card + Editor Frame" section.
**Plan:** docs/superpowers/plans/2026-08-17-project-card-split-pane.md — Task 4 (full-file literal provided there).

## Scope

Replace the body of `src/components/ProjectCard.tsx` below the tab bar with the **vertical stacked layout**: full-width `aspect-video` (16:9) screenshot on top, README content below (`// title`, description comment, 4-color tag chips, Code/Demo links pinned bottom). Remove the Preview mini-tab, the decorative URL bar (`localhost:5173/...`), the `sm:grid-cols-2` split, and pane divider borders. Keep the tab bar, fallback placeholder (now also `aspect-video`), root classes, and the `isCenter` accent-border behavior exactly as-is.

The exact replacement file content is in the plan (Task 4, Step 1). Use it verbatim.

## Constraints

- Signature unchanged: `{ project: Project; isCenter?: boolean }`.
- No new dependencies; no data shape changes; no test framework — verify with `npm run build` + `npm run lint` (both must exit 0).
- No comments in code; no em dashes/emojis in UI copy; decorative text keeps `aria-hidden`.
- Windows PowerShell: use `Select-String` if grepping (no `rg`).

## Do

1. Replace the file per the plan literal.
2. Run `npm run build; npm run lint` — both must exit 0.
3. Commit ONLY `src/components/ProjectCard.tsx` with message:
   `feat: stack project card - full-width 16:9 shot above readme`
4. Do NOT touch ProjectsSection.tsx (a parallel agent handles it). Do NOT push.

## Report back

- Commit hash, build/lint results, any deviation from the literal.