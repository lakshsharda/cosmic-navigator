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
  // Space objects configuration - bigger and more visible
  const spaceObjects = [
    { type: 'saturn' as const, size: 100, initialX: 5, initialY: 8, duration: 20, delay: 0.3 },
    { type: 'star' as const, size: 25, initialX: 88, initialY: 10, duration: 15, delay: 0.5 },
    { type: 'planet' as const, size: 70, initialX: 82, initialY: 55, duration: 18, delay: 0.4 },
    { type: 'asteroid' as const, size: 55, initialX: 8, initialY: 65, duration: 14, delay: 0.6 },
    { type: 'nebula' as const, size: 200, initialX: 65, initialY: 75, duration: 25, delay: 0.2 },
  ];

  // Name letters

  const nameLetters = "LAKSH SHARDA".split('');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Animated star background */}
      <div className="absolute inset-0">
        {/* Multiple star layers */}
        {Array.from({ length: 200 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 5 === 0 ? 'hsl(195 85% 70%)' : 'hsl(210 20% 90%)',
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Nebula glow effects */}
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(250 60% 40% / 0.25), transparent 60%)',
            left: '5%',
            top: '10%',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(195 85% 40% / 0.2), transparent 60%)',
            right: '-5%',
            bottom: '5%',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Space Objects */}
      {spaceObjects.map((obj, index) => (
        <SpaceObject key={index} {...obj} />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Subtitle above name */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-[0.5em] text-primary/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ WELCOME TO MY UNIVERSE ✦
          </motion.p>
        </motion.div>

        {/* Name */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Background glow for name */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(195 85% 55% / 0.15), transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <h1 className="relative flex flex-wrap justify-center">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                className={`font-mono text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold cursor-default ${
                  letter === ' ' ? 'mx-3 md:mx-6' : 'mx-0.5 md:mx-1'
                }`}
                style={{
                  color: 'hsl(var(--foreground))',
                  textShadow: `
                    0 0 30px hsl(195 85% 55% / 0.5),
                    0 0 60px hsl(195 85% 55% / 0.3),
                    0 0 100px hsl(250 60% 55% / 0.2)
                  `,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -8,
                  textShadow: '0 0 60px hsl(195 85% 55% / 0.9), 0 0 120px hsl(195 85% 55% / 0.6)',
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                }}
              >
                {letter === ' ' ? '' : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Decorative animated line */}
        <motion.div
          className="mt-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div
            className="h-px w-48 md:w-72"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(195 85% 55%), hsl(250 60% 55%), hsl(195 85% 55%), transparent)',
            }}
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {/* Center diamond */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Role/title */}
        <motion.p
          className="mt-8 font-mono text-sm md:text-base tracking-[0.25em] text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            DEVELOPER
          </motion.span>
          <span className="mx-3 text-primary">•</span>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            DESIGNER
          </motion.span>
          <span className="mx-3 text-primary">•</span>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            CREATOR
          </motion.span>
        </motion.p>
      </div>

      {/* Scroll indicator - positioned at very bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        onClick={onScrollToPortfolio}
      >
        <motion.span
          className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-primary"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            textShadow: ['0 0 10px hsl(195 85% 55% / 0)', '0 0 20px hsl(195 85% 55% / 0.5)', '0 0 10px hsl(195 85% 55% / 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO EXPLORE
        </motion.span>
        
        <motion.div
          className="relative w-5 h-8 rounded-full border-2 border-primary/50 flex items-start justify-center pt-1.5"
          animate={{ 
            borderColor: ['hsl(195 85% 55% / 0.3)', 'hsl(195 85% 55% / 0.7)', 'hsl(195 85% 55% / 0.3)'],
            boxShadow: ['0 0 10px hsl(195 85% 55% / 0)', '0 0 15px hsl(195 85% 55% / 0.3)', '0 0 10px hsl(195 85% 55% / 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-primary/60" />
          <ChevronDown className="w-4 h-4 text-primary/30 -mt-2" />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <motion.div 
        className="absolute top-6 left-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary/60" />
        <div className="w-12 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </motion.div>
      <motion.div 
        className="absolute top-6 right-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-12 h-px bg-gradient-to-l from-primary/50 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-primary/60" />
      </motion.div>
    </div>
  );
}

export default IntroScreen;
