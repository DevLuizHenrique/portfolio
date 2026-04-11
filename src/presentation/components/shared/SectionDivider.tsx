"use client";

interface SectionDividerProps {
  label: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative py-2">
      <svg
        viewBox="0 0 1200 60"
        className="w-full"
        style={{ opacity: 0.25, height: "40px" }}
        preserveAspectRatio="none"
      >
        <line x1="0" y1="30" x2="380" y2="30" stroke="#8b6914" strokeWidth="1" strokeDasharray="8 5" />
        <rect x="390" y="15" width="420" height="30" fill="none" stroke="#8b6914" strokeWidth="1" />
        <text x="600" y="34" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="11" fill="#5c3317">
          {label}
        </text>
        <line x1="840" y1="30" x2="1200" y2="30" stroke="#8b6914" strokeWidth="1" strokeDasharray="8 5" />
      </svg>
    </div>
  );
}
