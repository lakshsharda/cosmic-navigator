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

      {/* Scroll hint at the start - positioned at bottom */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSectionIndex === 0 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-muted-foreground/50 flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <span className="spatial-label text-foreground/70 text-[11px] font-medium">
          Scroll to navigate
        </span>
      </motion.div>
    </>
  );
}

export default SectionIndicator;
