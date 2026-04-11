"use client";

import { useEffect, useRef } from "react";

export function MapSvgPaths() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".map-path");
    paths?.forEach((path, i) => {
      const el = path as SVGPathElement;
      const len = el.getTotalLength?.() || 500;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.animation = `pathDraw ${3 + i * 0.5}s ease forwards ${i * 0.3}s`;
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 800"
      className="w-full h-full opacity-20"
      style={{ position: "absolute", inset: 0 }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Room outlines */}
      <rect x="50" y="80" width="180" height="120" rx="4" fill="none" stroke="#704214" strokeWidth="1.5" className="map-path" />
      <text x="140" y="146" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10" fill="#5c3317">Câmara do Início</text>

      <rect x="900" y="60" width="220" height="140" rx="4" fill="none" stroke="#704214" strokeWidth="1.5" className="map-path" />
      <text x="1010" y="136" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10" fill="#5c3317">Salão das Habilidades</text>

      <rect x="480" y="620" width="240" height="140" rx="4" fill="none" stroke="#704214" strokeWidth="1.5" className="map-path" />
      <text x="600" y="696" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10" fill="#5c3317">Grande Salão de Obras</text>

      <rect x="60" y="620" width="160" height="120" rx="4" fill="none" stroke="#704214" strokeWidth="1.5" className="map-path" />
      <text x="140" y="686" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10" fill="#5c3317">Torre dos Corvos</text>

      {/* Corridors */}
      <path d="M 230 140 Q 400 100 500 200 Q 600 300 600 400 Q 600 500 600 620" fill="none" stroke="#8b6914" strokeWidth="1" strokeDasharray="6 4" className="map-path" />
      <path d="M 900 130 Q 800 200 700 300 Q 650 400 620 620" fill="none" stroke="#8b6914" strokeWidth="1" strokeDasharray="6 4" className="map-path" />
      <path d="M 140 200 Q 140 400 140 620" fill="none" stroke="#8b6914" strokeWidth="1" strokeDasharray="6 4" className="map-path" />
      <path d="M 220 680 Q 360 700 480 690" fill="none" stroke="#8b6914" strokeWidth="1" strokeDasharray="6 4" className="map-path" />

      {/* Secret passage */}
      <path d="M 300 400 Q 450 380 500 400 Q 550 420 580 460" fill="none" stroke="#5c3317" strokeWidth="0.8" strokeDasharray="3 8" className="map-path" opacity="0.6" />
      <text x="420" y="390" fontFamily="IM Fell English, serif" fontSize="8" fill="#5c3317" fontStyle="italic" transform="rotate(-5,420,390)">passagem secreta</text>

      {/* Compass rose */}
      <g transform="translate(1100, 700)">
        <circle r="30" fill="none" stroke="#8b6914" strokeWidth="1" />
        <circle r="4" fill="#8b6914" />
        <line x1="0" y1="-24" x2="0" y2="24" stroke="#8b6914" strokeWidth="1" />
        <line x1="-24" y1="0" x2="24" y2="0" stroke="#8b6914" strokeWidth="1" />
        <line x1="-17" y1="-17" x2="17" y2="17" stroke="#8b6914" strokeWidth="0.5" />
        <line x1="17" y1="-17" x2="-17" y2="17" stroke="#8b6914" strokeWidth="0.5" />
        <polygon points="0,-18 3,-10 0,-13 -3,-10" fill="#5c3317" />
        <text x="0" y="-32" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#5c3317">N</text>
        <text x="0" y="42" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#5c3317">S</text>
        <text x="-38" y="4" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#5c3317">W</text>
        <text x="38" y="4" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#5c3317">E</text>
      </g>

      {/* Scale */}
      <g transform="translate(60, 750)">
        <line x1="0" y1="0" x2="100" y2="0" stroke="#8b6914" strokeWidth="1" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#8b6914" strokeWidth="1" />
        <line x1="50" y1="-3" x2="50" y2="3" stroke="#8b6914" strokeWidth="1" />
        <line x1="100" y1="-4" x2="100" y2="4" stroke="#8b6914" strokeWidth="1" />
        <text x="50" y="-10" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="#5c3317">Escala: 1 légua</text>
      </g>

      {/* Map title in corner */}
      <text x="600" y="40" textAnchor="middle" fontFamily="UnifrakturMaguntia, cursive" fontSize="22" fill="#704214" opacity="0.5">
        Mappa Portafolium
      </text>
      <line x1="420" y1="48" x2="780" y2="48" stroke="#8b6914" strokeWidth="0.8" opacity="0.5" />

      {/* Random terrain marks */}
      <g opacity="0.3" stroke="#8b6914" strokeWidth="0.8" fill="none">
        <path d="M 350 250 L 360 235 L 370 250" />
        <path d="M 370 250 L 380 235 L 390 250" />
        <path d="M 750 350 L 760 335 L 770 350" />
        <path d="M 770 350 L 780 335 L 790 350" />
        <circle cx="800" cy="450" r="15" />
        <path d="M 790 440 Q 800 430 810 440" />
      </g>

      {/* Grid lines */}
      {[200, 400, 600, 800, 1000].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="800" stroke="#8b6914" strokeWidth="0.3" opacity="0.2" />
      ))}
      {[160, 320, 480, 640].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#8b6914" strokeWidth="0.3" opacity="0.2" />
      ))}
    </svg>
  );
}
