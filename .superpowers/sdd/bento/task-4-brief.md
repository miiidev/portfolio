# Task 4 Brief: SectionHeading + About + Skills rewrite

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** 5f0a35a

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 4.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "About", "Skills", "Section headings".

## Scope — full-file literals from the plan Task 4 (copy verbatim)

1. `src/components/SectionHeading.tsx` — **signature change**: props become `{ children: string }` (the `file` prop is GONE). Small eyebrow chip + title.
2. `src/components/AboutSection.tsx` — bento about: stacked cards grid, chips row, bio card. NO code-* token classes (they no longer exist).
3. `src/components/SkillsSection.tsx` — bento skills: 3-col bento grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), accentCycle chips (text-accent-2/3/4 variants), per-skill `bg-surface` cards.

## Call sites (SectionHeading is used by MANY components)

The plan Task 4 includes the exact per-file call-site fixes. All sections using `<SectionHeading file=...>` must switch to `<SectionHeading>{...}</SectionHeading>` — call sites in files NOT yet rewritten by later tasks (Task 5: Experience/Education/Achievements; Task 6: ProjectsSection; Task 7: ContactFooter) still exist in OLD form and WILL break the build if their `file` prop is left — the plan lists each fix. Apply every call-site fix listed in the plan Task 4 (each is a one-line change in its respective file). The full rewrites of those files happen in Tasks 5-7; only the heading call site changes now.

Do NOT touch files beyond: SectionHeading, AboutSection, SkillsSection, plus the call-site one-liners the plan lists.

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH exit 0.
- Grep gate (PS 5.1): `Get-ChildItem src -Recurse -File | Select-String -Pattern "file=|text-code-|skill-icon"` → zero matches.
- No code comments; no em dashes/emojis; min-h-11; no backdrop-blur; viewport-once reveals.
- Do NOT push.

## Do

1. Apply all literals + call-site fixes.
2. Run build + lint + grep gate.
3. Commit with message: `feat: bento about and skills sections`

## Report back

Write the full report to `.superpowers/sdd/bento/task-4-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.