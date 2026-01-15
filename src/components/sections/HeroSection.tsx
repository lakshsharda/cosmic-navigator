import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const TITLES = [
  'Laksh Sharda',
  'Full Stack Developer',
  'Android Developer',
  'AI/ML Engineer',
  'Cloud Developer',
  'Problem Solver',
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated cosmic background - subtle stars only */}
      <div className="absolute inset-0">
        {/* Stars layer */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/60"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula glow effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Cycling Title */}
          <div className="h-28 sm:h-36 md:h-44 relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={titleIndex}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight absolute whitespace-nowrap"
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  rotateX: -90,
                  filter: 'blur(10px)',
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                }}
                exit={{ 
                  opacity: 0, 
                  y: -60,
                  rotateX: 90,
                  filter: 'blur(10px)',
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span 
                  className={`inline-block ${
                    titleIndex === 0 
                      ? 'bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_100%]' 
                      : 'bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent'
                  }`}
                  style={titleIndex === 0 ? {
                    animation: 'gradient-shift 4s ease infinite',
                  } : undefined}
                >
                  {TITLES[titleIndex]}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtle role indicator dots */}
          <motion.div 
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {TITLES.map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === titleIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-foreground/30'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
