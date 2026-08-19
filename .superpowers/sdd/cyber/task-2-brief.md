# Task 2: Hero terminal texture

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Interfaces:**
- Consumes: `.hero-grid`, `.cursor-block`, `.status-dot` CSS from Task 1 (already committed); tokens `--color-accent-3` (both themes), `bg-accent-3/10` utility.
- Produces: nothing consumed elsewhere.

## Step 1: Add the grid layer and status line

In `src/components/HeroSection.tsx`, modify the section opening and the text column.

Change the section element from:

```tsx
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
```

to:

```tsx
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="relative min-h-screen flex items-center py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
```

Change the text column from:

```tsx
        <motion.div variants={heroItemVariants}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-copy">
```

to:

```tsx
        <motion.div variants={heroItemVariants}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 font-mono text-sm text-muted">
            <span>
              ~/miiidev $
              <span className="cursor-block" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-3/10 text-accent-3 px-3 py-1 text-xs font-bold">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent-3" aria-hidden="true" />
              all systems go
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-copy">
```

## Step 2: Add hover glows to the hero buttons

Change the "View my work" button class from:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-accent text-canvas font-bold text-sm transition-opacity hover:opacity-90"
```

to:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-accent text-canvas font-bold text-sm transition-all hover:opacity-90 hover:shadow-[0_0_24px_var(--color-glow)]"
```

Change the "Say hello" button class from:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-surface border border-edge text-copy font-bold text-sm transition-colors hover:border-accent"
```

to:

```tsx
              className="inline-flex items-center min-h-11 px-6 rounded-full bg-surface border border-edge text-copy font-bold text-sm transition-all hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)]"
```

## Step 3: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (PowerShell, from repo root):

```powershell
Select-String -Path src\components\HeroSection.tsx -Pattern "hero-grid|~/miiidev|all systems go|cursor-block"
```

Expected: matches present.

## Step 4: Commit

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: hero terminal line, grid texture, button glows"
```
