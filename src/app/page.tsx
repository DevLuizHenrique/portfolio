import AmbientBackground from "@/presentation/components/shared/AmbientBackground";
import Navigation from "@/presentation/components/layout/Navigation";
import Footer from "@/presentation/components/layout/Footer";
import HeroSection from "@/presentation/components/sections/HeroSection";
import AboutSection from "@/presentation/components/sections/AboutSection";
import SkillsSection from "@/presentation/components/sections/SkillsSection";
import ProjectsSection from "@/presentation/components/sections/ProjectsSection";
import ContactSection from "@/presentation/components/sections/ContactSection";
import { createContainer } from "@/infrastructure/di/container";

export default async function Home() {
  const container = createContainer();
  const [personalInfo, projects, timeline, groups, extras] = await Promise.all([
    container.getPersonalInfo.execute(),
    container.getProjects.all(),
    container.getTimeline.all(),
    container.getSkills.groups(),
    container.getSkills.extras(),
  ]);

  const featuredProjects = projects.filter((project) => project.featured);
  const remainingProjects = projects.filter((project) => !project.featured);

  return (
    <>
      <AmbientBackground />
      <Navigation />
      <main>
        <HeroSection info={personalInfo} />
        <AboutSection info={personalInfo} timeline={timeline} />
        <SkillsSection groups={groups} extras={extras} />
        <ProjectsSection featured={featuredProjects} notFeatured={remainingProjects} />
        <ContactSection channels={personalInfo.contactChannels} />
      </main>
      <Footer />
    </>
  );
}
