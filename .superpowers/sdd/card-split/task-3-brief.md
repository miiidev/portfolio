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
