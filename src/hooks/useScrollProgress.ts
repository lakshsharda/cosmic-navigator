import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollProgressConfig {
  /** Total scroll distance in pixels before reaching the end */
  scrollDistance?: number;
  /** Smoothing factor for interpolation (0-1, lower = smoother) */
  smoothing?: number;
  /** Inertia decay factor (0-1, lower = more inertia) */
  inertiaDecay?: number;
}

interface ScrollProgressState {
  /** Current progress value (0-1) */
  progress: number;
  /** Smoothed progress value with interpolation */
  smoothProgress: number;
  /** Current scroll velocity for inertia effects */
  velocity: number;
  /** Direction of scroll (-1, 0, or 1) */
  direction: number;
  /** Function to programmatically scroll to a target progress */
  scrollToProgress: (targetProgress: number) => void;
}

/**
 * Hook for tracking scroll progress with smooth interpolation and inertia
 * Maps vertical scroll to a 0-1 progress value for camera Z-axis movement
 */
export function useScrollProgress(config: ScrollProgressConfig = {}): ScrollProgressState {
  const {
    scrollDistance = 5000,
    smoothing = 0.08,
    inertiaDecay = 0.95,
  } = config;

  // Refs for animation frame and previous values
  const animationRef = useRef<number>();
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  // Programmatic scroll to progress function
  const scrollToProgress = useCallback((targetProgress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, targetProgress));
    targetProgressRef.current = clampedProgress;
    lastScrollRef.current = clampedProgress * scrollDistance;
  }, [scrollDistance]);

  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    smoothProgress: 0,
    velocity: 0,
    direction: 0,
    scrollToProgress,
  });


  // Handle wheel events for smooth scroll tracking
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    const now = Date.now();
    const deltaTime = Math.max(now - lastTimeRef.current, 1);
    lastTimeRef.current = now;

    // Calculate new scroll position
    const scrollDelta = event.deltaY;
    const newScrollPosition = Math.max(0, Math.min(
      lastScrollRef.current + scrollDelta,
      scrollDistance
    ));
    
    // Calculate velocity (pixels per ms, normalized)
    const rawVelocity = scrollDelta / deltaTime;
    velocityRef.current = rawVelocity * 0.5;
    
    // Update target progress (0-1)
    targetProgressRef.current = newScrollPosition / scrollDistance;
    lastScrollRef.current = newScrollPosition;
    
    // Determine direction
    const direction = scrollDelta > 0 ? 1 : scrollDelta < 0 ? -1 : 0;
    
    setState(prev => ({ ...prev, direction }));
  }, [scrollDistance]);

  // Smooth interpolation animation loop
  const animate = useCallback(() => {
    const target = targetProgressRef.current;
    const current = currentProgressRef.current;
    
    // Exponential smoothing for progress
    const diff = target - current;
    const newProgress = current + diff * smoothing;
    
    // Apply inertia decay to velocity
    velocityRef.current *= inertiaDecay;
    
    // Update refs
    currentProgressRef.current = newProgress;
    
    // Only update state if there's meaningful change
    if (Math.abs(diff) > 0.0001 || Math.abs(velocityRef.current) > 0.0001) {
      setState(prev => ({
        ...prev,
        progress: target,
        smoothProgress: newProgress,
        velocity: velocityRef.current,
      }));
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [smoothing, inertiaDecay]);

  useEffect(() => {
    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleWheel, animate]);

  // Update scrollToProgress in state when it changes
  useEffect(() => {
    setState(prev => ({ ...prev, scrollToProgress }));
  }, [scrollToProgress]);

  return state;
}

export default useScrollProgress;
