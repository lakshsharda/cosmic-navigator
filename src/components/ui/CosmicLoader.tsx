import { motion } from 'framer-motion';

interface CosmicLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

/**
 * Beautiful cosmic-themed loading screen
 * Displayed during transition from intro to portfolio
 */
export function CosmicLoader({ isVisible, onComplete }: CosmicLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      onAnimationComplete={() => {
        if (!isVisible && onComplete) onComplete();
      }}
    >
      {/* Deep space background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0a1628 0%, #040810 50%, #000000 100%)',
        }}
      />

      {/* Animated nebula layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(56, 189, 248, 0.3) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 70% 60%, rgba(129, 140, 248, 0.3) 0%, transparent 40%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Cosmic ring loader */}
        <div className="relative w-24 h-24">
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(56, 189, 248, 0.6), rgba(129, 140, 248, 0.6), transparent)',
              filter: 'blur(4px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-primary/40"
            style={{
              borderTopColor: 'rgba(56, 189, 248, 0.8)',
              borderRightColor: 'rgba(129, 140, 248, 0.6)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Central star */}
          <motion.div
            className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/60 to-purple-500/60"
            style={{
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(129, 140, 248, 0.3)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2
            className="font-mono text-lg tracking-[0.3em] text-white font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ENTERING THE COSMOS
          </motion.h2>
          
          <motion.p
            className="font-mono text-xs tracking-widest text-primary/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            INITIALIZING SPATIAL EXPERIENCE
          </motion.p>
        </div>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(129, 140, 248, 0.8))',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary/70"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Scroll to Navigate
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CosmicLoader;
