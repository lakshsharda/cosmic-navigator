import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

// Cycled text items: name first, then roles
const TEXT_CYCLE = [
  'Laksh Sharda',
  'Full Stack Developer',
  'Android Developer',
  'AI / ML Enthusiast',
  'Problem Solver',
  'Tech Explorer',
  'Open Source Contributor',
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  depth: number;
}

// Generate stable stars using seeded random for consistent rendering
function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.4,
      duration: Math.random() * 3 + 2, // Faster motion (2-5s)
      delay: Math.random() * 3,
      depth: Math.random() * 3,
    });
  }
  return stars;
}

// Animated star field component with parallax and gentle twinkling
function AnimatedStarfield() {
  const stars = useMemo(() => generateStars(300), []);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => {
        // Vary star brightness and movement based on depth for parallax effect
        const baseOpacity = 0.3 + (star.depth / 3) * 0.3;
        const driftX = (Math.random() - 0.5) * 25 * (1 + star.depth);
        const driftY = (Math.random() - 0.5) * 20 * (1 + star.depth);
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-foreground"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: baseOpacity,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    // More animated twinkling and parallax drift
                    opacity: [baseOpacity * 0.3, baseOpacity * 1.2, baseOpacity * 0.3],
                    x: [0, driftX, 0],
                    y: [0, driftY, 0],
                    scale: [0.8, 1.3, 0.8],
                  }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

// Cosmic text transformation with dissolve-through-space effect
function CyclingTextAnimation({ text, isName }: { text: string; isName: boolean }) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="h-28 sm:h-32 md:h-36 lg:h-40 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          className="flex items-center justify-center"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { 
                  opacity: 0, 
                  y: 20, 
                  filter: 'blur(10px)',
                  scale: 0.95,
                }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)',
                  scale: 1,
                }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { 
                  opacity: 0, 
                  y: -20, 
                  filter: 'blur(10px)',
                  scale: 0.95,
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier for cosmic feel
          }}
        >
          {/* Cosmic floating text with soft gradient glow */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-wider bg-gradient-to-r from-cyan-200 via-primary to-purple-300 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 30px rgba(103, 232, 249, 0.3), 0 0 60px rgba(103, 232, 249, 0.15)',
              letterSpacing: '0.05em',
            }}
          >
            {text}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const isName = textIndex === 0;

  useEffect(() => {
    // All text changes every 2 seconds
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % TEXT_CYCLE.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Rich animated starfield background */}
      <AnimatedStarfield />

      {/* Nebula glow effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none"
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
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none"
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
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Single unified cycling text */}
          <CyclingTextAnimation text={TEXT_CYCLE[textIndex]} isName={isName} />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 inset-x-0 mx-auto w-fit flex flex-col items-center gap-2 cursor-pointer z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          aboutSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {/* Mouse shape */}
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-cyan-400/60 flex justify-center pt-2"
          style={{
            boxShadow: '0 0 15px rgba(34, 211, 238, 0.3), inset 0 0 10px rgba(34, 211, 238, 0.1)',
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Scroll wheel dot */}
          <motion.div
            className="w-1.5 h-3 rounded-full bg-cyan-400"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
            }}
          />
        </motion.div>
        
        {/* Scroll text */}
        <motion.span
          className="text-xs font-mono tracking-widest text-cyan-400/70 uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll Down
        </motion.span>
        
        {/* Animated arrows */}
        <motion.div className="flex flex-col items-center -mt-1">
          {[0, 1].map((i) => (
            <motion.svg
              key={i}
              width="16"
              height="8"
              viewBox="0 0 16 8"
              className="text-cyan-400/60"
              animate={{ y: [0, 3, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            >
              <path
                d="M1 1L8 7L15 1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
