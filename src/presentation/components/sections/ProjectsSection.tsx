"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "../shared/SectionTitle";
import { useProjects } from "@/presentation/hooks/useProjects";
import type { Project } from "@/domain/entities/Project";

function ProjectRow({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline justify-between py-4 border-b border-[var(--border)] group"
    >
      <div className="flex items-baseline gap-3 min-w-0">
        <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
          {project.title}
        </span>
        <span className="text-[10px] text-[var(--dim)] hidden sm:inline shrink-0">{project.tags.join(" / ")}</span>
      </div>
      <span className="text-[10px] font-mono text-[var(--dim)] shrink-0 ml-4">{project.year}</span>
    </a>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { featured, notFeatured } = useProjects();

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle number="03" title="Projetos" subtitle="Trabalhos selecionados" />

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          {[...featured, ...notFeatured].map((p) => <ProjectRow key={p.id} project={p} />)}
        </motion.div>
      </div>
    </section>
  );
}
