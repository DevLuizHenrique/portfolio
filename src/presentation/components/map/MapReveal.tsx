"use client";

import { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useMapRevealPhase } from "@/presentation/hooks/useMapRevealPhase";
import DustParticles from "./DustParticles";
import FoldFlap from "./FoldFlap";
import MapDecorations from "./MapDecorations";
import MapCrest from "./MapCrest";
import WaxSeal from "./WaxSeal";
import ParchmentEdges from "./ParchmentEdges";

interface MapRevealProps {
  onReveal: () => void;
}

const PARCHMENT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

const TABLE_BG = `
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04 0.2' numOctaves='5' seed='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23w)' opacity='0.12'/%3E%3C/svg%3E"),
  linear-gradient(180deg, #120904 0%, #1a0f08 40%, #1e1209 100%)
`;

export default function MapReveal({ onReveal }: MapRevealProps) {
  const {
    phase,
    text,
    isUnfolding,
    sealBreaking,
    showDecorations,
    textStarted,
  } = useMapRevealPhase(onReveal);

  const glowProgress = useMotionValue(0);
  useEffect(() => {
    glowProgress.set(phase === "unfolding" ? 1 : 0);
  }, [phase, glowProgress]);

  const glowSpring = useSpring(glowProgress, { stiffness: 30, damping: 14 });
  const bgGlow = useTransform(
    glowSpring,
    [0, 1],
    [
      "radial-gradient(ellipse at 50% 45%, rgba(180,130,50,0.06) 0%, transparent 50%)",
      "radial-gradient(ellipse at 50% 45%, rgba(201,162,39,0.18) 0%, transparent 65%)",
    ],
  );

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: TABLE_BG }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div className="absolute inset-0" style={{ backgroundImage: bgGlow }} />

          <CandleGlow phase={phase} />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          <DustParticles />

          <div className="relative" style={{ perspective: "1800px" }}>
            <FoldFlap side="left" isUnfolding={isUnfolding} />
            <FoldFlap side="right" isUnfolding={isUnfolding} />

            <motion.div
              className="relative mx-4 sm:mx-8"
              style={{ width: "min(520px, 85vw)" }}
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={
                isUnfolding
                  ? { scale: [1, 1.03], opacity: 1, y: 0 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={
                isUnfolding
                  ? { scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.5 }, y: { duration: 0.6 } }
                  : { duration: 0.9, ease: "easeOut" }
              }
            >
              <motion.div
                className="relative text-center overflow-visible"
                style={{
                  padding: "clamp(2rem, 5vw, 3.5rem)",
                  backgroundColor: "#efe2c0",
                  backgroundImage: `
                    ${PARCHMENT_BG},
                    radial-gradient(ellipse at 30% 20%, rgba(180,150,80,0.08) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, rgba(120,80,30,0.06) 0%, transparent 50%)
                  `,
                  borderRadius: "1px",
                }}
                animate={{
                  boxShadow: isUnfolding
                    ? "0 50px 120px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.4), inset 0 0 80px rgba(92,51,23,0.08)"
                    : "0 20px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3), inset 0 0 50px rgba(92,51,23,0.06)",
                }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              >
                <ParchmentEdges />

                <ParchmentStains />

                <MapDecorations visible={showDecorations} />
                <FoldCrease isUnfolding={isUnfolding} />

                <motion.div
                  className="relative z-10"
                  animate={
                    !isUnfolding
                      ? { y: [0, -2, 0] }
                      : {}
                  }
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <MapCrest />
                  </motion.div>

                  <motion.h1
                    className="text-xl sm:text-2xl mb-5 tracking-[0.15em]"
                    style={{ color: "#5c3317", fontFamily: "Cinzel Decorative, cursive" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    Mapa do Portfólio
                  </motion.h1>

                  <motion.div
                    className="flex items-center justify-center gap-3 mb-5"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
                  >
                    <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8b6914)" }} />
                    <span style={{ color: "#8b6914", fontSize: "6px" }}>◆</span>
                    <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8b6914)" }} />
                  </motion.div>

                  <OathText text={text} phase={phase} textStarted={textStarted} />

                  {(phase === "closed" || phase === "breaking") && (
                    <WaxSeal breaking={sealBreaking} />
                  )}

                  <UnfoldingIndicator visible={isUnfolding} />

                  <div className="flex justify-center gap-1.5 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 h-0.5 rounded-full"
                        style={{ backgroundColor: "#8b6914" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CandleGlow({ phase }: { phase: string }) {
  const isActive = phase !== "done";
  return (
    <>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "60vw",
          height: "60vh",
          left: "20%",
          top: "15%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,200,100,0.04) 0%, transparent 70%)",
        }}
        animate={
          isActive
            ? { opacity: [0.6, 1, 0.7, 1, 0.6], scale: [1, 1.02, 0.99, 1.01, 1] }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "40vw",
          height: "40vh",
          left: "30%",
          top: "25%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,180,80,0.03) 0%, transparent 60%)",
        }}
        animate={
          isActive
            ? { opacity: [0.8, 0.5, 0.9, 0.6, 0.8], scale: [1, 1.03, 0.98, 1.02, 1] }
            : {}
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </>
  );
}

function ParchmentStains() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "1px" }}>
      <div
        className="absolute"
        style={{
          top: "-5%",
          left: "-3%",
          width: "40%",
          height: "35%",
          background: "radial-gradient(ellipse at 30% 30%, rgba(139,105,20,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-3%",
          right: "-2%",
          width: "45%",
          height: "40%",
          background: "radial-gradient(ellipse at 70% 70%, rgba(92,51,23,0.08) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "20%",
          right: "10%",
          width: "25%",
          height: "20%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(160,120,50,0.05) 0%, transparent 70%)",
          transform: "rotate(15deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "25%",
          left: "5%",
          width: "20%",
          height: "15%",
          background: "radial-gradient(circle, rgba(100,70,20,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(180,150,80,0.03) 0%, transparent 30%, transparent 70%, rgba(100,70,30,0.04) 100%)",
        }}
      />
    </div>
  );
}

