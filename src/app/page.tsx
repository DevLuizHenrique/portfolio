"use client";

import AmbientBackground from "@/presentation/components/shared/AmbientBackground";
import Navigation from "@/presentation/components/layout/Navigation";
import Footer from "@/presentation/components/layout/Footer";
import HeroSection from "@/presentation/components/sections/HeroSection";
import AboutSection from "@/presentation/components/sections/AboutSection";
import SkillsSection from "@/presentation/components/sections/SkillsSection";
import ProjectsSection from "@/presentation/components/sections/ProjectsSection";
import ContactSection from "@/presentation/components/sections/ContactSection";
import { ContainerProvider } from "@/presentation/providers/ContainerProvider";

export default function Home() {
  return (
    <ContainerProvider>
      <AmbientBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </ContainerProvider>
  );
}
