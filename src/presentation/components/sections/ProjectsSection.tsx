"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "../shared/SectionTitle";
import type { Project } from "@/domain/entities/Project";

function ProjectRow({ project }: { project: Project }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {project.title}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
              {project.room}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {project.description}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] font-mono text-[var(--dim)]">
            {project.year}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--dim)]">
            {project.status}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] text-[var(--dim)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 text-[11px] text-[var(--accent)]">
        {project.href ? project.accessLabel ?? "Ver projeto" : project.accessLabel ?? "Detalhes sob demanda"}
      </div>
    </>
  );

  if (!project.href) {
    return (
      <article className="group border-b border-[var(--border)] py-6">
        {content}
      </article>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-[var(--border)] py-6"
    >
      {content}
    </a>
  );
}

interface ProjectsSectionProps {
  readonly featured: readonly Project[];
  readonly notFeatured: readonly Project[];
}

export default function ProjectsSection({
  featured,
  notFeatured,
}: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Projetos"
          subtitle="Trabalhos selecionados"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {[...featured, ...notFeatured].map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
