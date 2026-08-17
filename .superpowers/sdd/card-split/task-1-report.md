# Task 1 Report — ProjectCard split-pane body

**Status:** Complete
**Commit:** `e8e7e8e` — `feat: split project card into preview and readme panes`
**Date:** 2026-08-17

## What changed

`src/components/ProjectCard.tsx` was fully replaced with the code from `task-1-brief.md` (verbatim, no deviations):

- **Chrome kept:** top tab bar (`projects/{title}.tsx`) and the fallback "Screenshot" placeholder svg (resized 40→32, wrapper now fills the Preview pane instead of a fixed `aspect-video` row).
- **Root container:** `bg-surface border rounded-md overflow-hidden group h-full w-full flex flex-col`; accent border logic now matches spec — `border-accent/60` when `isCenter`, else `border-edge hover:border-accent/60` (previously the border was always `border-edge` and hover accent only applied when centered).
- **Body replaced with split grid:** `grid grid-cols-1 sm:grid-cols-2 flex-1 min-h-0` — single column stack on mobile, two panes from `sm` up.
  - **Preview pane:** own mini tab bar (`Preview`), fake `localhost:5173/{title}` URL chip, then either the `LazyImage` in an edge-bordered rounded container (`w-full h-full object-cover`, note: `flex-1 min-h-0` for sizing) or the screenshot placeholder.
  - **README pane:** mini tab bar (`README.md`), `// {title}` + description as `text-code-comment`, tags as rounded pills colored via `tagColors` (4 code-color tokens cycled by index), then Code/Demo links pinned to the bottom via `mt-auto`.
- **New token:** `tagColors = ['text-code-function', 'text-code-string', 'text-code-type', 'text-code-const']` module constant.
- Signature unchanged: `({ project, isCenter = true })`. No comments added beyond the rendered `// {title}` line.

## Verification

`npm run build` → exit 0:

```
> tsc -b && vite build
vite v8.0.16 building client environment for production...
transforming...✓ 443 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.52 kB │ gzip:   0.33 kB
dist/assets/index-CWkOadT7.css   34.03 kB │ gzip:   6.84 kB
dist/assets/index-Cy7NbtJ3.js   374.90 kB │ gzip: 116.37 kB
✓ built in 509ms
```

`npm run lint` → exit 0 (no output, `eslint .` clean).

## Concerns

- **JSX style oddity:** `<polyline points="15 3 21 3 21 9"/>` and the `<line .../>` self-closing svg children in the brief's code are non-standard JSX (xml-style tags), yet the build passed with no lint errors — acceptable, left verbatim per instructions.
- **Line ending warning:** Git reported "LF will be replaced by CRLF the next time Git touches it" for the file; pre-existing repo `core.autocrlf` behavior, no action taken.
- Untracked task artifacts (`.superpowers/`, `docs/superpowers/plans/...`) exist in the working tree; only `src/components/ProjectCard.tsx` was staged and committed, per instructions.
- **Visual risk (not verified in-browser):** panes rely on `flex-1 min-h-0` chains; on very short viewports the Preview image area could compress to near-zero height. Tailwind v4 tokens used (`text-code-*`, `bg-canvas`, `bg-surface`, `bg-elevated`, `border-edge`, `border-accent/60`) are confirmed present in `index.css` via the approved spec; a visual QA pass in Task 3 would confirm.
