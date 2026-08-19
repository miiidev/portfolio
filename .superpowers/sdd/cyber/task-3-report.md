# Task 3 Report: Nav mono labels and active glow

## What I implemented

Applied the two class swaps from the brief verbatim to `src/components/NavBar.tsx`:

1. **Desktop nav links** (line 29): replaced `text-sm font-semibold transition-colors` with `font-mono text-sm font-bold transition-all`, and added `shadow-[0_0_16px_var(--color-glow-soft)]` to the active state.
2. **Mobile nav links** (line 54): replaced `text-xs font-bold transition-colors` with `font-mono text-xs font-bold transition-all`, and added the same glow shadow to the active state.

The brand mark "miiidev" and the `items` array were left unchanged.

## What I tested and results

- `npm run build` → exit 0 (tsc + vite build succeeded, 438 modules, dist generated)
- `npm run lint` → exit 0 (eslint clean)
- Grep gate: `Select-String -Path src\components\NavBar.tsx -Pattern "font-mono|shadow-\[0_0_16px_var"`
  - 2 matches for `font-mono` (lines 29, 54)
  - 2 matches for `shadow-[0_0_16px_var(--color-glow-soft)]` (lines 31, 56)

## Files changed

- `src/components/NavBar.tsx` (4 insertions, 4 deletions)

## Commit

- `7c4c212` feat: mono nav labels with active glow

## Self-review findings

- **Completeness:** both class swaps applied verbatim per the brief. ✓
- **Discipline:** no changes outside the brief; no other files touched; `items` array and brand mark unchanged (confirmed via commit diff: 1 file, only the two className blocks). ✓
- **Verification:** build, lint, and grep gate all pass. ✓

## Issues or concerns

- None. (Git warned about LF→CRLF conversion on commit — harmless as noted in the task.)
