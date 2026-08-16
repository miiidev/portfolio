interface SectionHeadingProps {
  file: string;
  children: string;
}

export default function SectionHeading({ file, children }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <h2 className="font-mono text-2xl font-semibold tracking-tight">
        <span className="text-code-comment">// </span>
        <span className="text-code-keyword">{children}</span>
      </h2>
      <span className="font-mono text-xs text-dim">{file}</span>
    </div>
  );
}
