"use client";

import { motion } from "framer-motion";
import { MapSvgPaths } from "../map/MapSvgPaths";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";

export default function HeroSection() {
  const info = usePersonalInfo();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MapSvgPaths />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-700/60" />
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7" fill="none" stroke="#8b6914" strokeWidth="1" />
          </svg>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-700/60" />
        </motion.div>

        <motion.p
          className="font-fell italic text-lg mb-4"
          style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#704214" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Eu solenemente juro que estou a serviço do bem
        </motion.p>

        <motion.h1
          className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
        >
          {info.name}
        </motion.h1>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
            — {info.role} —
          </span>
        </motion.div>

        <motion.p
          className="text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#5c3317" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Cartógrafo de interfaces e arquiteto de experiências digitais.
          Este mapa revela os caminhos percorridos, as câmaras exploradas
          e os projetos criados com magia e código.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 transition-all duration-300 text-sm tracking-[0.15em] uppercase hover:shadow-[0_4px_20px_rgba(92,51,23,0.4)]"
            style={{
              fontFamily: "Cinzel, serif",
              backgroundColor: "#5c3317",
              color: "#f5edd5",
              border: "1px solid #5c3317",
            }}
          >
            Explorar o Mapa
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 transition-all duration-300 text-sm tracking-[0.15em] uppercase hover:bg-[rgba(139,105,20,0.1)]"
            style={{
              fontFamily: "Cinzel, serif",
              backgroundColor: "transparent",
              color: "#5c3317",
              border: "1px solid #8b6914",
            }}
          >
            Enviar Coruja
          </button>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Cinzel, serif", color: "#8b6914", opacity: 0.7 }}>
            Percorra o mapa
          </span>
          <svg width="20" height="30" viewBox="0 0 20 30">
            <rect x="1" y="1" width="18" height="28" rx="9" fill="none" stroke="#8b6914" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="3" fill="#8b6914">
              <animate attributeName="cy" values="10;18;10" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
