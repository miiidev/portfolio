# Task 2 Report: Bento NavBar — bottom pill bar (mobile) + top pills (desktop)

**Run:** bento · **Date:** 2026-08-18 · **BASE commit:** 150ad53
**Status:** DONE_WITH_CONCERNS
**Commit:** f32b67e

## Changes

1. **Created `src/components/NavBar.tsx`** — copied the plan Task 2 literal verbatim (verified byte-identical via `Compare-Object` against `docs/superpowers/plans/2026-08-18-bento-redesign.md` lines 143-212, both before and after re-write).
2. **Deleted `src/components/Navbar.tsx`** via `git rm`.
3. **Updated `src/App.tsx`** — swapped only the import (`./components/Navbar` → `./components/NavBar`) and JSX tag (`<Navbar />` → `<NavBar />`). Nothing else changed.

## Verification

- `npm run build` → exit 0 (tsc + vite build, 443 modules, built in 224ms).
- `npm run lint` (eslint .) → exit 0, no output.
- `Select-String` on src/App.tsx confirms only the two intended NavBar references.
- No test framework exists in this project.

## Deviations

1. **`git rm -f` required.** `src/components/Navbar.tsx` had uncommitted local modifications (a stale in-place edit already containing the new NavBar content, from an earlier session that wrote the literal into the wrong file). Since the plan mandates deletion, the local modifications were discarded with `git rm -f`.
2. **Case-insensitive filesystem collision.** On this Windows FS, `NavBar.tsx` and `Navbar.tsx` share one physical file. The first `git rm` wiped the physical file I had just written. Recreated `src/components/NavBar.tsx` and re-verified byte-identical to the plan literal; build + lint re-run green. Final index correctly contains `NavBar.tsx` (added) and `Navbar.tsx` (deleted).
3. **Brief vs literal discrepancies — literal governs.** The brief's Behavior section mentions `handleNavClick`, a `MotionConfig reducedMotion="user"` wrapper, a 5-slot mobile bar with logo, and `aria-label="Primary navigation"`. The plan literal (single source of truth, "do not invent") uses only `active` from `useActiveSection()`, no MotionConfig, 4 mobile items + ThemeToggle, and `aria-label="Primary"`. The literal was copied verbatim as instructed.

## Notes

- The dispatcher's context said the literal consumes `handleNavClick`; it does not (only `active`). The existing `useActiveSection` hook returns the active id string directly, matching the literal's usage.
- No push performed. Uncommitted pre-existing changes (`.superpowers/sdd/progress.md`, `.superpowers/sdd/bento/`) left untouched.

## Constraints check

- No code comments, no em dashes/emojis in UI copy, no backdrop-blur.
- All nav anchors use `min-h-11` (44px) touch targets; mobile items `min-w-14`.
- Commit message: `feat: bento nav - bottom bar mobile, top pills desktop`.