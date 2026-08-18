# Task 5 Brief: Experience + Education + Achievements rewrite

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** 355ebc9

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 5.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Experience", "Education", "Achievements" sections.

## Scope — full-file literals from the plan Task 5 (copy verbatim)

1. `src/components/ExperienceSection.tsx` — bento experience: stacked card rows, company avatar chips, job chips with accent-2/3 cycle, openIndex accordion behavior retained (existing local state pattern).
2. `src/components/EducationSection.tsx` — bento education: `md:grid-cols-2` card grid, chip rows.
3. `src/components/AchievementsSection.tsx` — bento achievements: 4-column badge card grid, colored accent chips per badge.

All three literals keep the existing local-state patterns (openIndex/accordion in Experience, hover tilt in Achievements) but with bento styling. NO `text-code-*` classes anywhere (they were removed in Task 1).

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH exit 0.
- Grep gate (PS 5.1): `Get-ChildItem src -Recurse -File | Select-String -Pattern "text-code-"` → residuals ONLY in Task 6-7 owned files (ProjectCard, ContactFooter, ContactForm, BackToTop, ProjectsSection); ZERO in ExperienceSection/EducationSection/AchievementsSection.
- No code comments; no em dashes/emojis; min-h-11; no backdrop-blur; viewport-once reveals.
- Do NOT touch other files. Do NOT push.

## Do

1. Apply the three literals.
2. Run build + lint + grep gate.
3. Commit with message: `feat: bento experience education achievements`

## Report back

Write the full report to `.superpowers/sdd/bento/task-5-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.