import { useState, useEffect, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import SpatialScene from '@/components/spatial/SpatialScene';
import SectionIndicator from '@/components/ui/SectionIndicator';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useFocusDetection, SECTION_CONFIGS } from '@/hooks/useFocusDetection';

/**
 * Main portfolio index page
 * Orchestrates the 3D spatial scene with UI overlays
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate brief loading for smooth entry
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get scroll progress for UI sync
  const { smoothProgress } = useScrollProgress({
    scrollDistance: 4000,
    smoothing: 0.06,
  });

  // Calculate camera Z for focus detection
  const startZ = 8;
  const endZ = -75;
  const cameraZ = startZ + (endZ - startZ) * smoothProgress;

  // Focus detection for UI
  const { activeSection, activeSectionIndex } = useFocusDetection(
    SECTION_CONFIGS,
    cameraZ,
    8
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Loading overlay */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <span className="spatial-label text-muted-foreground">
            Initializing Space
          </span>
        </motion.div>
      </motion.div>

      {/* 3D Spatial Scene */}
      <Suspense fallback={null}>
        <SpatialScene />
      </Suspense>

      {/* UI Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SectionIndicator
          activeSectionId={activeSection?.id || null}
          activeSectionIndex={activeSectionIndex}
        />

        {/* Top-left branding (minimal) */}
        <div className="fixed top-8 left-8 z-40">
          <motion.h1
            className="font-mono text-sm font-medium text-foreground/80 tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            PORTFOLIO
          </motion.h1>
          <motion.p
            className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            SPATIAL EXPERIENCE
          </motion.p>
        </div>

        {/* Top-right progress indicator */}
        <div className="fixed top-8 right-8 z-40 flex items-center gap-3">
          <motion.span
            className="spatial-label text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Math.round(smoothProgress * 100)}%
          </motion.span>
          <motion.div
            className="w-24 h-0.5 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-primary/60 rounded-full origin-left"
              style={{ scaleX: smoothProgress }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
