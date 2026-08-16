### Task 2: SectionHeading component

**Files:**
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<SectionHeading file="experience.ts">Experience</SectionHeading>` â€” renders a mono `// Name` code-comment heading with an optional dim file chip to its right.

- [ ] **Step 1: Create the component**

```tsx
interface SectionHeadingProps {
  file: string;
  children: string;
}

export default function SectionHeading({ file, children }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <h2 className="font-mono text-2xl font-semibold tracking-tight">
        <span className="text-code-comment">// </span>
        <span className="text-code-keyword">{children}</span>
      </h2>
      <span className="font-mono text-xs text-dim">{file}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeading.tsx
git commit -m "feat: add code-comment section heading component"
```

---


