import ThemeToggle from './ThemeToggle';
import { useActiveSection } from '../hooks/useActiveSection';

const items = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Talk' },
];

export default function NavBar() {
  const active = useActiveSection();

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden md:flex items-center gap-1 sticky top-0 z-50 bg-canvas/95 px-4 lg:px-8 border-b border-edge"
      >
        <a href="#hero" className="flex items-center gap-2 shrink-0 text-copy hover:opacity-90 transition-opacity mr-4">
          <span className="font-extrabold tracking-tight text-lg">miiidev</span>
        </a>
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`inline-flex items-center min-h-11 px-4 rounded-full font-mono text-sm font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy hover:bg-elevated'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>

      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center justify-around rounded-full border border-edge bg-surface card-shadow px-2 py-1.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`inline-flex items-center justify-center min-h-11 min-w-14 px-3 rounded-full font-mono text-xs font-bold transition-all duration-200 ${
                active === item.id
                  ? 'bg-accent/15 text-accent shadow-[0_0_16px_var(--color-glow-soft)]'
                  : 'text-muted hover:text-copy'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
