import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_CONFIGS } from '@/hooks/useFocusDetection';

interface SectionIndicatorProps {
  activeSectionId: string | null;
  activeSectionIndex: number;
}

/**
 * UI indicator for current section
 * Syncs with 3D focus state - no decorative animation
 */
export function SectionIndicator({
  activeSectionId,
  activeSectionIndex,
}: SectionIndicatorProps) {
  const activeSection = SECTION_CONFIGS.find((s) => s.id === activeSectionId);

  return (
    <>
      {/* Vertical dot navigation */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {SECTION_CONFIGS.map((section, index) => (
          <div
            key={section.id}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === activeSectionIndex
                ? 'bg-primary scale-110'
                : 'bg-muted-foreground/25'
            }`}
            title={section.label}
          />
        ))}
      </div>

      {/* Current section label */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 glass-panel rounded-md">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[10px] text-muted-foreground">
                {`0${activeSectionIndex + 1}`}
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="font-mono text-[11px] text-foreground/80 tracking-wider">
                {activeSection.label.toUpperCase()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint (only at start) */}
      {activeSectionIndex === 0 && (
        <motion.div
          className="fixed bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-[9px] text-muted-foreground tracking-wider">
            SCROLL
          </span>
          <div className="w-3 h-5 rounded-full border border-muted-foreground/30 flex items-start justify-center p-0.5">
            <motion.div
              className="w-0.5 h-1 rounded-full bg-muted-foreground/40"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default SectionIndicator;
