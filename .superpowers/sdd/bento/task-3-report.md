# Task 3 Report: Cut IDE chrome, rewrite Hero

**Run:** bento · **Date:** 2026-08-19 · **Status:** DONE_WITH_CONCERNS

## Commit

- **Hash:** `5f0a35a`
- **Message:** `feat: hero without editor chrome, cut terminal and stats`
- **Files:** 8 changed, 23 insertions, 577 deletions
  - Deleted: `src/components/MiniTerminal.tsx`, `src/components/GitHubStats.tsx`, `src/components/StatusBar.tsx`, `src/components/FileExplorer.tsx`, `src/components/ContactModal.tsx`
  - Modified: `src/App.tsx` (removed FileExplorer/StatusBar imports + JSX), `src/components/HeroSection.tsx` (full replace per plan literal), `src/components/AboutSection.tsx` (see deviation 1)
- **Pushed:** No (per constraints).

## Asset check

- `public/assets/profile-image.jpeg` exists at BASE (f32b67e) and HEAD. `LazyImage` props verified against `src/components/LazyImage.tsx` (src, alt, className on wrapper, imgClassName on img, rest spread). Hero literal uses it with `loading="eager"`, `fetchPriority="high"`, `decoding="sync"` exactly as written.

## Verification

### Build

`npm run build` (`tsc -b && vite build`) → **exit 0**. Vite 8.0.16, 438 modules, dist built (357.86 kB js, 39.01 kB css).

### Lint

`npm run lint` (`eslint .`) → **exit 0**.

### Grep gate

`Get-ChildItem src -Recurse -File | Select-String -Pattern "portfolio:contact|ContactModal|MiniTerminal|GitHubStats|StatusBar|FileExplorer"` → **zero matches** (gate passed).

### Constraint checks

- No code comments added; hero literal copied verbatim from plan (lines 281-338).
- No em dashes, no emojis in UI copy (spec constraint).
- No `backdrop-blur` introduced.
- `min-h-11` present on both hero CTA pills.
- No `portfolio:contact` listener in HeroSection; "Say hello" anchors to `#contact`.
- Tokens consumed (`text-accent`, `bg-accent`, `text-canvas`, `border-edge`, `bg-surface`, `text-copy`, `text-muted`, `card-shadow`) all added in Task 1 (verified present via prior run state; no token-related errors in build).

## Deviations

1. **Plan oversight: AboutSection depended on GitHubStats.** The plan's Task 3 listed only App.tsx + HeroSection as modified, and its note said only ProjectsSection imported nothing deleted. In fact `src/components/AboutSection.tsx` imported and rendered `<GitHubStats />`, so `git rm` broke the build with `TS2307: Cannot find module './GitHubStats'` and would also have failed the grep gate. Minimal in-scope fix applied: removed the import and the `<GitHubStats />` wrapper div, and collapsed `lg:grid-cols-2` → `lg:grid-cols-1` so the remaining editor card stays full width on desktop. Full AboutSection rewrite is Task 4 scope (its literal drops the editor window entirely).
2. **No aria-label / JSON-LD in the plan literal.** The dispatch instruction stated the HeroSection plan literal contains `aria-label` attributes and a `<script type="application/ld+json">` Person schema block. The actual plan literal (lines 281-338) contains neither, nor does the bento spec's Hero section, and no `application/ld+json` exists anywhere in the repo. Per the brief ("plan is the single source of truth", "copy verbatim"), the literal was copied verbatim without JSON-LD or aria-label. If the JSON-LD block is genuinely wanted, it needs to be added deliberately (repo-wide, likely in index.html, not the hero).

## Concern summary

- The JSON-LD/aria-label discrepancy in the task instruction should be resolved by the orchestrator: either the plan literal is authoritative (current behavior) or a new hero literal with JSON-LD is required.
- AboutSection is now a temporary half-state (editor-window card, single column, `SectionHeading` still using `file=` prop) until Task 4 replaces it — expected, since Task 4 owns that rewrite.
