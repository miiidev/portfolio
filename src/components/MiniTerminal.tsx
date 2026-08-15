import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, projects } from '../data';

interface Line {
  text: string;
  kind: 'cmd' | 'out' | 'err';
}

const HELP = [
  'Available commands:',
  '  about     - one-line summary',
  '  skills    - skill domains',
  '  projects  - list projects (then 1-3 to jump)',
  '  contact   - how to reach me',
  '  clear     - clear the terminal',
];

function outputFor(input: string): Line[] {
  const cmd = input.trim().toLowerCase();
  switch (cmd) {
    case 'help':
      return HELP.map((text) => ({ text, kind: 'out' as const }));
    case 'about':
      return [
        {
          text: `${personalInfo.role} based in ${personalInfo.location}. Building AI tools and teaching Java.`,
          kind: 'out',
        },
      ];
    case 'skills':
      return personalInfo.skills.map((group) => ({ text: `- ${group.domain}`, kind: 'out' as const }));
    case 'projects':
      return [
        { text: 'Type a number to jump to a project:', kind: 'out' },
        ...projects.map((p, i) => ({ text: `  ${i + 1}. ${p.title}`, kind: 'out' as const })),
      ];
    case 'contact':
      return [
        { text: `GitHub: ${personalInfo.socials.github}`, kind: 'out' },
        { text: `Email: ${personalInfo.socials.email}`, kind: 'out' },
        { text: `WhatsApp: ${personalInfo.socials.whatsapp ?? 'n/a'}`, kind: 'out' },
      ];
    case 'clear':
      return [];
    default:
      return [{ text: `command not found: ${cmd} (try "help")`, kind: 'err' }];
  }
}

export default function MiniTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [{ text: `> ${raw.trim()}`, kind: 'cmd' }];
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    if (/^[1-3]$/.test(cmd)) {
      const idx = Number(cmd) - 1;
      window.dispatchEvent(new CustomEvent('portfolio:project', { detail: idx }));
      next.push({ text: `Opening project ${idx + 1}...`, kind: 'out' });
    } else {
      next.push(...outputFor(raw));
    }
    setLines((prev) => [...prev, ...next]);
  };

  return (
    <div
      className="w-full max-w-md rounded-xl border border-edge bg-surface text-sm font-mono overflow-hidden"
      role="region"
      aria-label="Terminal"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-edge">
        <span className="w-2.5 h-2.5 rounded-full bg-dim" />
        <span className="w-2.5 h-2.5 rounded-full bg-dim" />
        <span className="w-2.5 h-2.5 rounded-full bg-dim" />
        <span className="ml-2 text-xs text-muted">miii@portfolio:~</span>
      </div>
      <div className="p-4 h-56 overflow-y-auto">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className={
              line.kind === 'cmd'
                ? 'text-copy font-semibold'
                : line.kind === 'err'
                  ? 'text-danger'
                  : 'text-muted'
            }
          >
            {line.text}
          </motion.div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-copy font-semibold">&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                run(input);
                setInput('');
              }
            }}
            autoFocus
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-copy outline-none placeholder:text-dim"
            placeholder="type help"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}