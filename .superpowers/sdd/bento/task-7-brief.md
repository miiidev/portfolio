# Task 7 Brief: Contact + BackToTop rewrite

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** e573649

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 7.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Contact", "Back to top".

## Scope

1. `src/components/ContactFooter.tsx` — full replace with the plan's Task 7 literal (bento contact: `grid-cols-1 md:grid-cols-2` cards, `rounded-full` submit button `bg-accent text-canvas`, link cards with `rounded-2xl` + accent chips, NO text-code-* classes, SectionHeading in `{ children: string }` form).
2. `src/components/ContactForm.tsx` — targeted edits per the plan (NOT a full rewrite):
   - Labels: `&gt; name` → `Name`, `&gt; subject` → `Subject`, `&gt; message` → `Message`
   - Submit button (line 147): `rounded-md bg-inverse text-inverse-copy` → `rounded-full bg-accent text-canvas`
   - Form tag (line 73): `className="space-y-4 font-mono text-sm"` → `className="space-y-4 text-sm"`
3. `src/components/BackToTop.tsx` — targeted edits per the plan: `bg-inverse text-inverse-copy rounded-md` → `bg-accent text-canvas rounded-full`.

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH exit 0.
- Grep gate (PS 5.1): `Get-ChildItem src -Recurse -File | Select-String -Pattern "TODO: hire me|contact\.ts|bg-inverse|rounded-md|font-mono|&gt;"` → zero matches. (This also cleans the last of the Task 4-6 residuals: text-code-* in ContactFooter/ContactForm.)
- No code comments; no em dashes/emojis; min-h-11; no backdrop-blur; viewport-once reveals.
- Do NOT touch other files. Do NOT push.

## Do

1. Apply the three changes per the plan.
2. Run build + lint + grep gate.
3. Commit with message: `feat: bento contact footer and back to top`

## Report back

Write the full report to `.superpowers/sdd/bento/task-7-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.