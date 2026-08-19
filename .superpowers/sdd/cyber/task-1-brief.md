# Task 1: Tokens, fonts, base CSS, selection

**Files:**
- Modify: `index.html` (fonts)
- Modify: `src/index.css` (tokens, font stacks, new utilities)
- Modify: `src/App.tsx` (selection color)

**Interfaces:**
- Consumes: nothing.
- Produces: CSS classes `.card-glow`, `.card-glow-soft`, `.hero-grid`, `.cursor-block`, `.status-dot` and tokens `--color-glow`, `--color-glow-soft` used by Tasks 2, 5. Font stacks `font-sans`/`font-mono` used by Tasks 3, 4, 5.

## Step 1: Add Google Fonts to index.html

In `index.html`, replace the `<title>` line block with the title plus font links (keep the title):

```html
    <title>Ahmad Syahmi - Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
      rel="stylesheet"
    />
```

## Step 2: Replace the token sets in src/index.css

Replace the entire `@theme { ... }` block (currently lines 3-21) with:

```css
@theme {
  --breakpoint-xs: 25rem;
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --color-canvas: #0a0b0e;
  --color-surface: #131519;
  --color-elevated: #1c1f26;
  --color-copy: #f2f4f8;
  --color-muted: #9aa3b2;
  --color-dim: #7a8291;
  --color-edge: #23262e;
  --color-edge-hover: #f2f4f8;
  --color-inverse: #f2f4f8;
  --color-inverse-copy: #0a0b0e;
  --color-danger: #ff5c7a;
  --color-accent: #00d4ff;
  --color-accent-2: #7c6cff;
  --color-accent-3: #3ddb85;
  --color-accent-4: #ff5c8a;
  --color-shadow-card: rgba(0, 10, 24, 0.5);
  --color-glow: rgba(0, 212, 255, 0.25);
  --color-glow-soft: rgba(0, 212, 255, 0.15);
}
```

Replace the entire `.light { ... }` block (currently lines 23-40) with:

```css
.light {
  --color-canvas: #f4f6fa;
  --color-surface: #ffffff;
  --color-elevated: #e9edf4;
  --color-copy: #14161c;
  --color-muted: #5a6270;
  --color-dim: #666e7b;
  --color-edge: #d7dce5;
  --color-edge-hover: #14161c;
  --color-inverse: #14161c;
  --color-inverse-copy: #f4f6fa;
  --color-danger: #d6336c;
  --color-accent: #007a9e;
  --color-accent-2: #5b4bd1;
  --color-accent-3: #0b7a52;
  --color-accent-4: #d6336c;
  --color-shadow-card: rgba(16, 24, 40, 0.08);
  --color-glow: rgba(0, 122, 158, 0.18);
  --color-glow-soft: rgba(0, 122, 158, 0.1);
}
```

## Step 3: Add the new utilities to src/index.css

Append after the existing `.card-shadow` rule (line ~51-53):

```css
.card-glow {
  box-shadow: 0 3px 10px var(--color-shadow-card), 0 0 48px var(--color-glow);
}

.card-glow-soft {
  box-shadow: 0 3px 10px var(--color-shadow-card), 0 0 32px var(--color-glow-soft);
}

.hero-grid {
  background-image:
    linear-gradient(to right, rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
}

.light .hero-grid {
  background-image:
    linear-gradient(to right, rgba(0, 122, 158, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 122, 158, 0.07) 1px, transparent 1px);
}

@keyframes cursor-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.cursor-block {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  margin-left: 0.15em;
  vertical-align: text-bottom;
  background-color: var(--color-accent);
  animation: cursor-blink 1.1s step-end infinite;
}

@keyframes status-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.status-dot {
  animation: status-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-block {
    animation: none;
  }
  .status-dot {
    animation: none;
  }
}
```

Note: the `@media (prefers-reduced-motion: reduce)` block above is separate from the existing one at the bottom of the file; both stay.

## Step 4: Selection color in App.tsx

In `src/App.tsx`, change the shell div (line ~30) from `selection:bg-elevated` to `selection:bg-accent/30`:

```tsx
<div className="min-h-screen bg-canvas text-copy selection:bg-accent/30">
```

## Step 5: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gates (PowerShell, from repo root):

```powershell
Select-String -Path src\index.css -Pattern "#141414|#ff6b35|#fff8f0"
```

Expected: no matches (old warm tokens gone).

```powershell
Select-String -Path index.html -Pattern "fonts.googleapis.com"
```

Expected: 2 matches (preconnect + stylesheet).

```powershell
Select-String -Path src\index.css -Pattern "card-glow|cursor-blink|status-pulse|hero-grid"
```

Expected: matches present.

## Step 6: Commit

```bash
git add index.html src/index.css src/App.tsx
git commit -m "feat: cyber tokens, geist fonts, glow and terminal utilities"
```
