"use client";

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle: string;
}

export default function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center">
      <div
        className="text-xs tracking-[0.4em] uppercase mb-4"
        style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}
      >
        — {number} —
      </div>

      <h2
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ fontFamily: "Cinzel Decorative, cursive", color: "#2c1810" }}
      >
        {title}
      </h2>

      <p
        className="text-lg italic"
        style={{
          fontFamily: "IM Fell English, Georgia, serif",
          color: "#704214",
        }}
      >
        {subtitle}
      </p>

      <div className="map-divider mt-6">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <polygon
            points="8,1 10,6 15,6 11,9 13,15 8,11 3,15 5,9 1,6 6,6"
            fill="none"
            stroke="#8b6914"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
