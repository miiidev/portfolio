# Review Brief: Rev 3 Tasks 4-5 — stacked card + editor frame

**Run:** card-split-rev3 · **Date:** 2026-08-18 · **Status:** in review

**Commits under review:**
- `f4479a6` — feat: stack project card - full-width 16:9 shot above readme
- `b436400` — feat: editor frame around work carousel

**Spec:** docs/superpowers/specs/2026-08-17-project-card-split-pane-design.md — "Rev 3 — Stacked Card + Editor Frame" + acceptance criteria.

## Checklist

1. **Card (ProjectCard.tsx):** body is a vertical stack — full-width `aspect-video` screenshot (object-cover LazyImage) + fallback placeholder also `aspect-video`; below: `// title`, description comment, 4-color tag chips, Code/Demo links `mt-auto`. No Preview tab, no `localhost` URL bar, no `sm:grid-cols-2`, no pane dividers. Tab bar, root classes, `isCenter` accent border preserved. Signature unchanged.
2. **Frame (ProjectsSection.tsx):** chrome only on desktop branch; `hidden md:block` wrapper (`border border-edge rounded-md overflow-hidden relative`); breadcrumb bar (`work`/`projects.tsx` + `● main`); gutter w-7 with static numbers 1..12; carousel host keeps `overflow-clip min-h-[560px]` + `pl-7`; left arrow `left-11`, right arrow `right-3`; status line (`Ln 1, Col 7` / `3 projects` / `utf-8`). MobileCardStack path untouched. Carousel geometry/spring/drag/`portfolio:project` dispatch unchanged.
3. **KNOWN CONCERN — verify specifically:** the implementer added `aria-hidden="true"` to the OUTER FRAME WRAPPER (the div containing the whole carousel). This hides the interactive carousel — Code/Demo links, arrows — from assistive tech. Spec says chrome-only decorative elements get aria-hidden. Confirm whether the wrapper itself (or any ancestor of interactive elements) carries aria-hidden, and report exact lines.
4. **Build/lint** re-run; no stray old strings (`Preview`, `localhost`, `grid-cols-2` in ProjectCard).
5. No new deps; no code comments; no em dashes/emojis.

## Report back

- Verdict per item: PASS / FAIL / Minor with line numbers.
- If the aria-hidden concern is real, describe precisely which lines to change.