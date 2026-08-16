### Task 7: Hero restyle â€” code intro window, profile preview, terminal panel

**Files:**
- Modify: `src/components/HeroSection.tsx` (full replace)

**Interfaces:**
- Consumes: `LazyImage`, `MiniTerminal` (Task 6), `ContactModal`, `heroContainerVariants`/`heroItemVariants` from `src/utils/animations`, `personalInfo`.
- Produces: hero with left editor window (`miii.ts` tab, line-numbered code intro with syntax colors, blinking cursor, CTA buttons) and right column (profile image in `profile.png` preview card + terminal panel).

- [ ] **Step 1: Replace HeroSection.tsx**

```tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { heroContainerVariants, heroItemVariants } from '../utils/animations';
import LazyImage from './LazyImage';
import ContactModal from './ContactModal';
import MiniTerminal from './MiniTerminal';

const codeLines = [
  { key: 'const', text: 'const developer = {', color: 'text-code-keyword' },
  { key: 'name', text: "  name: 'Ahmad Syahmi',", color: 'text-code-string' },
  { key: 'role', text: "  role: 'Software & AI Developer',", color: 'text-code-string' },
  { key: 'location', text: "  location: 'Malaysia',", color: 'text-code-string' },
  { key: 'open', text: '  openToWork: true,', color: 'text-code-const' },
  { key: 'close', text: '};', color: '' },
];

export default function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const openContact = () => setContactOpen(true);
    window.addEventListener('portfolio:contact', openContact);
    return () => window.removeEventListener('portfolio:contact', openContact);
  }, []);

  return (
    <motion.header
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div variants={heroItemVariants} className="w-full">
          <div className="rounded-md border border-edge bg-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2 group">
              <span className="text-xs text-muted">miii.ts</span>
              <span className="text-xs text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&#10005;</span>
            </div>
            <div className="p-5 sm:p-7 font-mono text-sm leading-7 overflow-x-auto">
              <div className="flex">
                <div className="pr-4 text-right text-dim select-none shrink-0">
                  {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                  <div className="cursor-block text-copy">&#9632;</div>
                </div>
                <div>
                  {codeLines.map((line) => (
                    <div key={line.key} className={line.color || 'text-copy'}>
                      {line.text}
                    </div>
                  ))}
                  <div className="cursor-block text-copy">&#9632;</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:border-accent rounded-md text-sm font-medium transition-all border border-edge text-copy min-h-11"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              View All Projects
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-3 bg-inverse text-inverse-copy font-semibold rounded-md text-sm transition-all border border-edge hover:opacity-90 min-h-11"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        <motion.div variants={heroItemVariants} className="w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="rounded-md border border-edge bg-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
              <span className="text-xs text-muted">profile.png</span>
              <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
            </div>
            <LazyImage
              src="/portfolio/assets/profile-image.jpeg"
              alt={personalInfo.name}
              className="w-full aspect-square"
              imgClassName="object-cover w-full h-full"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
          <MiniTerminal />
        </motion.div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0. (TS may flag `color: ''` in the `codeLines` array literal; if so, type the array: `const codeLines: { key: string; text: string; color: string }[] = [...]`.)

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: restyle hero as editor window with code intro"
```

---


