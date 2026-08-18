# Task 3 Brief: Cut IDE chrome, rewrite Hero

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** f32b67e

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 3.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Hero" section.

## Scope

1. `git rm` the five dead components:
   - `src/components/MiniTerminal.tsx`
   - `src/components/GitHubStats.tsx`
   - `src/components/StatusBar.tsx`
   - `src/components/FileExplorer.tsx`
   - `src/components/ContactModal.tsx`
2. Update `src/App.tsx` — remove the `FileExplorer` and `StatusBar` imports and JSX (exact diff in the plan Task 3).
3. Replace `src/components/HeroSection.tsx` with the plan's full literal (hero = big name miii**dev**, tagline, two pill CTAs, profile image in a bento card, no editor window, no terminal).

## Critical dependencies (from the plan literal)

- The Hero literal uses `<LazyImage src="/portfolio/assets/profile-image.jpeg" ...>` — verify the asset exists at `public/assets/profile-image.jpeg`; if it does NOT exist, STOP and report BLOCKED (do not invent another asset name).
- The literal uses tokens from Task 1: `text-accent`, `bg-accent`, `text-canvas`, `border-edge`, `bg-surface`, `bg-elevated`, `text-muted`, `text-copy`, `card-shadow`.
- New accent cycle chips (`text-accent-2 bg-accent-2/10` etc.) — tokens added in Task 1.

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH must exit 0.
- Grep gate (PowerShell, use Get-ChildItem + Select-String since -Recurse on -Path doesn't bind in PS 5.1):
  `Get-ChildItem src -Recurse -File | Select-String -Pattern "portfolio:contact|ContactModal|MiniTerminal|GitHubStats|StatusBar|FileExplorer"` → zero matches.
- No code comments; no em dashes/emojis; min-h-11 targets; no backdrop-blur; `aria-label` on nav/hero elements where literal specifies.
- Do NOT push.

## Do

1. Apply all changes per the plan literals.
2. Run build + lint (both exit 0) + the grep gate.
3. Commit with message: `feat: hero without editor chrome, cut terminal and stats`

## Report back

Write the full report to `.superpowers/sdd/bento/task-3-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.