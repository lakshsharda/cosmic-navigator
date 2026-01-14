import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro screen with cosmic video, timed reveal, and space ambient audio
 */
const ROLES = [
  ['DEVELOPER', 'DESIGNER', 'CREATOR'],
  ['ENGINEER', 'ARTIST', 'INNOVATOR'],
  ['CODER', 'THINKER', 'BUILDER'],
  ['PROBLEM SOLVER', 'DREAMER', 'MAKER'],
  ['FULL-STACK DEV', 'UI/UX', 'VISIONARY'],
];

export function IntroScreen({ onScrollToPortfolio }: IntroScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isLoopTransition, setIsLoopTransition] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const activeVideoRef = useRef<1 | 2>(1);
  const switchingRef = useRef(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const initialStartedRef = useRef(false);

  // Cycle through roles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Name letters for hover effect
  const nameLetters = "LAKSH SHARDA".split('');

  // Show content immediately since we start after the explosion
  useEffect(() => {
    setShowContent(true);
  }, []);

  // Keep ref in sync
  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  // Seamless loop using two videos with crossfade (no visible "end" frame)
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    const getVideos = () => {
      const current = activeVideoRef.current === 1 ? video1 : video2;
      const next = activeVideoRef.current === 1 ? video2 : video1;
      return { current, next };
    };

    const prepareNext = async () => {
      const { next } = getVideos();
      try {
        // Ensure metadata is loaded before seeking
        if (Number.isNaN(next.duration) || next.duration === 0) {
          // noop
        }
        next.currentTime = 8;
        next.pause();
      } catch {
        // ignore seek errors
      }
    };

    const switchToNext = async () => {
      if (switchingRef.current) return;
      switchingRef.current = true;
      setIsLoopTransition(true);

      const { current, next } = getVideos();

      try {
        next.currentTime = 8;
        await next.play();
      } catch {
        // If play fails, don't switch (avoids blank frame)
        switchingRef.current = false;
        setIsLoopTransition(false);
        return;
      }

      setActiveVideo((prev) => (prev === 1 ? 2 : 1));

      // After fade, reset the old one for the next loop
      window.setTimeout(() => {
        try {
          current.pause();
          current.currentTime = 8;
        } catch {
          // ignore
        }
        switchingRef.current = false;
        setIsLoopTransition(false);
      }, 650);
    };

    const handleTimeUpdate = () => {
      const { current } = getVideos();
      if (!current.duration || Number.isNaN(current.duration)) return;

      // Switch a bit BEFORE the end to avoid showing the last frame / cut
      if (current.duration - current.currentTime <= 0.45) {
        switchToNext();
      }
    };

    const handleEnded = () => {
      // Fallback: if a browser still fires ended, immediately swap
      switchToNext();
    };

    prepareNext();

    video1.addEventListener('timeupdate', handleTimeUpdate);
    video2.addEventListener('timeupdate', handleTimeUpdate);
    video1.addEventListener('ended', handleEnded);
    video2.addEventListener('ended', handleEnded);

    return () => {
      video1.removeEventListener('timeupdate', handleTimeUpdate);
      video2.removeEventListener('timeupdate', handleTimeUpdate);
      video1.removeEventListener('ended', handleEnded);
      video2.removeEventListener('ended', handleEnded);
    };
  }, []);

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
      audioEl.volume = 0.9;
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
      {/* Background Video 1 - starts at 8s (after explosion) */}
      <video
        ref={video1Ref}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          activeVideo === 1 ? 'opacity-100' : 'opacity-0'
        }`}
        src="/videos/cosmic-intro.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          // Seek before first play so we never show the explosion
          try {
            e.currentTarget.currentTime = 8;
            e.currentTarget.pause();
          } catch {
            // ignore
          }
        }}
        onSeeked={async (e) => {
          // Start playback only after the seek to 8s has completed
          if (initialStartedRef.current) return;
          initialStartedRef.current = true;
          try {
            await e.currentTarget.play();
          } catch {
            // autoplay can fail; user still sees the correct frame at 8s
          }
        }}
      />
      
      {/* Background Video 2 (for seamless loop) */}
      <video
        ref={video2Ref}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          activeVideo === 2 ? 'opacity-100' : 'opacity-0'
        }`}
        src="/videos/cosmic-intro.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          // Keep the "loop segment" ready on the hidden video
          try {
            e.currentTarget.currentTime = 8;
            e.currentTarget.pause();
          } catch {
            // ignore
          }
        }}
      />

      {/* Epic Space Ambient Audio - using Soundhelix (free reliable CDN) */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
        loop
        preload="auto"
      />

      {/* Dark overlay for better text visibility */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.5 : 0.2 }}
        transition={{ duration: 1 }}
      />

      {/* Loop-mask overlay: hides the visual discontinuity when we jump back to 8s */}
      <motion.div
        className="absolute inset-0 bg-background z-[5] pointer-events-none"
        initial={false}
        animate={{ opacity: isLoopTransition ? 0.55 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
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

      {/* Main Content - appears at 8 seconds */}
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
