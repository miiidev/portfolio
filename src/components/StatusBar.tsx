export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:flex h-6 items-center justify-between bg-surface border-t border-edge px-3 font-mono text-[11px] text-muted">
      <div className="flex items-center gap-4">
        <span className="text-code-function">main*</span>
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
      <div>Ln 42, Col 7 &middot; {new Date().getFullYear()} miii.dev</div>
    </div>
  );
}
