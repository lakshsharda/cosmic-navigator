import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { CosmicExplosion } from './CosmicExplosion';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro screen with real-time Three.js cosmic explosion and space ambient audio
 */
export function IntroScreen({ onScrollToPortfolio }: IntroScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [explosionProgress, setExplosionProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Name letters for hover effect
  const nameLetters = "LAKSH SHARDA".split('');

  // Animate explosion progress over 8 seconds
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const duration = 8000; // 8 seconds for explosion
      
      // Progress with easing
      const rawProgress = Math.min(elapsed / duration, 1);
      setExplosionProgress(rawProgress);
      
      // Show content at the end
      if (rawProgress >= 1 && !showContent) {
        setShowContent(true);
      }
      
      // Continue animation for subtle drift after explosion
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [showContent]);

  // Toggle audio
  const toggleAudio = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (audioEnabled) {
      audioEl.pause();
      setAudioEnabled(false);
      return;
    }

    try {
      audioEl.muted = false;
      audioEl.volume = 0.5;
      await audioEl.play();
      setAudioEnabled(true);
    } catch (e) {
      console.error('Audio play failed (autoplay blocked?)', e);
      setAudioEnabled(false);
    }
  };

  // Best-effort: enable sound on the first user interaction anywhere
  useEffect(() => {
    const onFirstPointerDown = () => {
      if (audioEnabled) return;
      void toggleAudio();
      window.removeEventListener('pointerdown', onFirstPointerDown);
    };

    window.addEventListener('pointerdown', onFirstPointerDown, { once: true });
    return () => window.removeEventListener('pointerdown', onFirstPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioEnabled]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Three.js Cosmic Explosion */}
      <div className="absolute inset-0">
        <CosmicExplosion explosionProgress={explosionProgress} />
      </div>

      {/* Space Ambient Audio */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/10/25/audio_32de2e3e82.mp3"
        loop
        preload="auto"
      />

      {/* Dark overlay for better text visibility - fades in as explosion completes */}
      <motion.div
        className="absolute inset-0 bg-black/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Sound toggle button */}
      <motion.button
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-colors"
        onClick={toggleAudio}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {audioEnabled ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-primary/60" />
        )}
      </motion.button>

      {/* Main Content - appears after explosion */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Subtitle above name */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-primary/90">
                ✦ WELCOME TO MY PORTFOLIO ✦
              </p>
            </motion.div>

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

            {/* Role/title */}
            <motion.p
              className="mt-8 font-mono text-sm md:text-base tracking-[0.25em] text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span>DEVELOPER</span>
              <span className="mx-3 text-primary">•</span>
              <span>DESIGNER</span>
              <span className="mx-3 text-primary">•</span>
              <span>CREATOR</span>
            </motion.p>

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
