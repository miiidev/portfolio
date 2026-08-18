# Task 1 Brief: Bento tokens + layout foundation

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** b16f406

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 1.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Tokens" section.

## Scope

Two file changes, exactly as specified in the plan Task 1:

1. `src/index.css` — full replace with the bento token set (dark default + `.light` overrides + `--color-accent-2/3/4` + `.card-shadow` utility; removed: code-* tokens, `--color-nav-edge`, `cursor-block` keyframes/class, `.light .skill-icon-base` rule). The literal is in the plan — copy verbatim.
2. `src/App.tsx` — change ONLY the `<main>` className line to `px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden pb-28 md:pb-12`. All imports and JSX stay as-is (Navbar/FileExplorer/StatusBar removal happens in later tasks).

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH must exit 0 (no test framework exists).
- Windows PowerShell: use `Select-String` if grepping (no `rg`).
- No code comments; no em dashes/emojis in UI copy.
- Do NOT touch any other file. Do NOT push.

## Do

1. Apply both changes per the plan literals.
2. Run `npm run build; npm run lint` — both must exit 0.
3. Commit with message: `feat: bento tokens and layout foundation`

## Report back

Write the full report to `.superpowers/sdd/bento/task-1-report.md`: commit hash, build/lint results, any deviation. Reply here with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.