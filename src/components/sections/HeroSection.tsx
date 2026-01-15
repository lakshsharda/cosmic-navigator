import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const TITLES = [
  'Laksh Sharda',
  'Full Stack Developer',
  'Android Developer',
  'AI/ML Engineer',
  'Problem Solver',
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0">
        {/* Stars layer */}
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-20 bg-gradient-to-b from-white via-white/50 to-transparent"
            style={{
              left: `${15 + i * 25}%`,
              top: '-10%',
              rotate: '45deg',
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: ['0vw', '30vw'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 4 + Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Nebula glow effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
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
          <div className="h-24 sm:h-32 md:h-40 relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={titleIndex}
                className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight absolute"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span 
                  className={`inline-block ${
                    titleIndex === 0 
                      ? 'bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_100%]' 
                      : 'text-primary'
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
        </motion.div>
      </div>

      {/* Subtle ambient particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </section>
  );
}

export default HeroSection;