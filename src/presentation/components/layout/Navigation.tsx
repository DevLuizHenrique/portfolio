"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Câmara do Início", href: "#about" },
  { label: "Salão das Habilidades", href: "#skills" },
  { label: "Grande Salão de Obras", href: "#projects" },
  { label: "Torre dos Corvos", href: "#contact" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(240, 230, 200, 0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(139,105,20,0.4)" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(92,51,23,0.1)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
          >
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="none" stroke="#8b6914" strokeWidth="1.5" />
              <text x="14" y="18" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#5c3317" fontWeight="bold">
                PM
              </text>
            </svg>
            <span
              className="text-xs tracking-[0.25em] uppercase hidden sm:block"
              style={{ fontFamily: "Cinzel, serif", color: "#5c3317" }}
            >
              Porta Folium
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => handleNav(item.href)} className="nav-link">
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-px"
                style={{ backgroundColor: "#5c3317" }}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "rgba(240, 230, 200, 0.98)",
              borderBottom: "1px solid rgba(139,105,20,0.4)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button key={item.href} onClick={() => handleNav(item.href)} className="nav-link text-left">
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
