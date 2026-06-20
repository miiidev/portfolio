import type { Project } from '../data';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div 
      className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl p-8 transition-all duration-300 hover:border-zinc-600 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] group h-full w-full flex flex-col"
    >
      <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
      <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs font-semibold bg-zinc-950 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-800">
            {tag}
          </span>
        ))}
      </div>
      
      <a 
        href={project.link} 
        target="_blank" 
        rel="noreferrer" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-200 group/link mt-auto w-fit"
      >
        View Project 
        <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
      </a>
    </div>
  );
}