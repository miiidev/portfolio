### Task 4: Navbar restyle â€” menu bar with tabs and mobile file list

**Files:**
- Modify: `src/components/Navbar.tsx` (full replace)

**Interfaces:**
- Consumes: `sectionFiles` + `useActiveSection` (Task 3), `ThemeToggle`.
- Produces: fixed menu bar (h-14, border-b, no island behavior), left = logo + active file name, desktop tabs for About/Experience/Education/Skills/Work/Contact with accent underline on active, right = ThemeToggle + mobile hamburger; mobile dropdown lists all `sectionFiles`.

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { sectionFiles, useActiveSection } from '../hooks/useActiveSection';

const tabs = sectionFiles.slice(1);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const activeFile = sectionFiles.find((s) => s.id === active)?.file ?? sectionFiles[0].file;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 border-b border-nav-edge">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-3 sm:px-6">
        <a href="#" className="flex items-baseline gap-2 shrink-0 text-copy hover:opacity-90 transition-opacity">
          <span className="font-bold tracking-tighter text-lg">miii.</span>
          <span className="hidden sm:inline font-mono text-xs text-dim">{activeFile}</span>
        </a>

        <nav className="hidden lg:flex items-center h-14 ml-6">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={active === tab.id ? 'page' : undefined}
              className={`inline-flex items-center h-14 px-3 font-mono text-sm border-b-2 transition-colors duration-200 ${
                active === tab.id
                  ? 'border-accent text-copy bg-elevated/50'
                  : 'border-transparent text-muted hover:text-copy hover:bg-elevated/30'
              }`}
            >
              {tab.file}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close file list' : 'Open file list'}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-copy hover:opacity-80 transition-opacity"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-b border-nav-edge bg-canvas"
          >
            <nav className="mx-auto max-w-6xl px-3 sm:px-6 py-2">
              {sectionFiles.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === section.id ? 'page' : undefined}
                  className={`flex items-center min-h-11 px-3 font-mono text-sm rounded-md transition-colors duration-200 ${
                    active === section.id
                      ? 'text-copy bg-elevated/50 border-l-2 border-accent'
                      : 'text-muted hover:text-copy'
                  }`}
                >
                  {section.file}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: restyle navbar as IDE menu bar with file tabs"
```

---


