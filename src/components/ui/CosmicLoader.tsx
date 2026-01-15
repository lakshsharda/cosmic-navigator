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
  // Generate stars that travel outward from center - more stars with depth variation
  const travelingStars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 150 + Math.random() * 0.4;
      const speedFactor = 0.6 + Math.random() * 0.8; // Depth variation - some faster than others
      return {
        id: i,
        x: Math.cos(angle),
        y: Math.sin(angle),
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 0.6,
        duration: (1.2 + Math.random() * 0.8) / speedFactor,
      };
    });
  }, []);

  // Background ambient stars - more visible
  const ambientStars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.8 + Math.random() * 1.5,
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1.5,
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

      {/* Subtle ambient stars - brighter */}
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
              backgroundColor: star.id % 3 === 0 ? 'rgba(165, 243, 252, 0.85)' : 'rgba(255, 255, 255, 0.75)',
              boxShadow: star.id % 3 === 0 
                ? '0 0 3px rgba(165, 243, 252, 0.4)' 
                : '0 0 2px rgba(255, 255, 255, 0.3)',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
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

      {/* Space warp - Stars traveling outward from center with depth variation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {travelingStars.map((star) => {
          const isCyan = star.id % 4 === 0;
          const travelDistance = 600 + (star.size / 4) * 400; // Larger stars travel further (closer to camera)
          return (
            <motion.div
              key={`travel-${star.id}`}
              className="absolute rounded-full"
              style={{
                width: star.size,
                height: star.size,
                backgroundColor: isCyan ? 'rgba(165, 243, 252, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: isCyan 
                  ? '0 0 6px rgba(165, 243, 252, 0.7), 0 0 12px rgba(165, 243, 252, 0.3)' 
                  : '0 0 4px rgba(255, 255, 255, 0.5)',
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                x: star.x * travelDistance,
                y: star.y * travelDistance * 0.6,
                opacity: [0, 1, 0.8, 0],
                scale: [0.2, 1.2, 1.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
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
          className="font-mono text-xs tracking-[0.3em] uppercase text-center"
          style={{
            color: 'rgba(220, 240, 255, 0.9)',
            textShadow: '0 0 10px rgba(165, 243, 252, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.9, 0.7, 0.9],
          }}
          transition={{ 
            duration: 2, 
            times: [0, 0.25, 0.6, 1],
            ease: 'easeInOut',
          }}
        >
          Initializing Core Systems…
        </motion.p>
      </div>
    </motion.div>
  );
}

export default CosmicLoader;
