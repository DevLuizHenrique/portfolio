"use client";

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle: string;
}

export default function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      <span className="text-[10px] font-mono text-[var(--accent)]">{number}</span>
      <h2 className="text-xl font-semibold mt-1 text-[var(--foreground)]">{title}</h2>
      <p className="text-xs text-[var(--dim)] mt-1">{subtitle}</p>
    </div>
  );
}
