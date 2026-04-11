"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MapRevealProps {
  onReveal: () => void;
}

const OATH = "I solemnly swear that I am up to no good.";

export default function MapReveal({ onReveal }: MapRevealProps) {
  const [phase, setPhase] = useState<
    "closed" | "typing" | "response" | "unfolding" | "done"
  >("closed");
  const [text, setText] = useState("");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // Start sequence
  useEffect(() => {
    schedule(() => setPhase("typing"), 1000);
  }, [schedule]);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setText(OATH.slice(0, i));
      if (i >= OATH.length) {
        clearInterval(interval);
        schedule(() => setPhase("response"), 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, schedule]);

  // Response → unfold → done
  useEffect(() => {
    if (phase === "response") {
      schedule(() => setPhase("unfolding"), 1400);
    }
    if (phase === "unfolding") {
      schedule(() => {
        setPhase("done");
        onReveal();
      }, 2200);
    }
  }, [phase, onReveal, schedule]);

  const isUnfolding = phase === "unfolding";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#1a0f08" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(ellipse at 50% 40%, rgba(139,105,20,0.15) 0%, transparent 70%)`,
            }}
          />

          {/* ── The folded map ── */}
          <div
            className="relative"
            style={{ perspective: "1200px" }}
          >
            {/* Top fold (flap) */}
            <motion.div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                height: "50%",
                top: 0,
                transformOrigin: "bottom center",
                zIndex: 3,
              }}
              initial={{ rotateX: 0 }}
              animate={isUnfolding ? { rotateX: -180, opacity: 0 } : { rotateX: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: "#d4c4a0",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
                  boxShadow: "inset 0 -8px 20px rgba(92,51,23,0.2)",
                }}
              />
            </motion.div>

            {/* Bottom fold (flap) */}
            <motion.div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                height: "50%",
                bottom: 0,
                transformOrigin: "top center",
                zIndex: 3,
              }}
              initial={{ rotateX: 0 }}
              animate={isUnfolding ? { rotateX: 180, opacity: 0 } : { rotateX: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: "#d4c4a0",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
                  boxShadow: "inset 0 8px 20px rgba(92,51,23,0.2)",
                }}
              />
            </motion.div>

            {/* Left fold (flap) */}
            <motion.div
              className="absolute top-0 bottom-0 overflow-hidden"
              style={{
                width: "50%",
                left: 0,
                transformOrigin: "right center",
                zIndex: 2,
              }}
              initial={{ rotateY: 0 }}
              animate={isUnfolding ? { rotateY: 180, opacity: 0 } : { rotateY: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: "#c9b88e",
                  boxShadow: "inset -8px 0 20px rgba(92,51,23,0.15)",
                }}
              />
            </motion.div>

            {/* Right fold (flap) */}
            <motion.div
              className="absolute top-0 bottom-0 overflow-hidden"
              style={{
                width: "50%",
                right: 0,
                transformOrigin: "left center",
                zIndex: 2,
              }}
              initial={{ rotateY: 0 }}
              animate={isUnfolding ? { rotateY: -180, opacity: 0 } : { rotateY: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: "#c9b88e",
                  boxShadow: "inset 8px 0 20px rgba(92,51,23,0.15)",
                }}
              />
            </motion.div>

            {/* ── Main parchment face ── */}
            <motion.div
              className="relative mx-4 sm:mx-8"
              style={{ width: "min(520px, 85vw)" }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={
                isUnfolding
                  ? { scale: 1.05, opacity: 1 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="relative p-10 sm:p-14 text-center"
                style={{
                  backgroundColor: "#f0e6c8",
                  boxShadow: isUnfolding
                    ? "0 30px 80px rgba(0,0,0,0.7), inset 0 0 50px rgba(92,51,23,0.12)"
                    : "0 15px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(92,51,23,0.1)",
                  transition: "box-shadow 1s ease",
                }}
              >
                {/* Double border */}
                <div
                  className="absolute inset-3 border pointer-events-none"
                  style={{ borderColor: "rgba(139,105,20,0.35)" }}
                />
                <div
                  className="absolute inset-5 border pointer-events-none"
                  style={{ borderColor: "rgba(139,105,20,0.15)", borderStyle: "dashed" }}
                />

                {/* Corner ornaments */}
                {["tl", "tr", "bl", "br"].map((pos) => (
                  <div key={pos} className={`corner-ornament ${pos}`} />
                ))}

                {/* Crest */}
                <div className="mb-6">
                  <svg width="50" height="50" viewBox="0 0 50 50" className="mx-auto">
                    <circle cx="25" cy="25" r="22" fill="none" stroke="#8b6914" strokeWidth="1.2" />
                    <circle cx="25" cy="25" r="17" fill="none" stroke="#8b6914" strokeWidth="0.6" strokeDasharray="3 2" />
                    <text x="25" y="22" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6.5" fill="#5c3317" fontWeight="600">
                      PORTA
                    </text>
                    <text x="25" y="30" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6.5" fill="#5c3317" fontWeight="600">
                      FOLIUM
                    </text>
                    <line x1="13" y1="25" x2="37" y2="25" stroke="#8b6914" strokeWidth="0.6" />
                    <polygon points="25,7 27,14 25,12 23,14" fill="#8b6914" />
                    <polygon points="25,43 27,36 25,38 23,36" fill="#8b6914" />
                  </svg>
                </div>

                {/* Title */}
                <h1
                  className="text-xl sm:text-2xl mb-6 tracking-[0.15em]"
                  style={{ color: "#5c3317", fontFamily: "Cinzel Decorative, cursive" }}
                >
                  Mapa do Portfólio
                </h1>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8b6914)" }} />
                  <span style={{ color: "#8b6914", fontSize: "6px" }}>◆</span>
                  <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8b6914)" }} />
                </div>

                {/* Oath text */}
                <div className="min-h-[70px] flex flex-col items-center justify-center gap-3">
                  <p
                    className="italic text-base sm:text-lg leading-relaxed"
                    style={{
                      color: "#2c1810",
                      fontFamily: "IM Fell English, Georgia, serif",
                      minHeight: "1.6rem",
                    }}
                  >
                    {text}
                    {phase === "typing" && (
                      <span
                        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                        style={{
                          backgroundColor: "#5c3317",
                          animation: "glowPulse 0.8s ease-in-out infinite",
                        }}
                      />
                    )}
                  </p>

                  <AnimatePresence>
                    {(phase === "response" || phase === "unfolding") && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm tracking-[0.2em] uppercase"
                        style={{ color: "#c9a227", fontFamily: "Cinzel, serif" }}
                      >
                        — Mischief Managed. —
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fold crease lines (visible only when closed) */}
                {!isUnfolding && (
                  <>
                    <div
                      className="absolute left-0 right-0 top-1/2 h-px pointer-events-none"
                      style={{ background: "linear-gradient(to right, transparent, rgba(139,105,20,0.25), transparent)" }}
                    />
                    <div
                      className="absolute top-0 bottom-0 left-1/2 w-px pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent, rgba(139,105,20,0.25), transparent)" }}
                    />
                  </>
                )}

                {/* Unfolding indicator */}
                {isUnfolding && (
                  <motion.div
                    className="mt-6 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      className="text-xs tracking-[0.25em] uppercase"
                      style={{ color: "#8b6914", fontFamily: "Cinzel, serif" }}
                    >
                      Abrindo o mapa...
                    </span>
                  </motion.div>
                )}

                {/* Wax seal */}
                {phase === "closed" && (
                  <div className="flex justify-center mt-6">
                    <svg width="36" height="36" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="#7a2e1e" />
                      <circle cx="18" cy="18" r="13" fill="none" stroke="rgba(201,162,39,0.4)" strokeWidth="0.6" />
                      <text x="18" y="17" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="4.5" fill="#f5edd5" letterSpacing="0.5">
                        PM
                      </text>
                      <polygon points="18,8 19,12 22,12 19.5,14 20.5,18 18,15.5 15.5,18 16.5,14 14,12 17,12" fill="rgba(201,162,39,0.5)" />
                    </svg>
                  </div>
                )}

                {/* Dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-0.5 h-0.5 rounded-full"
                      style={{ backgroundColor: "#8b6914", opacity: 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
