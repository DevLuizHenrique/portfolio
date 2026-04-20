"use client";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-[var(--foreground)]">{title}</h2>
      <p className="text-xs text-[var(--dim)] mt-1">{subtitle}</p>
    </div>
  );
}
