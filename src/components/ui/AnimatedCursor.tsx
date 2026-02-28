import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function AnimatedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
    
    // Add trail point
    trailIdRef.current += 1;
    setTrail(prev => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current }];
      // Keep only last 12 points for smooth trail
      return newTrail.slice(-12);
    });
  }, [cursorX, cursorY, isVisible]);

  const onMouseDown = useCallback(() => setIsClicking(true), []);
  const onMouseUp = useCallback(() => setIsClicking(false), []);
  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);

  // Clear old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for hover targets
    const handleHoverTargets = () => {
      const hoverElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    handleHoverTargets();
    
    // Re-check for new elements periodically
    const observer = new MutationObserver(handleHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseLeave, onMouseEnter]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Paint trail effect */}
      <svg className="fixed inset-0 pointer-events-none z-[9997]" style={{ width: '100vw', height: '100vh' }}>
        <defs>
          <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)" />
            <stop offset="100%" stopColor="rgba(103, 232, 249, 0.8)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {trail.length > 1 && (
          <motion.path
            d={`M ${trail.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none"
            stroke="url(#paintGradient)"
            strokeWidth={isHovering ? 6 : 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isVisible ? 1 : 0 }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))',
            }}
          />
        )}
      </svg>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 1.3 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Inner dot - paint drop */}
          <div 
            className="w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(103, 232, 249, 1) 0%, rgba(34, 211, 238, 0.8) 50%, rgba(34, 211, 238, 0) 100%)',
              boxShadow: '0 0 15px rgba(34, 211, 238, 1), 0 0 30px rgba(34, 211, 238, 0.6), 0 0 45px rgba(34, 211, 238, 0.3)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 2 : 1,
            opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div 
            className="w-8 h-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0) 70%)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

export default AnimatedCursor;
