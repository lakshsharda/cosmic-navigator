import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(195 85% 45%), hsl(195 85% 55%), hsl(210 85% 60%), hsl(195 85% 55%))',
        boxShadow: '0 0 6px rgba(34, 211, 238, 0.6), 0 0 12px rgba(34, 211, 238, 0.4)',
      }}
    />
  );
}

export default ScrollProgressBar;
