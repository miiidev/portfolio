# Task 6 Report: Projects — bento cards, carousel, no frame

**Date:** 2026-08-19
**Run:** bento
**BASE commit:** 790e63a
**Commit:** e573649

## Changes

1. `src/components/ProjectCard.tsx` — full replace with plan Task 6 literal (verbatim-verified).
   - Bento card: `rounded-2xl overflow-hidden card-shadow`, `border-accent` when center.
   - Image keeps natural aspect via `imgClassName="w-full !h-auto object-cover"`.
   - No editor frame, no breadcrumb, no `file=` anywhere, no `portfolio:project` listener.
   - Accent chips via `accentCycle`; `rounded-full` Code/Demo links with `min-h-11`.
2. `src/components/ProjectsSection.tsx` — full replace with plan Task 6 literal (verbatim-verified).
   - Carousel geometry preserved exactly: 680px active width, offset 100/60, farOffset 300/100, scales 1/0.9/0.78, opacities 1/0.4/0, pointer-events none on non-active, spring 250/28/0.8, drag + handleDragEnd, `getPosition`, MobileCardStack at <=768px.
   - `portfolio:project` listener removed (no window anymore).
   - SectionHeading in `{ children: string }` form: `<SectionHeading>Work</SectionHeading>`.
   - Frame/terminal chrome, gutter, breadcrumb bar, status line gone; `min-h-screen` removed from section; arrows now `min-h-11 min-w-11 rounded-full` outside the frame.
3. `src/components/MobileCardStack.tsx` — one class change: `rounded-md` -> `rounded-2xl` (line 114). Nothing else touched.

No other files modified. ContactFooter/ContactForm/BackToTop untouched (Task 7).

## Verification

- `npm run build` — exit 0 (tsc -b && vite build, 438 modules).
- `npm run lint` — exit 0 (eslint .).
- Grep gate (PS 5.1) `Get-ChildItem src -Recurse -File | Select-String -Pattern "portfolio:project|breadcrumb|Ln 1|utf-8|sm:grid-cols-2"` — zero matches.
- Plan literal fidelity: scripted comparison of both replaced files against the Task 6 section of the plan (CR/LF and trailing-whitespace normalized): ProjectCard VERBATIM (3461 chars), ProjectsSection VERBATIM (4869 chars).

## Constraints honored

- No code comments added.
- No em dashes or emojis in UI copy.
- No backdrop-blur.
- min-h-11 present on all four buttons/links.
- Viewport-once reveals untouched (fadeRightConfig).
- Did not push.

## Deviations

- None in code. Note: the plan's Step 5 sample commit message reads "feat: bento project cards, carousel without editor frame"; per the task brief the commit was made with `feat: bento project cards without editor frame` instead. Only the three source files were staged.