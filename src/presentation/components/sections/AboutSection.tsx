"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "../shared/SectionTitle";
import { usePersonalInfo } from "@/presentation/hooks/usePersonalInfo";

import { useTimeline } from "@/presentation/hooks/useTimeline";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const hookInfo = usePersonalInfo();
  const info = hookInfo;
  const timeline = useTimeline();

  const visible = isInView || !!info;

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle number="01" title="Sobre" subtitle="Um pouco sobre mim" />

        {info ? (
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
              <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
                {info.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="flex gap-6 mt-8">
                {info.socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--dim)] hover:text-[var(--accent)] transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex gap-10 mt-10 pt-8 border-t border-[var(--border)]">
                {info.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-semibold text-[var(--foreground)]">{s.value}</div>
                    <div className="text-[10px] text-[var(--dim)] mt-0.5" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} className="flex gap-5" initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}>
                    <span className="text-[10px] font-mono text-[var(--dim)] pt-1 w-8 shrink-0">{item.year}</span>
                    <div>
                      <h4 className="text-sm text-[var(--foreground)]">{item.title}</h4>
                      <p className="text-xs text-[var(--dim)] mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="h-40 bg-transparent" />
        )}
      </div>
    </section>
  );
}
