"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "../shared/SectionTitle";
import CornerOrnaments from "../shared/CornerOrnaments";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";
import { useTimeline } from "@/presentation/hooks/useTimeline";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const info = usePersonalInfo();
  const timeline = useTimeline();

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle number="I" title="Câmara do Início" subtitle="A Origem do Cartógrafo" />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="map-card p-8">
              <CornerOrnaments />
              <h3
                className="font-cinzel text-xl mb-6 pb-3"
                style={{ fontFamily: "Cinzel, serif", color: "#5c3317", borderBottom: "1px solid rgba(139,105,20,0.4)" }}
              >
                O Cartógrafo
              </h3>

              <div className="space-y-4 font-fell leading-relaxed" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#3d2010" }}>
                {info.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                {info.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs tracking-[0.15em] uppercase transition-colors hover:!text-[#5c3317]"
                    style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {info.stats.map((stat) => (
                <div key={stat.label} className="map-card p-4 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", color: "#5c3317" }}>
                    {stat.value}
                  </div>
                  <div
                    className="text-xs leading-tight"
                    style={{ fontFamily: "IM Fell English, serif", color: "#8b6914", whiteSpace: "pre-line" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-sm tracking-[0.25em] uppercase mb-8" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
              — Linha do Tempo —
            </h3>

            <div className="relative">
              <div
                className="absolute left-[22px] top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, #8b6914 10%, #8b6914 90%, transparent)" }}
              />

              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-11 h-11 flex items-center justify-center text-xs font-bold relative z-10"
                        style={{ fontFamily: "Cinzel, serif", backgroundColor: "#f0e6c8", border: "1px solid #8b6914", color: "#5c3317" }}
                      >
                        {item.year.slice(2)}
                      </div>
                    </div>
                    <div className="pb-4">
                      <h4 className="text-sm mb-1" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#6b4c2a" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
