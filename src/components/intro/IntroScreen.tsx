import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SpaceObject } from './SpaceObject';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro hero screen with animated space objects and name
 */
export function IntroScreen({ onScrollToPortfolio }: IntroScreenProps) {
  // Space objects configuration
  const spaceObjects = [
    { type: 'planet' as const, size: 120, initialX: 8, initialY: 15, duration: 18, delay: 0.2 },
    { type: 'ring' as const, size: 80, initialX: 85, initialY: 12, duration: 25, delay: 0.5 },
    { type: 'asteroid' as const, size: 50, initialX: 5, initialY: 70, duration: 12, delay: 0.3 },
    { type: 'moon' as const, size: 45, initialX: 88, initialY: 65, duration: 15, delay: 0.7 },
    { type: 'comet' as const, size: 40, initialX: 70, initialY: 80, duration: 20, delay: 1 },
  ];

  // Letter animation for name
  const nameLetters = "LAKSH SHARDA".split('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Animated star background */}
      <div className="absolute inset-0">
        {/* Static stars layer */}
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebula glow effects */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(250 60% 45%), transparent)',
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(195 85% 45%), transparent)',
            right: '5%',
            bottom: '10%',
          }}
        />
      </div>

      {/* Space Objects */}
      {spaceObjects.map((obj, index) => (
        <SpaceObject key={index} {...obj} />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Subtitle above name */}
        <motion.p
          className="font-mono text-xs tracking-[0.4em] text-primary/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          WELCOME TO MY UNIVERSE
        </motion.p>

        {/* Animated Name */}
        <motion.h1
          className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 perspective-1000"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className={`font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider ${
                letter === ' ' ? 'w-4 md:w-8' : ''
              }`}
              variants={letterVariants}
              style={{
                textShadow: `
                  0 0 20px hsl(195 85% 55% / 0.5),
                  0 0 40px hsl(195 85% 55% / 0.3),
                  0 0 80px hsl(250 60% 55% / 0.2)
                `,
                color: 'hsl(var(--foreground))',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="mt-8 h-px w-32 md:w-48"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(195 85% 55%), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Role/title */}
        <motion.p
          className="mt-6 font-mono text-sm md:text-base tracking-[0.2em] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          DEVELOPER • DESIGNER • CREATOR
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        onClick={onScrollToPortfolio}
      >
        <motion.span
          className="font-mono text-xs tracking-[0.3em] text-primary/70"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO EXPLORE
        </motion.span>
        
        <motion.div
          className="relative w-6 h-10 rounded-full border border-primary/40 flex items-start justify-center p-1"
          animate={{ borderColor: ['hsl(195 85% 55% / 0.4)', 'hsl(195 85% 55% / 0.7)', 'hsl(195 85% 55% / 0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-primary/50" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary/50" />
        <div className="w-8 h-px bg-primary/30" />
      </div>
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="w-8 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50" />
      </div>
      <div className="absolute bottom-8 left-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent/50" />
        <div className="w-8 h-px bg-accent/30" />
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <div className="w-8 h-px bg-accent/30" />
        <div className="w-2 h-2 rounded-full bg-accent/50" />
      </div>
    </div>
  );
}

export default IntroScreen;
