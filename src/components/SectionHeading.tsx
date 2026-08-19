interface SectionHeadingProps {
  children: string;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-copy">{children}</h2>
    </div>
  );
}