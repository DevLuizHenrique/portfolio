"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "../shared/SectionTitle";
import SkillBar from "../shared/SkillBar";
import { useSkills } from "@/presentation/hooks/useSkills";

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { groups, extras } = useSkills();

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle number="02" title="Skills" subtitle="Tecnologias e ferramentas" />

        <div className="grid md:grid-cols-3 gap-12">
          {groups.map((group, gi) => (
            <motion.div key={group.chamber} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }}>
              <h3 className="text-[10px] text-[var(--dim)] tracking-wider uppercase mb-5">{group.chamber}</h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-[var(--muted)]">{skill.name}</span>
                      <span className="text-[10px] font-mono text-[var(--dim)]">{skill.level}</span>
                    </div>
                    <SkillBar level={skill.level} delay={0.2 + gi * 0.08 + si * 0.05} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex flex-wrap gap-x-4 gap-y-2 mt-14 pt-8 border-t border-[var(--border)]" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          {extras.map((t) => <span key={t.name} className="text-[11px] text-[var(--dim)]">{t.name}</span>)}
        </motion.div>
      </div>
    </section>
  );
}
