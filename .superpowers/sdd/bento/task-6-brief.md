# Task 6 Brief: Projects — bento cards, carousel, no frame

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** 790e63a

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 6.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Projects" section.

## Scope

1. `src/components/ProjectCard.tsx` — full replace with the plan's Task 6 literal (bento card: `rounded-2xl overflow-hidden card-shadow`, image at natural aspect via `imgClassName="w-full !h-auto object-cover"`, no editor frame, no breadcrumb, no `file=` anywhere, `portfolio:project` listener REMOVED, accent chips, `rounded-full` buttons with min-h-11).
2. `src/components/ProjectsSection.tsx` — full replace with the plan's literal: keep the ENTIRE carousel geometry unchanged (680px active center card, offset 100/60, farOffset 300/100, scale 1/0.9/0.78, opacities 1/0.4/0, pointer-events none on non-active, spring 250/28/0.8, MobileCardStack ≤768px); heading uses new `{ children: string }` form; frame/terminal chrome gone.
3. `src/components/MobileCardStack.tsx` — one class change per the plan.

## Critical geometry constraint (from the spec — do not alter)

The carousel measures, offsets, scales, opacities, spring config, and the 680px active card width are binding. The desktop layout (`lg:grid-cols-3`) and mobile stack renderer stay as-is except where the plan literal explicitly changes them. ONLY copy the plan's ProjectCard.tsx + ProjectsSection.tsx literals and MobileCardStack's one-line class change.

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH exit 0.
- Grep gate (PS 5.1): `Get-ChildItem src -Recurse -File | Select-String -Pattern "portfolio:project|breadcrumb|Ln 1|utf-8|sm:grid-cols-2"` → zero matches. (`md:grid-cols-2` in Skills/Experience is intended; the old split was `sm:grid-cols-2`.)
- No code comments; no em dashes/emojis; min-h-11; no backdrop-blur; viewport-once reveals.
- Do NOT touch other files (ContactFooter/ContactForm/BackToTop are Task 7). Do NOT push.

## Do

1. Apply the three changes.
2. Run build + lint + grep gate.
3. Commit with message: `feat: bento project cards without editor frame`

## Report back

Write the full report to `.superpowers/sdd/bento/task-6-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.