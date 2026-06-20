export default function Navbar() {
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-6xl backdrop-blur-md bg-zinc-900/70 border border-zinc-700/50 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">
        
        <a href="#" className="text-lg font-bold text-white tracking-tighter hover:opacity-90 transition-opacity">
          miii.
        </a>
        
        <div className="flex gap-5 sm:gap-6">
          {/* Changed duration-300 to duration-200 */}
          <a href="#about" className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200">About</a>
          <a href="#work" className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200">Work</a>
          <a href="#contact" className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200">Contact</a>
        </div>
        
      </nav>
    </div>
  );
}