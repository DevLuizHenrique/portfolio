"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (h: string) => { setOpen(false); document.querySelector(h)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.nav className="fixed top-0 inset-x-0 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <div
        className="transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(6,6,15,0.7)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity">
            LH
          </button>

          <div className="hidden md:flex gap-8">
            {NAV.map((n) => (
              <button key={n.href} onClick={() => go(n.href)} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                {n.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="w-4 h-px bg-[var(--muted)] mb-1 last:mb-0" animate={{ rotate: open && i === 0 ? 45 : open && i === 2 ? -45 : 0, y: open && i === 0 ? 5 : open && i === 2 ? -5 : 0, opacity: open && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden bg-[rgba(6,6,15,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV.map((n) => <button key={n.href} onClick={() => go(n.href)} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-left">{n.label}</button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
