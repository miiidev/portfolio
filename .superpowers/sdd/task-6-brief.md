### Task 6: MiniTerminal restyle â€” integrated terminal panel

**Files:**
- Modify: `src/components/MiniTerminal.tsx` (lines 79-90, the chrome block)

**Interfaces:**
- Consumes: existing behavior (lines, help, jump commands) â€” untouched.
- Produces: terminal window with tab bar `TERMINAL` (no traffic lights), prompt `miii@portfolio:~$` on the input row. Used by Task 7.

- [ ] **Step 1: Replace the chrome block**

Replace the current `<div className="w-full max-w-md rounded-xl border ...">` opening and the title bar (the block containing the three `<span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ... }} />` dots) with:

```tsx
  return (
    <div
      className="w-full max-w-md rounded-md border border-edge bg-surface text-sm font-mono overflow-hidden"
      role="region"
      aria-label="Terminal"
    >
      <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
        <span className="text-xs text-muted">TERMINAL</span>
        <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
      </div>
```

- [ ] **Step 2: Update the input prompt**

Replace the input row's prompt span `<span className="text-copy font-semibold">&gt;</span>` with:

```tsx
          <span className="text-code-keyword font-semibold shrink-0">miii@portfolio:~$</span>
```

- [ ] **Step 3: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/MiniTerminal.tsx
git commit -m "feat: restyle terminal as IDE integrated terminal panel"
```

---


