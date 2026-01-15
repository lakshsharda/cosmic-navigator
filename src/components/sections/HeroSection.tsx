import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ROLES = [
  'Full Stack Developer',
  'Android Developer',
  'AI/ML Engineer',
  'Problem Solver',
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0">
        {/* Stars layer */}
        {[...Array(150)].map((_, i) => (
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
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: '-10%',
              rotate: '45deg',
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: ['0vw', '30vw'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 3 + Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Nebula glow effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Main Name */}
          <motion.h1
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-foreground mb-8 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              Laksh Sharda
            </motion.span>
          </motion.h1>

          {/* Cycling Roles */}
          <div className="h-12 sm:h-14 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                className="text-xl sm:text-2xl md:text-3xl font-mono text-primary absolute inset-x-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-primary/30 to-transparent"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(20px)',
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </section>
  );
}

export default HeroSection;
