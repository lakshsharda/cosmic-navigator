import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Navbar } from '@/components/ui/Navbar';

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      about: aboutRef,
      experience: experienceRef,
      projects: projectsRef,
      skills: skillsRef,
      achievements: achievementsRef,
      contact: contactRef,
    };

    const ref = refs[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar onNavigate={scrollToSection} activeSectionId={null} />

      {/* Hero Section */}
      <HeroSection onScrollDown={() => scrollToSection('about')} />

      {/* Main Content */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div ref={aboutRef}>
            <AboutSection />
          </div>

          <div ref={experienceRef}>
            <ExperienceSection />
          </div>

          <div ref={projectsRef}>
            <ProjectsSection />
          </div>

          <div ref={skillsRef}>
            <SkillsSection />
          </div>

          <div ref={achievementsRef}>
            <AchievementsSection />
          </div>

          <div ref={contactRef}>
            <ContactSection />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
