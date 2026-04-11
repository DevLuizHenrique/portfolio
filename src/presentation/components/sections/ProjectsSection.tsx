"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import CornerOrnaments from "../shared/CornerOrnaments";
import { useProjects } from "@/presentation/hooks/useProjects";
import type { Project, ProjectStatus } from "@/domain/entities/Project";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  "Completo": "#5c3317",
  "Em Produção": "#3d7a3d",
  "Open Source": "#2e4d7a",
  "Em Desenvolvimento": "#7a5c2e",
};

function FeaturedProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.href}
      className="map-card p-8 block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CornerOrnaments />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
          {project.room}
        </span>
        <span
          className="text-xs px-3 py-1"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid",
            borderColor: STATUS_COLORS[project.status],
            color: STATUS_COLORS[project.status],
          }}
        >
          {project.status}
        </span>
      </div>

      <div className="h-px mb-4" style={{ background: "linear-gradient(to right, #8b6914, transparent)" }} />

      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "IM Fell English, Georgia, serif", color: "#5c3317" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span key={tag} className="map-badge">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ fontFamily: "Cinzel, serif", color: "#8b6914" }}>
          Anno Domini {project.year}
        </span>
        <motion.span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "Cinzel, serif", color: "#5c3317" }}
          animate={{ x: hovered ? 4 : 0 }}
        >
          Explorar →
        </motion.span>
      </div>
    </a>
  );
}

function CompactProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.href} className="map-card p-6 block group">
      <CornerOrnaments />

      <div className="flex items-start justify-between mb-3">
        <span style={{ fontFamily: "Cinzel, serif", color: "#8b6914", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {project.room}
        </span>
        <span style={{ fontFamily: "Cinzel, serif", color: "#a88050", fontSize: "0.65rem" }}>
          {project.year}
        </span>
      </div>

      <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Cinzel, serif", color: "#2c1810" }}>
        {project.title}
      </h3>

      <p
        className="text-xs leading-relaxed mb-4"
        style={{
          fontFamily: "IM Fell English, Georgia, serif",
          color: "#5c3317",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="map-badge" style={{ fontSize: "0.55rem" }}>{tag}</span>
        ))}
        {project.tags.length > 3 && (
          <span className="map-badge" style={{ fontSize: "0.55rem" }}>+{project.tags.length - 3}</span>
        )}
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { featured, notFeatured } = useProjects();

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle number="III" title="Grande Salão de Obras" subtitle="Os Mapas Traçados e as Rotas Percorridas" />

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <FeaturedProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {notFeatured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <CompactProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
