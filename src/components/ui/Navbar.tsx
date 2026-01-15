import { motion } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
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
        <div className="glass-panel mx-8 mt-6 rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo / Name */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-foreground tracking-widest">
                LS
              </span>
              <div className="h-4 w-px bg-border" />
              <span className="font-mono text-xs text-muted-foreground tracking-wider">
                PORTFOLIO
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {SECTION_CONFIGS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                    activeSectionId === section.id
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
              href="#resume"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs tracking-wider hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-3.5 h-3.5" />
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
        <div className="glass-panel mx-4 mt-4 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-semibold text-foreground tracking-widest">
              LAKSH
            </span>

            <div className="flex items-center gap-3">
              <motion.a
                href="#resume"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs"
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3 h-3" />
                RESUME
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          className="glass-panel mx-4 mt-2 rounded-2xl overflow-hidden"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-2">
            {SECTION_CONFIGS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`w-full px-4 py-3 rounded-xl font-mono text-sm tracking-wider text-left transition-all ${
                  activeSectionId === section.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground/70 hover:bg-secondary/50'
                }`}
              >
                {section.label.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

export default Navbar;
