"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillBarProps {
  level: number;
  delay: number;
}

export default function SkillBar({ level, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="skill-bar-track flex-1">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </div>
  );
}
