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
