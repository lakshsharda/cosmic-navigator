import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro screen with full background video (with audio) and mute toggle
 */
const ROLES = [
  ['DEVELOPER', 'DESIGNER', 'CREATOR'],
  ['THINKER', 'BUILDER', 'CREATOR'],
  ['CODER', 'DESIGNER', 'INNOVATOR'],
  ['ENGINEER', 'DESIGNER', 'BUILDER'],
  ['CREATOR', 'STRATEGIST', 'DEVELOPER'],
  ['IDEATOR', 'BUILDER', 'MAKER'],
  ['TECHIE', 'DESIGNER', 'CREATOR'],
  ['BUILDER', 'LEADER', 'CREATOR'],
  ['DEVELOPER', 'INNOVATOR', 'LEADER'],
  ['THINK', 'BUILD', 'CREATE'],
  ['CODE', 'DESIGN', 'DEPLOY'],
  ['IDEAS', 'TECH', 'IMPACT'],
  ['DESIGN', 'DEVELOP', 'DELIVER'],
  ['BUILD', 'DESIGN', 'SCALE'],
  ['CREATE', 'CODE', 'LEAD'],
];

export function IntroScreen({ onScrollToPortfolio }: IntroScreenProps) {
  const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/intro-bg.mp4`;

  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Show content after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through roles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Name letters for hover effect
  const nameLetters = "LAKSH SHARDA".split('');

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video with audio */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Dark overlay for better text visibility */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.5 : 0.2 }}
        transition={{ duration: 1 }}
      />

      {/* Mute toggle button - top right */}
      <motion.button
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-colors"
        onClick={toggleMute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-primary/60" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </motion.button>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Name with glow */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(195 85% 55% / 0.2), transparent 70%)',
                }}
              />
              
              <h1 className="relative flex flex-wrap justify-center">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className={`font-mono text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold cursor-default ${
                      letter === ' ' ? 'mx-3 md:mx-6' : 'mx-0.5 md:mx-1'
                    }`}
                    style={{
                      color: 'hsl(210 20% 98%)',
                      textShadow: `
                        0 0 30px hsl(195 85% 55% / 0.6),
                        0 0 60px hsl(195 85% 55% / 0.4),
                        0 0 100px hsl(250 60% 55% / 0.3)
                      `,
                    }}
                    whileHover={{
                      scale: 1.2,
                      y: -8,
                      textShadow: '0 0 60px hsl(195 85% 55% / 1), 0 0 120px hsl(195 85% 55% / 0.8)',
                      transition: { type: 'spring', stiffness: 400, damping: 15 },
                    }}
                  >
                    {letter === ' ' ? '' : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="mt-10 relative"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div
                className="h-px w-48 md:w-72"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(195 85% 55%), hsl(250 60% 55%), hsl(195 85% 55%), transparent)',
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
            </motion.div>

            {/* Role/title - cycles every 4s */}
            <motion.div
              className="mt-8 font-mono text-sm md:text-base tracking-[0.25em] text-white/80 h-6 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <span>{ROLES[roleIndex][0]}</span>
                  <span className="mx-3 text-primary">•</span>
                  <span>{ROLES[roleIndex][1]}</span>
                  <span className="mx-3 text-primary">•</span>
                  <span>{ROLES[roleIndex][2]}</span>
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Scroll indicator - centered below content */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-3 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              onClick={onScrollToPortfolio}
            >
              <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-primary text-center">
                SCROLL TO EXPLORE
              </span>
              
              <motion.div 
                className="flex flex-col items-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5 text-primary/80" />
                <ChevronDown className="w-5 h-5 text-primary/50 -mt-3" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner accent - left only */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            className="absolute top-6 left-6 flex items-center gap-2 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary/70" />
            <div className="w-12 h-px bg-gradient-to-r from-primary/60 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default IntroScreen;
