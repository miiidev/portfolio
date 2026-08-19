### Task 1: Rewrite EducationSection as a card-free collapsible list

**Files:**
- Modify: `src/components/EducationSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `education` from `src/data.ts` (unchanged); `softContainerVariants`/`softItemVariants` from `../utils/animations` (unchanged); `SectionHeading` (unchanged); existing tokens.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the file content**

Replace the entire content of `src/components/EducationSection.tsx` with:

```tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { education } from '../data';
import { softContainerVariants as containerVariants, softItemVariants as itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function EducationSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="education"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading>Education</SectionHeading>
      </motion.div>
      <div className="space-y-8 max-w-3xl">
        {education.map((item, i) => {
          const isOpen = openIndex === i;
          const headerId = `education-header-${i}`;
          const bodyId = `education-body-${i}`;
          return (
            <motion.div key={i} variants={itemVariants}>
              <h3>
                <button
                  id={headerId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  className="w-full min-h-11 text-left"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="min-w-0">
                      <span className="block font-mono text-xs font-bold text-accent lowercase mb-1">
                        {item.period}
                      </span>
                      <span className="text-lg font-extrabold text-copy">
                        {item.title}
                        <span className="text-muted font-semibold"> · {item.org}</span>
                      </span>
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-accent shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={bodyId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pl-6 pt-1 text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
```

Notes:
- The `h3` wraps the `button` (valid HTML: heading outside button; the button's inner content is all `span`/`svg` phrasing content).
- The dead `|| 'More details coming soon.'` fallback is intentionally dropped (both education items have descriptions; the fallback was unreachable).
- The `·` separator between title and org is a middle dot, not an em dash.

- [ ] **Step 2: Verify build and lint**

Run: `npm run build; npm run lint`
Expected: both exit 0.

- [ ] **Step 3: Grep gates**

PowerShell, from repo root:

```powershell
Select-String -Path src\components\EducationSection.tsx -Pattern "bg-surface|card-shadow|rounded-2xl"
```

Expected: 0 matches (no card styling remains).

```powershell
Select-String -Path src\components\EducationSection.tsx -Pattern "aria-expanded|aria-controls|role=`"region`"|education-header|education-body"
```

Expected: matches present (aria contract + stable ids).

```powershell
Select-String -Path src\components\EducationSection.tsx -Pattern "More details coming soon"
```

Expected: 0 matches (dead fallback removed).

- [ ] **Step 4: Commit**

```bash
git add src/components/EducationSection.tsx
git commit -m "feat: education card-free collapsible list"
```

---

