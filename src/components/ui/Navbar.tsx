import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SECTION_CONFIGS } from '@/hooks/useFocusDetection';

interface NavbarProps {
  activeSectionId: string | null;
  onNavigate?: (sectionId: string) => void;
}

/**
 * Fixed navbar with navigation links and resume button
 */
export function Navbar({ activeSectionId, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
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
    onNavigate?.(sectionId);
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
        <div className="mx-4 lg:mx-8 mt-4 lg:mt-6 rounded-full px-5 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-background/20 via-background/30 to-background/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between">
            {/* Logo / Name */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-mono text-sm lg:text-base font-bold text-foreground tracking-wide bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Laksh Sharda
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1 lg:gap-2">
              {SECTION_CONFIGS.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`px-3 lg:px-5 py-2 rounded-full font-mono text-[10px] lg:text-xs tracking-wider transition-all duration-300 relative overflow-hidden ${
                    activeSectionId === section.id
                      ? 'bg-primary/30 text-primary border border-primary/40'
                      : 'text-foreground/80 hover:text-foreground hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSectionId === section.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      layoutId="activeSection"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{section.label.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/40 text-primary font-mono text-[10px] lg:text-xs tracking-wider hover:from-primary/30 hover:to-primary/20 hover:border-primary/60 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(var(--primary),0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
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
        <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-2xl px-4 py-3 bg-gradient-to-r from-background/20 via-background/30 to-background/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-foreground tracking-wide bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Laksh Sharda
            </span>

            <div className="flex items-center gap-3">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono text-[10px]"
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3 h-3" />
                RESUME
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground rounded-lg hover:bg-white/10 transition-colors"
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
              className="mx-3 sm:mx-4 mt-2 rounded-2xl overflow-hidden bg-gradient-to-b from-background/30 to-background/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-4 space-y-2">
                {SECTION_CONFIGS.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`w-full px-4 py-3 rounded-xl font-mono text-sm tracking-wider text-left transition-all ${
                      activeSectionId === section.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-foreground/80 hover:bg-white/10 active:bg-white/20'
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
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

export default Navbar;
