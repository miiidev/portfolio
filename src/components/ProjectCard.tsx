import type { Project } from '../data';
import LazyImage from './LazyImage';

export default function ProjectCard({ project, isCenter = true }: { project: Project; isCenter?: boolean }) {
  return (
    <div 
      className={`bg-surface/90 backdrop-blur-md border border-edge rounded-xl overflow-hidden group h-full w-full flex flex-col ${isCenter ? 'hover:border-edge-hover hover:shadow-glow-card card-lift-hover' : ''}`}
    >
      {project.image ? (
        <div className="shrink-0">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full aspect-video"
          />
        </div>
      ) : (
        <div className="shrink-0 w-full aspect-video bg-gradient-to-br from-surface via-elevated to-surface flex items-center justify-center border-b border-edge">
          <div className="flex flex-col items-center gap-2 text-muted">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span className="text-xs font-mono opacity-30">Screenshot</span>
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
      <h3 className="text-2xl font-bold text-copy mb-3">{project.title}</h3>
      <p className="text-muted text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs font-semibold bg-canvas text-copy/80 px-3 py-1.5 rounded-full border-edge">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mt-auto">
        {project.repo && (
          <a 
            href={project.repo} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-copy transition-colors duration-200 link-glow"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Code
            <span className="link-arrow">→</span>
          </a>
        )}
        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-copy transition-colors duration-200 link-glow"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Demo
            <span className="link-arrow">→</span>
          </a>
        )}
      </div>
    </div>
    </div>
  );
}