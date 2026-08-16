### Task 15: Final pass â€” global consistency

**Files:**
- Modify: any component still using old chrome (run greps first)

- [ ] **Step 1: Grep for leftover old-chrome classes**

Run:
- `rg -n "rounded-xl" src` â€” fix any remaining `rounded-xl` card/panel uses (allowed only on nothing; convert to `rounded-md`).
- `rg -n "rounded-full" src` â€” allowed ONLY for tag chips (Experience tags, Skills chips, ProjectCard tags) and nothing else; convert any other uses (e.g. BackToTop button, ContactModal) to `rounded-md`.
- `rg -n "traffic|ff5f56|ffbd2e|27c93f|shadow-glow-dot|bg-dim\" />" src` â€” expected: no matches.
- `rg -n "bg-dim" src` â€” allowed in: terminal hint lines (MiniTerminal uses `text-muted` now) â€” convert any remaining `bg-dim` dots to nothing (they should all be gone).

- [ ] **Step 2: BackToTop + ContactModal rounding**

- `src/components/BackToTop.tsx`: change `rounded-full` â†’ `rounded-md` (keep `bottom-8 right-8`).
- `src/components/ContactModal.tsx`: change the dialog `rounded-2xl` â†’ `rounded-md`; modal header/footer `border-b border-edge` stays.

- [ ] **Step 3: Verify + commit**

Run: `npm run build; npm run lint` â€” expected: exit 0.

```bash
git add -A
git commit -m "chore: final IDE chrome consistency pass"
```

---


