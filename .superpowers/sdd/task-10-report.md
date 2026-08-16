# Task 10 Report — EducationSection restyle (tree accordion)

## What changed

Replaced `src/components/EducationSection.tsx` with the brief's exact code:

- Replaced the plain `<motion.h2>` with `SectionHeading file="education.ts">Education</SectionHeading>` (wrapped in a `motion.div` with `itemVariants`), consistent with other sections from Tasks 1-9.
- Cards converted to editor tree accordion rows: `rounded-md` (was `rounded-xl`), `space-y-2` (was `space-y-3`), `px-5 py-4` (was `px-6 py-4`).
- Chevron moved to the left side, rotated 90° (not 180°) when open, sized 16px, with `aria-hidden`.
- Header row is now `font-mono`; period rendered as `// {item.period}` comment in `text-code-comment` above the title (`text-base`, was `text-lg`) and org in `text-muted`.
- Expanded body is now an indented (`pl-12 pr-5 pb-4`) comment line `// {item.description || 'More details coming soon.'}` in `font-mono text-code-comment` (was plain `text-muted` body text).
- Kept: `openIndex` state (default 0), `aria-expanded`, `min-h-11` touch target on buttons, `AnimatePresence` height/opacity animation (0.25s easeOut), motion wrappers with `containerVariants`/`itemVariants` and the same viewport config.

Data fields confirmed against `src/data.ts` (`period`, `title`, `org`, `description` on `EducationItem`) — they match the brief's usage exactly; no data changes needed.

## Verification

```
npm run build  → tsc -b && vite build: ✓ built in 193ms (exit 0)
npm run lint   → eslint .: no errors (exit 0)
```

Both commands exited 0.

## Commit

- `bde4e07` — `feat: restyle education as editor tree accordion`
- Staged ONLY `src/components/EducationSection.tsx` per the brief (no `git add -A`).

## Concerns

- `aria-controls` is not present (the brief's code only includes `aria-expanded`); the brief is authoritative and its exact code was followed.
- Chevron chevron path is right-pointing (`m9 18 6-6-6-6`) and rotates to 90° when open — a deliberate tree/folder affordance; only visual, matches brief.
- Both education entries have empty `description` strings, so users will see the `'More details coming soon.'` fallback in the expanded comment line.