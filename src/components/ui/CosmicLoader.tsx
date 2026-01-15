import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface CosmicLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

/**
 * Premium cosmic loading screen with space-warp star travel effect
 * Displays during transition from intro to portfolio
 */
export function CosmicLoader({ isVisible, onComplete }: CosmicLoaderProps) {
  // Generate stars that travel outward from center
  const travelingStars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 80 + Math.random() * 0.3;
      return {
        id: i,
        x: Math.cos(angle),
        y: Math.sin(angle),
        size: 1 + Math.random() * 2,
        delay: Math.random() * 0.8,
        duration: 1.5 + Math.random() * 1,
      };
    });
  }, []);

  // Background ambient stars
  const ambientStars = useMemo<Star[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      onAnimationComplete={() => {
        if (!isVisible && onComplete) onComplete();
      }}
    >
      {/* Deep dark space background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #060a12 0%, #020408 60%, #000000 100%)',
        }}
      />

      {/* Subtle ambient stars */}
      <div className="absolute inset-0">
        {ambientStars.map((star) => (
          <motion.div
            key={`ambient-${star.id}`}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: star.id % 3 === 0 ? 'rgba(165, 243, 252, 0.6)' : 'rgba(255, 255, 255, 0.5)',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Space warp - Stars traveling outward from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {travelingStars.map((star) => (
          <motion.div
            key={`travel-${star.id}`}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              backgroundColor: star.id % 4 === 0 ? 'rgba(165, 243, 252, 0.9)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: star.id % 4 === 0 
                ? '0 0 4px rgba(165, 243, 252, 0.5)' 
                : '0 0 2px rgba(255, 255, 255, 0.3)',
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              x: star.x * 800,
              y: star.y * 500,
              opacity: [0, 0.9, 0.6, 0],
              scale: [0.3, 1, 1.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Subtle radial light from center */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(165, 243, 252, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Central text content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          className="font-mono text-xs tracking-[0.25em] uppercase"
          style={{
            color: 'rgba(226, 232, 240, 0.85)',
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.85, 0.6, 0.85],
          }}
          transition={{ 
            duration: 2.5, 
            times: [0, 0.3, 0.6, 1],
            ease: 'easeInOut',
          }}
        >
          Initializing Systems…
        </motion.p>
      </div>
    </motion.div>
  );
}

export default CosmicLoader;
