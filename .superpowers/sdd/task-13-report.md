# Task 13 Report: Projects restyle — tab headers on cards

## Status: DONE

## Changes

### `src/components/ProjectCard.tsx` (replaced per brief)
- Card wrapper: `rounded-xl` → `rounded-md`; center hover `hover:border-edge-hover` → `hover:border-accent/60`.
- Added IDE tab bar header (`border-b border-edge bg-elevated/50 px-4 py-2 shrink-0`) with mono filename `projects/{project.title}.tsx` (text-muted) and decorative close ✕ (`&#10005;`, text-dim, `opacity-0 group-hover:opacity-100 transition-opacity`, `aria-hidden="true"`).
- Image block unchanged (LazyImage `w-full aspect-video` inside `shrink-0` wrapper); fallback screenshot placeholder unchanged.
- Added mono comment line `// {project.title}` (text-code-comment) above the title.
- Tag chips: now `font-mono text-xs bg-canvas text-muted px-3 py-1.5 rounded-full border border-edge` (was `text-xs font-semibold bg-canvas text-copy/80 ... border-edge` — border-edge was previously an invalid class since `border-edge` was set as the border-color class without `border`).
- Links: `hover:opacity-80 transition-opacity` → `hover:text-accent transition-colors duration-200` for both Code and Demo.

### `src/components/ProjectsSection.tsx` (arrows + heading only)
- Imported `SectionHeading`.
- Heading replaced: `<h2 className="text-2xl font-bold text-copy">My Projects</h2>` → `<SectionHeading file="projects.tsx">Work</SectionHeading>`, keeping the existing plain `div` wrapper (`flex items-center justify-between mb-2`) since the file has no `itemVariants`/variant hierarchy — no `motion.div` wrapper added (brief allows keeping the existing wrapper structure).
- Both prev/next arrow buttons: `rounded-full ... hover:text-copy hover:border-edge-hover transition-all hover:scale-105` → `rounded-md text-muted hover:text-copy hover:border-accent transition-all`; `aria-label`s preserved.

## Verification

```
> npm run build      # tsc -b && vite build — exit 0 (dist built, 443 modules)
> npm run lint       # eslint . — exit 0, no warnings
```

## Concerns

- None. All prior ProjectCard behavior preserved: LazyImage props, description, tags, Code/Demo links, `portfolio:project` event handling and zero-based carousel index in ProjectsSection untouched.
- Commit staged only the two brief-named files (project files were clean; `.superpowers/sdd/progress.md` modifications and untracked report/review files were left out per brief).
