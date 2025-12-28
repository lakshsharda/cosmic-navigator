import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_CONFIGS } from '@/hooks/useFocusDetection';

interface SectionIndicatorProps {
  /** Currently active section ID */
  activeSectionId: string | null;
  /** Active section index */
  activeSectionIndex: number;
}

/**
 * Fixed UI indicator showing current active section
 * Minimal and professional - syncs with 3D scene
 */
export function SectionIndicator({
  activeSectionId,
  activeSectionIndex,
}: SectionIndicatorProps) {
  const activeSection = SECTION_CONFIGS.find(s => s.id === activeSectionId);

  return (
    <>
      {/* Left side dot navigation */}
      <div className="section-indicator">
        {SECTION_CONFIGS.map((section, index) => (
          <div
            key={section.id}
            className={`section-dot ${index === activeSectionIndex ? 'active' : ''}`}
            title={section.label}
          />
        ))}
      </div>

      {/* Bottom panel with current section name */}
      <div className="ui-panel">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-4"
            >
              <span className="spatial-label text-muted-foreground">
                {`0${activeSectionIndex + 1}`}
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="spatial-label text-primary text-glow">
                {activeSection.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint at the start */}
      <motion.div
        className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSectionIndex === 0 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span className="spatial-label text-muted-foreground/50 text-[10px]">
          Scroll to navigate
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary/50"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default SectionIndicator;
