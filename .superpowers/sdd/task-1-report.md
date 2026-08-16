# Task 1 Report: IDE color tokens in index.css

## Status: DONE_WITH_CONCERNS

## What changed

Replaced `src/index.css` (whole file) with the exact CSS from `.superpowers/sdd/task-1-brief.md`:

- `@theme` tokens replaced with GitHub dark palette: `canvas/surface/elevated/copy/muted/dim/edge/edge-hover/nav-edge/inverse/inverse-copy/danger/accent` + syntax tokens `code-keyword/code-string/code-function/code-type/code-comment/code-const`.
- `--shadow-glow-dot` token removed (both dark and light).
- `.light` block overrides with GitHub light palette.
- Added `@keyframes cursor-blink` and `.cursor-block` blink utility.
- Kept `--breakpoint-xs: 25rem`, `html`/`body` overflow rules, and `prefers-reduced-motion` media query.
- Removed the old `.light .skill-icon-base` filter rule (not in the brief's replacement; assumes replaced by later tasks' handling).

No comments added; file written verbatim from the brief (brief's CSS contains no comments).

## Step 2: shadow-glow-dot grep

Used `Get-ChildItem -Recurse src -File | Select-String -Pattern "shadow-glow-dot"` (rg unavailable check: used Select-String instead).

Result: **2 matches found** — both class usages in `src/components/SideStepper.tsx`:

- Line 46: `activeSection === i ? 'bg-inverse shadow-glow-dot' : 'bg-dim hover:bg-muted'`
- Line 71: `activeSection === i ? 'bg-inverse shadow-glow-dot scale-125' : 'bg-dim hover:bg-muted'`

Per dispatch constraints, I did NOT edit SideStepper.tsx (it is deleted in Task 3; the `shadow-glow-dot` class no longer exists as a token, so these usages are inert until then). All other files are clean.

## Step 3: Verify

`npm run build; npm run lint` — both exited 0.

Build output (last lines):

```
dist/index.html                   0.52 kB │ gzip:   0.33 kB
dist/assets/index-nws-0NU9.css   37.07 kB │ gzip:   7.09 kB
dist/assets/index-oBNBE2W4.js   373.86 kB │ gzip: 115.87 kB
✓ built in 473ms
```

Lint output: `eslint .` — no errors, no warnings (clean exit 0).

## Commit

`28da41f` — `feat: IDE theme color tokens (GitHub dark/light palettes)` (1 file changed, 45 insertions(+), 29 deletions(-)).

Note: git warned LF will be replaced by CRLF on next touch (repo line-ending config; cosmetic only).

## Concerns

1. Two `shadow-glow-dot` class references remain in `src/components/SideStepper.tsx` (lines 46, 71). Since the token is removed, these classes are undefined; SideStepper is deleted in Task 3 per the plan, so no action taken here per task constraints. If SideStepper is NOT deleted in Task 3, these must be cleaned up.
2. The removed `.light .skill-icon-base` rule (skill icon inversion) may need an equivalent treatment in a later task if the skill icon styling relies on it.

## Fix round 1

**What changed:** Re-added the pre-existing light-mode skill icon inversion rule to `src/index.css`, placed after the `.cursor-block` block and before the `prefers-reduced-motion` media query:

```css
/* Skill icon inversion for light mode */
.light .skill-icon-base {
  filter: invert(1);
}
```

**Build/lint:** `npm run build; npm run lint` — both exited 0. Build last lines:

```
dist/index.html                   0.52 kB │ gzip:   0.32 kB
dist/assets/index-BTuYZ-fo.css   37.11 kB │ gzip:   7.11 kB
dist/assets/index-BeaRY57j.js   373.86 kB │ gzip: 115.87 kB
✓ built in 175ms
```

Lint: `eslint .` — no errors, no warnings (exit 0).

**Commit:** `e05e23d` — `fix: restore light-mode skill icon inversion` (1 file changed, 5 insertions(+)).