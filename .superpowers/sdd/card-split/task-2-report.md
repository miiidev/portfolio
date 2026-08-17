# Task 2 Report: Carousel geometry for the wider card

**Status:** Complete
**Commit:** `b8b7309` — `feat: widen carousel cards and adjust offsets for split panes`

## What changed

Four literal swaps in `src/components/ProjectsSection.tsx` (only file staged):

| Location | Before | After |
|----------|--------|-------|
| Line 32 (`offset`) | `isMobile ? 60 : 260` | `isMobile ? 60 : 280` |
| Line 33 (`farOffset`) | `isMobile ? 100 : 420` | `isMobile ? 100 : 470` |
| Line 100 (container) | `min-h-[550px]` | `min-h-[560px]` |
| Line 119 (card width) | `min(100%, 420px)` | `min(100%, 480px)` |

Mobile values untouched. Component contract unchanged.

## Verification

```
> npm run build
> tsc -b && vite build
vite v8.0.16 building client environment for production...
✓ built in 203ms
exit 0

> npm run lint
> eslint .
exit 0
```

Both exited 0. Commit is `1 file changed, 4 insertions(+), 4 deletions(-)`.

## Concerns

- Layout should be re-checked visually in the browser once Task 3 lands: at 480px wide with `offset: 280`, neighbor cards overlap the center card more; 560px min-height should cover it, but a quick dev-server look is cheap insurance.
- Center card may now exceed 480px on very small desktop widths (e.g. ~768–900px) — `min(100%, 480px)` caps it to viewport, and the 280px offsets are static, so adjacent cards could briefly touch the viewport edge on those widths. Visual check recommended.
