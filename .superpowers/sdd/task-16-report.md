# Task 16 Report: Deploy

Status: **complete**

## Commands run

### 1. Final build verification

```
npm run build
```

Tail output:

```
> portfolio@0.0.0 build
> tsc -b && vite build

vite v8.0.16 building client environment for production...
transforming...✓ 443 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.52 kB │ gzip:   0.32 kB
dist/assets/index-BTuYZ-fo.css   37.11 kB │ gzip:   7.11 kB
dist/assets/index-ranBRdaF.js   373.51 kB │ gzip: 116.16 kB

✓ built in 190ms
EXIT=0
```

Exit code 0. No scratch notes existed to commit (brief's step list only covers push/deploy, so untracked SDD report files were intentionally left uncommitted).

### 2. Push

```
git push origin main
```

Output:

```
To https://github.com/miiidev/portfolio.git
   22c9730..6b8c7f6  main -> main
```

21 commits (28da41f..6b8c7f6) pushed.

### 3. Deploy

```
npm run deploy
```

Output:

```
> portfolio@0.0.0 deploy
> gh-pages -d dist

Published
EXIT=0
```

Script is `gh-pages -d dist` as defined in package.json.

## Smoke check results

- gh-pages branch updated: `git ls-remote origin gh-pages` → `be3e9ce0354a8cd485b28e0e5124622822a4996b` (previous ref was 7bcc7fe). New ref confirmed.
- Site responds: HEAD request to `https://miiidev.github.io/portfolio/` → `STATUS=200`.
- Page content loads: `https://miiidev.github.io/portfolio/` returns `<title>Ahmad Syahmi - Portfolio</title>`.
- Manual interactive smoke check (menu tabs, explorer active file, terminal `help`, accordions, carousel, theme toggle, Formspree submit) is the user step per the brief — not performed by automation.

## Concerns

- None blocking. Deploy ref `be3e9ce` vs latest main `6b8c7f6` — expected; gh-pages publishes a dist-only commit, not a mirror of main.
- The user-step smoke checks (interactive UI behaviors) remain for the human to verify on the live site.