import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro screen with full background video (muted) and seamless loop mask
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
  const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/111.mp3`;

  const [showContent, setShowContent] = useState(false);
  const [isLoopTransition, setIsLoopTransition] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  // Try to play the audio
  const tryPlayAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasStartedRef.current) return;
    audio.loop = true;
    audio.volume = 0.5;
    try {
      await audio.play();
      hasStartedRef.current = true;
    } catch {
      // blocked – will retry on user gesture
    }
  }, []);

  // Autoplay audio on mount; fallback to first user gesture
  useEffect(() => {
    tryPlayAudio();

    const onGesture = async () => {
      if (hasStartedRef.current) { cleanup(); return; }
      await tryPlayAudio();
      if (hasStartedRef.current) cleanup();
    };

    const events = ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel', 'mousemove'] as const;
    events.forEach(e => document.addEventListener(e, onGesture, { passive: true }));

    function cleanup() {
      events.forEach(e => document.removeEventListener(e, onGesture));
    }
    return () => {
      cleanup();
      // Stop audio when intro unmounts
      const audio = audioRef.current;
      if (audio) { audio.pause(); audio.currentTime = 0; }
    };
  }, [tryPlayAudio]);

  // Toggle mute/unmute
  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!hasStartedRef.current) await tryPlayAudio();
    if (isMuted) {
      audio.volume = 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

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

  // Enforce muted video (per request)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
  }, []);

  // Seamless loop: jump back to 0 with a subtle fade mask to hide the cut.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleTimeUpdate = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;

      // Trigger slightly earlier so the fade fully covers the jump on all devices.
      if (v.duration - v.currentTime <= 0.9) {
        setIsLoopTransition(true);
        try {
          v.currentTime = 0;
          void v.play();
        } catch {
          // ignore
        }
      }
    };

    const handleSeeked = () => {
      window.setTimeout(() => setIsLoopTransition(false), 120);
    };

    const handleEnded = () => {
      setIsLoopTransition(true);
      try {
        v.currentTime = 0;
        void v.play();
      } catch {
        // ignore
      }
    };

    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('seeked', handleSeeked);
    v.addEventListener('ended', handleEnded);

    return () => {
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('seeked', handleSeeked);
      v.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Name letters for hover effect
  const nameLetters = "LAKSH SHARDA".split('');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Background Audio */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />

      {/* Mute/Unmute Button - Top Right */}
      <motion.button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-[100] w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      {/* Dark overlay for better text visibility */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.5 : 0.2 }}
        transition={{ duration: 1 }}
      />

      {/* Loop-mask overlay: fade to hide the end→start jump */}
      <motion.div
        className="absolute inset-0 bg-black z-[50] pointer-events-none"
        initial={false}
        animate={{ opacity: isLoopTransition ? 0.6 : 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            layout={false}
          >
            {/* Name with glow */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              layout={false}
              // Only animate once on mount, never re-animate
              exit="never"
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
                  <span
                    key={index}
                    className={`font-mono text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold ${letter === ' ' ? 'mx-2 sm:mx-3 md:mx-6' : 'mx-0 sm:mx-0.5 md:mx-1'}`}
                    style={{
                      color: 'hsl(210 20% 98%)',
                      textShadow: `
                        0 0 30px hsl(195 85% 55% / 0.6),
                        0 0 60px hsl(195 85% 55% / 0.4),
                        0 0 100px hsl(250 60% 55% / 0.3)
                      `,
                    }}
                  >
                    {letter === ' ' ? '' : letter}
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Role/title - cycles every 4s */}
            <motion.div
              className="mt-8 font-mono text-sm md:text-base tracking-[0.25em] text-white/80 h-6 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              layout={false}
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
