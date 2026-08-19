# Task 3: Nav mono labels and active glow

**Files:**
- Modify: `src/components/NavBar.tsx`

**Interfaces:**
- Consumes: `font-mono` stack from Task 1; `--color-glow` token.
- Produces: nothing consumed elsewhere.

## Step 1: Desktop nav links

Change the desktop link class from:

```tsx
              className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
```

to:

```tsx
              className={`inline-flex items-center min-h-11 px-4 rounded-full font-mono text-sm font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
```

## Step 2: Mobile nav links

Change the mobile link class from:

```tsx
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full text-xs font-bold transition-colors duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-copy'
              }`}
```

to:

```tsx
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full font-mono text-xs font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy'
              }`}
```

Note: the brand mark "miiidev" and the nav item labels in `items` array stay unchanged (labels get the mono font from the link classes).

## Step 3: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (PowerShell, from repo root):

```powershell
Select-String -Path src\components\NavBar.tsx -Pattern "font-mono|shadow-\[0_0_16px_var"
```

Expected: 2 matches for `font-mono`, 2 for the glow shadow.

## Step 4: Commit

```bash
git add src/components/NavBar.tsx
git commit -m "feat: mono nav labels with active glow"
```
