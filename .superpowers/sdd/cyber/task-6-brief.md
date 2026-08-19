# Task 6: Button and BackToTop glow

**Files:**
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/BackToTop.tsx`

**Interfaces:**
- Consumes: `--color-glow`, `--color-glow-soft` tokens.
- Produces: nothing consumed elsewhere.

## Step 1: ContactForm submit button glow

In `src/components/ContactForm.tsx`, change the submit button class from:

```tsx
        className="inline-flex items-center gap-2 rounded-full bg-accent text-canvas font-semibold h-11 px-5 text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
```

to:

```tsx
        className="inline-flex items-center gap-2 rounded-full bg-accent text-canvas font-semibold h-11 px-5 text-sm transition-all hover:opacity-90 hover:shadow-[0_0_24px_var(--color-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
```

## Step 2: BackToTop hover glow

In `src/components/BackToTop.tsx`, change the button class from:

```tsx
          className="fixed bottom-8 right-8 z-40 p-3 bg-surface border border-edge card-shadow rounded-full text-muted hover:text-copy hover:border-copy transition-all shadow-lg"
```

to:

```tsx
          className="fixed bottom-8 right-8 z-40 p-3 bg-surface border border-edge card-shadow rounded-full text-muted hover:text-accent hover:border-accent hover:shadow-[0_0_16px_var(--color-glow-soft)] transition-all shadow-lg"
```

## Step 3: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (PowerShell, from repo root):

```powershell
Select-String -Path src\components\ContactForm.tsx -Pattern "hover:shadow"; Select-String -Path src\components\BackToTop.tsx -Pattern "hover:shadow"
```

Expected: 1 match each.

## Step 4: Commit

```bash
git add src/components/ContactForm.tsx src/components/BackToTop.tsx
git commit -m "feat: glow on primary button and back-to-top"
```
