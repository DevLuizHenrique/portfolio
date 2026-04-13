"use client";

import { motion } from "framer-motion";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";

export default function HeroSection() {
  const hookInfo = usePersonalInfo();
  const info = hookInfo;

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--foreground)] leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {info ? info.name : <span className="inline-block h-8 w-48 bg-[var(--border)] rounded animate-pulse" /> }
        </motion.h1>

        <motion.p
          className="text-sm text-[var(--muted)] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {info ? info.role + ' — interfaces modernas, experiências que fazem sentido.' : <span className="inline-block h-4 w-64 bg-[var(--border)] rounded animate-pulse" /> }
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs text-[var(--accent)] hover:opacity-70 transition-opacity"
          >
            Projetos &darr;
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs text-[var(--dim)] hover:text-[var(--muted)] transition-colors"
          >
            Contato
          </button>
        </motion.div>
      </div>
    </section>
  );
}
