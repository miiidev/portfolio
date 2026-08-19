# Task 5: Carousel neon glow

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectsSection.tsx`

**Interfaces:**
- Consumes: `.card-glow`, `.card-glow-soft` from Task 1; `--color-glow` token.
- Produces: new optional prop `glow?: 'full' | 'soft'` on `ProjectCard`. Desktop branch passes `glow="full"`; MobileCardStack (unchanged) relies on the `'soft'` default for its top card.

## Step 1: Add the glow prop to ProjectCard

In `src/components/ProjectCard.tsx`, change the component signature and root className from:

```tsx
export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col card-shadow ${
        isCenter ? 'border-accent' : 'border-edge hover:border-accent'
      }`}
    >
```

to:

```tsx
export default function ProjectCard({
  project,
  isCenter = true,
  glow = 'soft',
}: {
  project: Project;
  isCenter?: boolean;
  glow?: 'full' | 'soft';
}) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col ${
        isCenter
          ? `border-accent ${glow === 'full' ? 'card-glow' : 'card-glow-soft'}`
          : 'card-shadow border-edge hover:border-accent'
      }`}
    >
```

## Step 2: Desktop branch passes glow="full"

In `src/components/ProjectsSection.tsx`, in the desktop branch, change the ProjectCard usage from:

```tsx
                    <ProjectCard project={project} isCenter={pos === 0} />
```

to:

```tsx
                    <ProjectCard project={project} isCenter={pos === 0} glow="full" />
```

## Step 3: Arrow hover glow

In `src/components/ProjectsSection.tsx`, change BOTH arrow buttons from:

```tsx
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
```

and

```tsx
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent transition-all"
```

to the same classes but with `hover:shadow-[0_0_16px_var(--color-glow-soft)]` appended:

```tsx
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all"
```

and

```tsx
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-edge card-shadow text-muted hover:text-copy hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all"
```

## Step 4: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (PowerShell, from repo root):

```powershell
Select-String -Path src\components\ProjectCard.tsx -Pattern "card-glow"; Select-String -Path src\components\ProjectsSection.tsx -Pattern 'glow="full"|hover:shadow'
```

Expected: `card-glow` and `card-glow-soft` in ProjectCard, `glow="full"` and 2 `hover:shadow` in ProjectsSection.

## Step 5: Commit

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsSection.tsx
git commit -m "feat: neon glow on carousel cards and arrows"
```

Note for the reviewer: the carousel container uses `overflow-clip`; the 48px glow can clip at the top/bottom edge of the container. This is expected at current strength. If it is visibly cut, reduce the container class to `overflow-visible` on desktop only, or drop the glow blur to 32px, then re-verify.
