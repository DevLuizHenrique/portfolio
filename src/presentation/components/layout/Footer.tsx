"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(139,105,20,0.3)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" fill="#5c3317" />
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(201,162,39,0.5)" strokeWidth="0.8" />
            <text x="30" y="26" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#f5edd5" letterSpacing="1">MISCHIEF</text>
            <text x="30" y="35" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#f5edd5" letterSpacing="1">MANAGED</text>
            <polygon points="30,14 31.5,19 36,19 32.5,21.5 34,26.5 30,23.5 26,26.5 27.5,21.5 24,19 28.5,19" fill="rgba(201,162,39,0.6)" />
          </svg>
        </div>

        <p className="italic text-lg mb-4" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#704214" }}>
          &ldquo;Travessura gerenciada.&rdquo;
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #8b6914)" }} />
          <span style={{ color: "#8b6914", fontSize: "8px" }}>◆</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #8b6914)" }} />
        </div>

        <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
          Criado com tinta mágica por Luiz Henrique · Anno Domini MMXXIV
        </p>

        <p className="text-xs mt-2" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "rgba(139,105,20,0.5)" }}>
          Messrs. Next.js, TypeScript, Tailwind & Framer Motion orgulhosamente apresentam
        </p>
      </div>
    </footer>
  );
}
