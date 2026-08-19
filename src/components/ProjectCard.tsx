import type { Project } from '../data';
import LazyImage from './LazyImage';

const accentCycle = [
  'text-accent bg-accent/10',
  'text-accent-2 bg-accent-2/10',
  'text-accent-3 bg-accent-3/10',
  'text-accent-4 bg-accent-4/10',
];

export default function ProjectCard({
  project,
  isCenter = true,
  glow = 'soft',
}: {
  project: Project;
  isCenter?: boolean;
  glow?: 'full' | 'soft';
}) {
  return (
    <div
      className={`bg-surface border rounded-2xl overflow-hidden group h-full w-full flex flex-col ${
        isCenter
          ? `border-accent ${glow === 'full' ? 'card-glow' : 'card-glow-soft'}`
          : 'card-shadow border-edge hover:border-accent'
      }`}
    >
      {project.image ? (
        <div className="w-full border-b border-edge overflow-hidden">
          <LazyImage src={project.image} alt={project.title} className="w-full" imgClassName="w-full !h-auto object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-video border-b border-edge bg-elevated/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span className="text-xs font-bold opacity-30">Screenshot</span>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h3 className="text-lg font-extrabold text-copy mb-2">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${accentCycle[index % accentCycle.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-auto pt-1">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}