# Task 6 Report: Button and BackToTop glow

## What I implemented

Applied the two exact class-string swaps from the brief:

1. **`src/components/ContactForm.tsx:147`** — submit button: added `hover:shadow-[0_0_24px_var(--color-glow)]` after `hover:opacity-90`. The rest of the class string unchanged.
2. **`src/components/BackToTop.tsx:20`** — back-to-top button: replaced `hover:text-copy hover:border-copy` with `hover:text-accent hover:border-accent` and added `hover:shadow-[0_0_16px_var(--color-glow-soft)]` before `transition-all`. The rest of the class string unchanged.

Both "from" strings in the brief matched the files verbatim before editing; no other changes made.

## What I tested

- `npm run build` — exit 0. `tsc -b && vite build` succeeded, 438 modules transformed.
- `npm run lint` — exit 0 (eslint, no errors).
- Grep gate (PowerShell `Select-String`, from repo root):
  - `src\components\ContactForm.tsx` — 1 match for `hover:shadow`
  - `src\components\BackToTop.tsx` — 1 match for `hover:shadow`

## Files changed

- `src/components/ContactForm.tsx` (1 line)
- `src/components/BackToTop.tsx` (1 line)

## Commit

- `eea188d` feat: glow on primary button and back-to-top
- 2 files changed, 2 insertions(+), 2 deletions(-)
- Git warned "LF will be replaced by CRLF" on ContactForm.tsx — expected on Windows, harmless.

## Self-review findings

- Completeness: both swaps applied verbatim from the brief — confirmed.
- Discipline: no other files touched (`git status` clean apart from staged commit).
- Verification: build, lint, and grep gate all pass.

## Issues or concerns

None.