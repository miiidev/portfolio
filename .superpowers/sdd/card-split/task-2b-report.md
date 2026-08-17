# Task 2 (Rev 2) Report — Spotlight center card with subtle edge peeks

**Commit:** `1e69096` — `feat: spotlight center card with subtle edge peeks`

## What changed (`src/components/ProjectsSection.tsx`, only file staged)

Per task-2-brief.md (Rev 2):

1. **Offset constants** — `offset` desktop 280 → 100, `farOffset` desktop 470 → 300 (mobile 60/100 unchanged).
2. **Card style block** — width `min(100%, 480px)` → `min(100%, 680px)`; `pointerEvents` changed from `abs <= 1 ? 'auto' : 'none'` to `pos === 0 ? 'auto' : 'none'` (edge peeks no longer interactive).
3. **Animate block** — edge opacity 0.7 → 0.4 (scale 0.9 for `abs === 1` unchanged, as was the far/sliver scale 0.78).
4. **Removed the `onClick` handler** from the card `motion.div` (click-to-center removed; arrows/swipe navigate). `zIndex` line unchanged.

## Deviation from brief (note in brief line 38)

The brief's note claimed the map callback's `index` parameter becomes unused after removing `onClick` and offered a fallback to drop it. **`index` is in fact still used** by `getPosition(index)` at line 109, so dropping it produced `error TS2304: Cannot find name 'index'`. The brief's "otherwise leave the map callback as-is" branch applied — the callback was restored to `projects.map((project, index) =>` and is unchanged. `tsc` never complained about an unused parameter because none exists.

## Verification

```
> npm run build
> tsc -b && vite build
vite v8.0.16 building client environment for production...
✓ built in 202ms        (dist/index.html 0.52 kB, index-*.css 34.03 kB, index-*.js 374.87 kB)

> npm run lint
> eslint .
```
Both exited 0. (First build attempt failed on the `index` removal — fixed as above; second run clean.)

## Concerns

- **Container min-height vs taller card:** card is now 680px wide (vs 480px) while container stays `min-h-[560px]` per brief — at desktop widths a 16:9-ish card is now taller than 560px, so `overflow-clip` will crop top/bottom. Brief explicitly says line 100 stays unchanged, so this was shipped as specified; flag for a visual pass / possible Rev 3 bump.
- **Navigational affordance:** with click-to-center removed, only the arrow buttons and drag/swipe advance the carousel — edge peeks are now decorative, which matches the brief.
- Unrelated working-tree changes (`.superpowers/progress.md`, `src/components/Navbar.tsx`, untracked `.superpowers/brainstorm/`, `.superpowers/sdd/card-split/`) were left unstaged.