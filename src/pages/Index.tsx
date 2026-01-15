import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/intro/IntroScreen';
import CosmicLoader from '@/components/ui/CosmicLoader';
import ScrollNavbar from '@/components/sections/ScrollNavbar';
import StarBackground from '@/components/sections/StarBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import { ProjectModal, Project } from '@/components/projects/ProjectModal';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showCosmicLoader, setShowCosmicLoader] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('about');

  // Handle transition from intro to portfolio with cosmic loader
  const handleScrollToPortfolio = () => {
    setShowIntro(false);
    setShowCosmicLoader(true);
    setTimeout(() => {
      setShowCosmicLoader(false);
      setShowPortfolio(true);
    }, 2500);
  };

  // Listen for scroll on intro screen
  useEffect(() => {
    if (!showIntro) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) {
        handleScrollToPortfolio();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showIntro]);

  // Track active section based on scroll position
  useEffect(() => {
    if (!showPortfolio) return;

    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'achievements', 'education', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPortfolio]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <IntroScreen onScrollToPortfolio={handleScrollToPortfolio} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cosmic Loader */}
      <AnimatePresence>
        {showCosmicLoader && <CosmicLoader isVisible={showCosmicLoader} />}
      </AnimatePresence>

      {/* Main Portfolio */}
      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Star Background */}
            <StarBackground />

            {/* Navbar */}
            <ScrollNavbar activeSection={activeSection} />

            {/* Sections */}
            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection onProjectClick={handleProjectClick} />
              <SkillsSection />
              <AchievementsSection />
              <EducationSection />
              <ContactSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
