# Project Card Split-Pane Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the project card as a balanced split-pane editor card (Preview | README) with an accent-border active state, and adjust the carousel geometry for the wider card.

**Architecture:** One component change (ProjectCard.tsx) — body becomes a responsive `grid` with a Preview pane (mini tab + decorative URL bar + screenshot) and a README pane (comment title/description, domain-colored tag chips, Code/Demo actions). Active card gets `border-accent/60` via the existing `isCenter` prop. ProjectsSection.tsx gets three numeric tweaks (card width, offsets, min-height). MobileCardStack needs no changes (shares ProjectCard).

**Tech Stack:** React 19, Vite 8, Tailwind v4, framer-motion, existing tokens (`text-code-*`, `bg-canvas`, `bg-surface`, `bg-elevated`, `border-edge`, `border-accent`).

## Global Constraints

- No test framework — verification gate is `npm run build` and `npm run lint`, both must exit 0.
- No new dependencies; no data shape changes (`Project` untouched).
- URL bar is decorative: `aria-hidden="true"`, no link, no cursor-pointer.
- Touch targets: interactive elements keep `min-h-11` (Code/Demo links are text links inside a pane — no change to their current sizing).
- No backdrop-blur; no em dashes/emojis in UI copy; no code comments beyond rendered `//` content lines.
- Windows PowerShell environment: no `rg`; use `Select-String` if grepping.
- Events contract unchanged: `portfolio:project` dispatch (zero-based index) in MiniTerminal; listener in ProjectsSection.

---

### Task 1: ProjectCard split-pane body

**Files:**
- Modify: `src/components/ProjectCard.tsx` (full replace of the body below the tab bar; chrome/tab bar and fallback placeholder kept)

**Interfaces:**
- Consumes: `Project` from `../data` (fields: `title`, `description`, `tags: string[]`, `repo?`, `demo?`, `image?`), `LazyImage` from `./LazyImage` (props: `src`, `alt`, `className`).
- Produces: same `ProjectCard` signature `{ project: Project; isCenter?: boolean }`. Root div classes: `bg-surface border rounded-md overflow-hidden group h-full w-full flex flex-col`; border color: `border-accent/60` when `isCenter`, else `border-edge hover:border-accent/60`.

- [ ] **Step 1: Replace the body of ProjectCard.tsx**

Replace the whole file with:

