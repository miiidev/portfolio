import { sectionFiles, useActiveSection } from '../hooks/useActiveSection';

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default function FileExplorer() {
  const active = useActiveSection();

  return (
    <aside className="fixed left-0 top-14 bottom-6 z-30 hidden lg:flex w-48 flex-col border-r border-edge bg-canvas/60">
      <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-dim">Explorer</p>
      <nav className="flex-1 overflow-y-auto py-1">
        {sectionFiles.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'page' : undefined}
            className={`flex items-center gap-2 min-h-9 px-3 font-mono text-xs border-l-2 transition-colors duration-200 ${
              active === section.id
                ? 'text-copy bg-elevated/60 border-accent'
                : 'text-muted hover:text-copy border-transparent hover:bg-elevated/30'
            }`}
          >
            <FileIcon />
            {section.file}
          </a>
        ))}
      </nav>
    </aside>
  );
}