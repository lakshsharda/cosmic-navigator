import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/intro/IntroScreen';
import SpatialScene from '@/components/spatial/SpatialScene';
import SectionIndicator from '@/components/ui/SectionIndicator';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useFocusDetection, SECTION_CONFIGS } from '@/hooks/useFocusDetection';

/**
 * Main portfolio index page
 * Shows intro screen first, then transitions to 3D spatial experience
 */
const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle transition from intro to portfolio
  const handleScrollToPortfolio = () => {
    setShowIntro(false);
  };

  // Listen for scroll on intro screen
  useEffect(() => {
    if (!showIntro) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) {
        setShowIntro(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showIntro]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <IntroScreen onScrollToPortfolio={handleScrollToPortfolio} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Loading overlay for 3D scene */}
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
                  Entering Space
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
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SectionIndicator
                activeSectionId={activeSection?.id || null}
                activeSectionIndex={activeSectionIndex}
              />

              {/* Top-left branding */}
              <div className="fixed top-8 left-8 z-40">
                <motion.h1
                  className="font-mono text-sm font-medium text-foreground/80 tracking-widest"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  LAKSH SHARDA
                </motion.h1>
                <motion.p
                  className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  SPATIAL PORTFOLIO
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