```tsx
import type { Project } from '../data';
import LazyImage from './LazyImage';

const tagColors = ['text-code-function', 'text-code-string', 'text-code-type', 'text-code-const'];

export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div
      className={`bg-surface border rounded-md overflow-hidden group h-full w-full flex flex-col ${
        isCenter ? 'border-accent/60' : 'border-edge hover:border-accent/60'
      }`}
    >
      <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2 shrink-0">
        <span className="font-mono text-xs text-muted">projects/{project.title}.tsx</span>
        <span className="font-mono text-xs text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&#10005;</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 flex-1 min-h-0">
        <div className="flex flex-col min-h-0 overflow-hidden border-t sm:border-t-0 sm:border-r border-edge">
          <div className="flex items-center justify-between border-b border-edge bg-canvas/60 px-3 py-1.5 shrink-0">
            <span className="font-mono text-[10px] text-muted">Preview</span>
            <span className="font-mono text-[10px] text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="px-2 pt-1.5 pb-2 shrink-0">
            <div
              className="font-mono text-[10px] text-code-string bg-canvas border border-edge rounded px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis"
              aria-hidden="true"
            >
              localhost:5173/{project.title}
            </div>
          </div>
          {project.image ? (
            <div className="flex-1 min-h-0 px-2 pb-2">
              <div className="w-full h-full rounded border border-edge overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0 mx-2 mb-2 rounded border border-edge bg-gradient-to-br from-surface via-elevated to-surface flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <span className="text-xs font-mono opacity-30">Screenshot</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-edge bg-canvas/60 px-3 py-1.5 shrink-0">
            <span className="font-mono text-[10px] text-muted">README.md</span>
            <span className="font-mono text-[10px] text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="p-3 flex flex-col flex-1 min-h-0">
            <p className="font-mono text-xs text-code-comment mb-1">// {project.title}</p>
            <p className="font-mono text-xs text-code-comment leading-relaxed mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`font-mono text-[10px] bg-canvas px-2.5 py-1 rounded-full border border-edge ${tagColors[index % tagColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-auto pt-1">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-copy hover:text-accent transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-copy hover:text-accent transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` — expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: split project card into preview and readme panes"
```

---

### Task 2: Carousel geometry — big center + edge peeks (Rev 2)

**Files:**
- Modify: `src/components/ProjectsSection.tsx:32-33` (offset constants), `src/components/ProjectsSection.tsx:100` (container min-height), `src/components/ProjectsSection.tsx:113-134` (card style/animate block)

**Interfaces:**
- Consumes: Task 1's card (unchanged — peeks are carousel-side styling only).
- Produces: unchanged component contract; the animate/pointerEvents/onClick logic changes as below.

- [ ] **Step 1: Update the two offset constants**

In `src/components/ProjectsSection.tsx`:

1. Line 32 — `const offset = isMobile ? 60 : 280;` → `const offset = isMobile ? 60 : 100;`
2. Line 33 — `const farOffset = isMobile ? 100 : 470;` → `const farOffset = isMobile ? 100 : 300;`

- [ ] **Step 2: Update the card style/animate block**

Replace the `style` object (currently `width: 'min(100%, 480px)'` and `pointerEvents: abs <= 1 ? 'auto' : 'none'`):

```tsx
style={{
  left: '50%',
  top: '50%',
  width: 'min(100%, 680px)',
  zIndex: pos === 0 ? 3 : abs === 1 ? 2 : 1,
  pointerEvents: pos === 0 ? 'auto' : 'none',
}}
```

Replace the `animate` object's scale and opacity lines (currently `scale: pos === 0 ? 1 : abs === 1 ? 0.9 : 0.78` and `opacity: abs <= 1 ? (pos === 0 ? 1 : 0.7) : 0`):

```tsx
scale: pos === 0 ? 1 : abs === 1 ? 0.9 : 0.78,
opacity: abs <= 1 ? (pos === 0 ? 1 : 0.4) : 0,
```

Remove the `onClick` handler from the card `motion.div` (it was `onClick={() => { if (pos !== 0) setCurrentIndex(index); }}` — peeks are no longer clickable; arrows and swipe navigate). `index` is still used by `key={project.id}`... note the map callback's `index` parameter becomes unused — if TypeScript complains about the unused parameter in `projects.map((project, index) => {`, change it to `projects.map((project) => {`.

Container line 100 stays `min-h-[560px]` (unchanged from Task 2 Rev 1 — already shipped).

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` — expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSection.tsx
git commit -m "feat: spotlight center card with subtle edge peeks"
```

---

### Task 3: Final consistency check + push + deploy

**Files:**
- Verify: `src/components/ProjectCard.tsx`, `src/components/ProjectsSection.tsx`, `src/components/MobileCardStack.tsx`

**Interfaces:**
- Consumes: Tasks 1-2.
- Produces: shipped site.

- [ ] **Step 1: Verify the mobile stack still works**

Confirm `MobileCardStack.tsx` has no changes needed: it renders `<ProjectCard project={card.project} isCenter={isTop} />` inside a `rounded-md overflow-hidden w-full h-full` wrapper — the new grid body inherits card height and stacks panes below `sm` viewport widths. No edits.

- [ ] **Step 2: Full verification + grep for leftovers**

Run:

```
npm run build
npm run lint
Select-String -Path src/components/ProjectCard.tsx -Pattern "rounded-full"   # expected: tag chips only
```

Expected: build + lint exit 0.

- [ ] **Step 3: Commit any remaining changes (none expected)**

If `git status --short` shows nothing, skip.

- [ ] **Step 4: Push and deploy**

```bash
git push origin main
npm run deploy
```

Expected: push succeeds, `Published` output from gh-pages.

- [ ] **Step 5: Smoke check**

Run: `Invoke-WebRequest -Uri "https://miiidev.github.io/portfolio/" -UseBasicParsing` — expected: StatusCode 200.

---

## Self-Review Notes

- Spec coverage (Rev 2): Preview pane (URL bar decorative, mini tab, LazyImage) → Task 1; README pane (title comment, description comment, domain-colored deps chips, Code/Demo actions) → Task 1; center accent border via `isCenter` → Task 1; big center 680 + edge peeks (offset 100 / farOffset 300, scale 0.9, opacity 0.4, pointer-events none, no click-to-center) → Task 2; mobile stack unchanged → Task 3; acceptance criteria build+lint → all tasks.
- No placeholders; Task 2 is exact literals + two small code blocks with the unused-`index` handling spelled out.
- Type consistency: `ProjectCard` signature unchanged; `tagColors` defined in Task 1 and used only there.
- Rev 1 → Rev 2 deltas: Task 2's four-swall swap is replaced by the peek spec; Task 1 and Task 3 unchanged (Task 1 already shipped as e8e7e8e; Task 3 re-verifies).