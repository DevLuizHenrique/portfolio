"use client";

import { motion } from "framer-motion";
import type { PersonalInfo } from "@/domain/entities/PersonalInfo";

interface HeroSectionProps {
  readonly info: PersonalInfo;
}

export default function HeroSection({ info }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--foreground)] leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {info.name}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-[var(--muted)] mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {`${info.role} com foco em React, Next.js e TypeScript para produtos web com impacto real.`}
        </motion.p>

        <motion.p
          className="text-sm text-[var(--dim)] mb-10 leading-relaxed max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          Experiência em sistemas corporativos, interfaces orientadas a usabilidade e entregas que já geraram mais de 87% de ganho de produtividade.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <a
            href="/curriculo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:opacity-70 transition-opacity"
          >
            Ver currículo ATS
          </a>
          <a
            href="#projects"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Projetos
          </a>
          <a
            href="#contact"
            className="text-xs text-[var(--dim)] hover:text-[var(--muted)] transition-colors"
          >
            Contato
          </a>
        </motion.div>
      </div>
    </section>
  );
}
