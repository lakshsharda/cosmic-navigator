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
  const LOOP_START = 8; // seconds (skip the explosion segment)
  const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/cosmic-intro.mp4`;

  const [showContent, setShowContent] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isLoopTransition, setIsLoopTransition] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Show a still frame (captured from the video at LOOP_START) while we seek,
  // so there is no black screen and no explosion flash.
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Single-video loop (prevents visible "video changing" crossfade)
  useEffect(() => {
    const video = video1Ref.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      // Just before the natural end, jump back to LOOP_START.
      if (video.duration - video.currentTime <= 0.35) {
        setIsLoopTransition(true);
        try {
          video.currentTime = LOOP_START;
        } catch {
          // ignore
        }
      }
    };

    const handleSeeked = () => {
      // Remove mask shortly after the jump is completed.
      window.setTimeout(() => setIsLoopTransition(false), 120);
    };

    const handleEnded = () => {
      // Fallback in case ended still fires
      setIsLoopTransition(true);
      try {
        video.currentTime = LOOP_START;
        void video.play();
      } catch {
        // ignore
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ended', handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Poster frame shown while we seek to LOOP_START (no black screen, no explosion flash) */}
      <AnimatePresence initial={false}>
        {!videoReady && (
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {posterDataUrl ? (
              <img
                src={posterDataUrl}
                alt="Cosmic background"
                className="h-full w-full object-cover"
                loading="eager"
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-background" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video - starts after explosion */}
      <video
        ref={video1Ref}
        className={`absolute inset-0 z-[0] w-full h-full object-cover ${videoReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        // IMPORTANT: do not use the autoplay attribute; some browsers will start at t=0
        // before our seek runs, causing the explosion to flash in production.
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          try {
            v.pause();
            v.currentTime = LOOP_START;
          } catch {
            // ignore
          }
        }}
        onSeeked={(e) => {
          const v = e.currentTarget;

          // Capture poster once we're at LOOP_START
          if (!posterDataUrl) {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = v.videoWidth || 1920;
              canvas.height = v.videoHeight || 1080;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
                setPosterDataUrl(canvas.toDataURL('image/jpeg', 0.85));
              }
            } catch {
              // ignore
            }
          }

          if (!videoReady) setVideoReady(true);

          // Start playback after the seek (avoids explosion flash)
          v.play().catch(() => {
            // autoplay can still be blocked; poster will remain visible
          });
        }}
        onError={() => {
          // If video fails to load, still show the UI without video
          console.warn('Video failed to load');
          setVideoReady(true);
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

      {/* Loop-mask overlay: subtle fade to hide visual discontinuity when we jump back to 8s */}
      <motion.div
        className="absolute inset-0 bg-black z-[5] pointer-events-none"
        initial={false}
        animate={{ opacity: isLoopTransition ? 0.25 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
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
