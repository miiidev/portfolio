# Task 2 Brief: Bento NavBar — bottom pill bar (mobile) + top pills (desktop)

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** 150ad53

**Plan:** docs/superpowers/plans/2026-08-18-bento-redesign.md — Task 2.
**Spec:** docs/superpowers/specs/2026-08-18-bento-redesign-design.md — "Navigation" section.

## Scope

1. Create `src/components/NavBar.tsx` — copy the full literal from the plan Task 2 verbatim.
2. Delete `src/components/Navbar.tsx` via `git rm`.
3. Update `src/App.tsx`:
   - `import Navbar from './components/Navbar';` → `import NavBar from './components/NavBar';`
   - JSX `<Navbar />` → `<NavBar />`

## Behavior (from the plan literal — do not invent)

- Nav items: Work (#work), Skills (#skills), About (#about), Talk (#contact).
- Mobile `<md`: fixed bottom pill bar, always visible, 5 slots (logo "miiidev" + 4 items), `divide-x divide-edge`, backdrop `bg-canvas/85`.
- Desktop `md+`: sticky top pill bar, right-aligned pill group, small logo left, `ThemeToggle` hidden at the end of the pill group on md.
- Active section from `useActiveSection()` hook (existing, unchanged).
- Aria: `aria-current="page"` on the active anchor; `aria-label="Primary navigation"`.
- `MotionConfig reducedMotion="user"` wrapper + viewport-once reveal via `whileInView`.

## Constraints

- Verification gate: `npm run build; npm run lint` — BOTH must exit 0.
- Windows PowerShell: `Select-String`, no `rg`.
- No code comments; no em dashes/emojis in UI copy; min 44px touch targets (`min-h-11`); no backdrop-blur.
- Do NOT push.

## Do

1. Apply all three changes.
2. Run `npm run build; npm run lint` — both exit 0.
3. Commit with message: `feat: bento nav - bottom bar mobile, top pills desktop`

## Report back

Write the full report to `.superpowers/sdd/bento/task-2-report.md`. Reply with: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), commit hash, one-line verification summary, concerns if any.