function FoldCrease({ isUnfolding }: { isUnfolding: boolean }) {
  return (
    <>
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 pointer-events-none"
        style={{ width: 4, marginLeft: -2 }}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: isUnfolding ? 0 : 0.4 }}
        transition={{ duration: 1 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(to bottom,
              transparent 2%,
              rgba(139,105,20,0.15) 10%,
              rgba(139,105,20,0.28) 30%,
              rgba(139,105,20,0.35) 50%,
              rgba(139,105,20,0.28) 70%,
              rgba(139,105,20,0.15) 90%,
              transparent 98%
            )`,
          }}
        />
      </motion.div>
      <motion.div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: "calc(50% - 20px)",
          width: 40,
          background: `linear-gradient(to right,
            transparent,
            rgba(92,51,23,0.04) 30%,
            rgba(92,51,23,0.07) 45%,
            rgba(0,0,0,0.03) 50%,
            rgba(92,51,23,0.07) 55%,
            rgba(92,51,23,0.04) 70%,
            transparent
          )`,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isUnfolding ? 0 : 1 }}
        transition={{ duration: 1 }}
      />
    </>
  );
}

function OathText({
  text,
  phase,
  textStarted,
}: {
  text: string;
  phase: string;
  textStarted: boolean;
}) {
  return (
    <div className="min-h-[70px] flex flex-col items-center justify-center gap-3">
      <motion.p
        className="italic text-base sm:text-lg leading-relaxed"
        style={{
          color: "#2c1810",
          fontFamily: "IM Fell English, Georgia, serif",
          minHeight: "1.6rem",
          textShadow: "0 1px 2px rgba(92,51,23,0.1)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: textStarted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {text}
        {phase === "typing" && (
          <motion.span
            className="inline-block w-0.5 h-5 ml-0.5 align-middle"
            style={{ backgroundColor: "#5c3317" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.p>

      <AnimatePresence>
        {(phase === "response" || phase === "unfolding") && (
          <motion.p
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm tracking-[0.2em] uppercase"
            style={{
              color: "#c9a227",
              fontFamily: "Cinzel, serif",
              textShadow: "0 0 12px rgba(201,162,39,0.3)",
            }}
          >
            — Mischief Managed. —
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function UnfoldingIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "#8b6914", fontFamily: "Cinzel, serif" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Abrindo o mapa...
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
