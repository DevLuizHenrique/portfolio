"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import CornerOrnaments from "../shared/CornerOrnaments";
import SkillBar from "../shared/SkillBar";
import { useSkills } from "@/presentation/hooks/useSkills";

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { groups, extras } = useSkills();

  return (
    <section
      id="skills"
      className="py-24 px-6"
      ref={ref}
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(139,105,20,0.05) 50%, transparent 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle number="II" title="Salão das Habilidades" subtitle="Os Feitiços Dominados pelo Cartógrafo" />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {groups.map((group, gi) => (
            <motion.div
              key={group.chamber}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + gi * 0.15 }}
            >
              <div className="map-card p-6 h-full">
                <CornerOrnaments />

                <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid rgba(139,105,20,0.3)" }}>
                  <div
                    className="w-8 h-8 flex items-center justify-center text-sm"
                    style={{ border: "1px solid #8b6914", color: "#8b6914", fontFamily: "Cinzel, serif" }}
                  >
                    {group.icon}
                  </div>
                  <h3 style={{ fontFamily: "Cinzel, serif", color: "#2c1810", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    {group.chamber}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="transition-all duration-200"
                      style={{ opacity: hoveredSkill && hoveredSkill !== skill.name ? 0.5 : 1 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#3d2010" }}>
                          {skill.name}
                        </span>
                        <span className="text-xs" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillBar level={skill.level} delay={0.4 + gi * 0.1 + si * 0.08} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
            — Outros Encantamentos Conhecidos —
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {extras.map((tech) => (
              <span key={tech.name} className="map-badge">
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
