import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface ScrollNavbarProps {
  activeSection: string | null;
}

export function ScrollNavbar({ activeSection }: ScrollNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mx-4 lg:mx-8 mt-4 lg:mt-6 rounded-full px-4 lg:px-6 py-2.5 lg:py-3 bg-background/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            {/* Logo / Name */}
            <div className="flex items-center gap-2 lg:gap-3">
              <span className="font-mono text-xs lg:text-sm font-semibold text-foreground tracking-widest">
                LS
              </span>
              <div className="h-3 lg:h-4 w-px bg-border" />
              <span className="font-mono text-[10px] lg:text-xs text-muted-foreground tracking-wider">
                PORTFOLIO
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-0.5 lg:gap-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full font-mono text-[10px] lg:text-xs tracking-wider transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {section.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] lg:text-xs tracking-wider hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              RESUME
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 bg-background/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs sm:text-sm font-semibold text-foreground tracking-widest">
              LAKSH
            </span>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] sm:text-xs"
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                RESUME
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mx-3 sm:mx-4 mt-2 rounded-2xl overflow-hidden bg-background/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                {SECTIONS.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm tracking-wider text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-foreground/70 hover:bg-secondary/50 active:bg-secondary/70'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {section.label.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ScrollNavbar;
