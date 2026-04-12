"use client";

import { useState, useCallback } from "react";
import MapReveal from "@/presentation/components/map/MapReveal";
import OwlFollower from "@/presentation/components/shared/OwlFollower";
import Navigation from "@/presentation/components/layout/Navigation";
import Footer from "@/presentation/components/layout/Footer";
import HeroSection from "@/presentation/components/sections/HeroSection";
import AboutSection from "@/presentation/components/sections/AboutSection";
import SkillsSection from "@/presentation/components/sections/SkillsSection";
import ProjectsSection from "@/presentation/components/sections/ProjectsSection";
import ContactSection from "@/presentation/components/sections/ContactSection";
import SectionDivider from "@/presentation/components/shared/SectionDivider";
import { ContainerProvider } from "@/presentation/providers/ContainerProvider";

function PortfolioContent() {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <>
      <MapReveal onReveal={handleReveal} />

      {revealed && (
        <>
          <OwlFollower />
          <Navigation />
          <main>
            <HeroSection />
            <SectionDivider label="Câmara do Início · Corredor Principal" />
            <AboutSection />
            <SectionDivider label="Escada Rolante · Salão das Habilidades" />
            <SkillsSection />
            <SectionDivider label="Grande Corredor · Grande Salão de Obras" />
            <ProjectsSection />
            <SectionDivider label="Passagem Secreta · Torre dos Corvos" />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <ContainerProvider>
      <PortfolioContent />
    </ContainerProvider>
  );
}
