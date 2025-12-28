import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import SpatialScene from '@/components/spatial/SpatialScene';
import SectionIndicator from '@/components/ui/SectionIndicator';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useFocusDetection, SECTION_CONFIGS } from '@/hooks/useFocusDetection';

/**
 * Main portfolio page
 * 
 * Structure:
 * - 3D spatial scene handles camera and section rendering
 * - UI overlay syncs with current focus state
 * - Scroll drives progression through Z-axis
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll progress for UI
  const { smoothProgress } = useScrollProgress({
    scrollDistance: 4000,
    smoothing: 0.06,
  });

  // Calculate camera Z for focus detection
  const startZ = 10;
  const endZ = -82;
  const cameraZ = startZ + (endZ - startZ) * smoothProgress;

  // Determine active section for UI
  const { activeSection, activeSectionIndex } = useFocusDetection(
    SECTION_CONFIGS,
    cameraZ,
    10
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Loading state */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="w-6 h-6 rounded-full border border-muted border-t-primary/60 animate-spin" />
      </motion.div>

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <SpatialScene />
      </Suspense>

      {/* UI Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <SectionIndicator
          activeSectionId={activeSection?.id || null}
          activeSectionIndex={activeSectionIndex}
        />

        {/* Minimal branding */}
        <div className="fixed top-6 left-6 z-40">
          <h1 className="font-mono text-xs font-medium text-foreground/60 tracking-widest">
            PORTFOLIO
          </h1>
        </div>

        {/* Progress */}
        <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground">
            {Math.round(smoothProgress * 100)}%
          </span>
          <div className="w-12 h-px bg-muted">
            <div
              className="h-full bg-primary/50"
              style={{ width: `${smoothProgress * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
