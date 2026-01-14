import { motion } from 'framer-motion';

interface SpaceObjectProps {
  type: 'planet' | 'saturn' | 'asteroid' | 'star' | 'nebula';
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay?: number;
}

/**
 * Animated space object with floating/orbiting motion
 */
export function SpaceObject({
  type,
  size,
  initialX,
  initialY,
  duration,
  delay = 0,
}: SpaceObjectProps) {
  const renderObject = () => {
    switch (type) {
      case 'planet':
        return (
          <div className="relative">
            {/* Outer glow */}
            <div 
              className="absolute rounded-full blur-xl"
              style={{ 
                width: size * 1.5, 
                height: size * 1.5,
                left: -size * 0.25,
                top: -size * 0.25,
                background: 'radial-gradient(circle, hsl(195 85% 55% / 0.3), transparent 70%)',
              }}
            />
            <div 
              className="relative rounded-full"
              style={{ 
                width: size, 
                height: size,
                background: `
                  radial-gradient(circle at 30% 25%, 
                    hsl(195 90% 70%) 0%, 
                    hsl(200 80% 50%) 25%, 
                    hsl(220 70% 35%) 60%, 
                    hsl(240 50% 20%) 100%
                  )
                `,
                boxShadow: `
                  inset -${size * 0.2}px -${size * 0.1}px ${size * 0.4}px hsl(240 50% 10% / 0.8),
                  inset ${size * 0.05}px ${size * 0.05}px ${size * 0.2}px hsl(195 90% 80% / 0.3),
                  0 0 ${size * 0.5}px hsl(195 85% 55% / 0.4),
                  0 0 ${size}px hsl(195 85% 55% / 0.2)
                `,
              }}
            />
          </div>
        );

      case 'saturn':
        return (
          <div className="relative" style={{ width: size * 1.8, height: size * 1.2 }}>
            {/* Outer glow */}
            <div 
              className="absolute rounded-full blur-2xl"
              style={{ 
                width: size * 2, 
                height: size * 1.5,
                left: -size * 0.1,
                top: -size * 0.15,
                background: 'radial-gradient(circle, hsl(35 80% 55% / 0.25), transparent 60%)',
              }}
            />
            {/* Ring behind */}
            <div 
              className="absolute"
              style={{
                width: size * 1.8,
                height: size * 0.5,
                left: 0,
                top: size * 0.35,
                background: 'linear-gradient(90deg, transparent 5%, hsl(35 60% 60% / 0.4) 20%, hsl(35 60% 70% / 0.6) 50%, hsl(35 60% 60% / 0.4) 80%, transparent 95%)',
                borderRadius: '50%',
                transform: 'rotateX(75deg)',
              }}
            />
            {/* Planet body */}
            <div 
              className="absolute rounded-full"
              style={{ 
                width: size, 
                height: size,
                left: size * 0.4,
                top: size * 0.1,
                background: `
                  radial-gradient(circle at 35% 30%, 
                    hsl(40 70% 70%) 0%, 
                    hsl(35 65% 55%) 30%, 
                    hsl(30 50% 40%) 70%, 
                    hsl(25 40% 25%) 100%
                  )
                `,
                boxShadow: `
                  inset -${size * 0.15}px -${size * 0.1}px ${size * 0.3}px hsl(25 40% 15% / 0.7),
                  0 0 ${size * 0.4}px hsl(35 70% 55% / 0.3)
                `,
              }}
            />
            {/* Ring front */}
            <div 
              className="absolute"
              style={{
                width: size * 1.8,
                height: size * 0.5,
                left: 0,
                top: size * 0.35,
                background: 'linear-gradient(90deg, transparent 5%, hsl(35 60% 60% / 0.3) 15%, transparent 45%, transparent 55%, hsl(35 60% 70% / 0.5) 85%, transparent 95%)',
                borderRadius: '50%',
                transform: 'rotateX(75deg)',
              }}
            />
          </div>
        );

      case 'asteroid':
        return (
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: duration * 2, repeat: Infinity, ease: 'linear' }}
          >
            {/* Glow */}
            <div 
              className="absolute rounded-full blur-lg"
              style={{ 
                width: size * 1.5, 
                height: size * 1.5,
                left: -size * 0.25,
                top: -size * 0.25,
                background: 'radial-gradient(circle, hsl(220 20% 50% / 0.3), transparent 60%)',
              }}
            />
            <div
              style={{
                width: size,
                height: size * 0.8,
                background: `
                  radial-gradient(circle at 40% 35%, 
                    hsl(220 15% 50%) 0%, 
                    hsl(220 15% 35%) 40%, 
                    hsl(220 15% 20%) 100%
                  )
                `,
                borderRadius: '42% 58% 45% 55% / 52% 48% 52% 48%',
                boxShadow: `
                  inset -${size * 0.12}px -${size * 0.08}px ${size * 0.2}px hsl(220 15% 10%),
                  0 0 ${size * 0.3}px hsl(220 20% 40% / 0.4)
                `,
              }}
            />
          </motion.div>
        );

      case 'star':
        return (
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Core */}
            <div 
              className="rounded-full"
              style={{ 
                width: size, 
                height: size,
                background: 'radial-gradient(circle, hsl(195 100% 90%), hsl(195 85% 55%))',
                boxShadow: `
                  0 0 ${size}px hsl(195 85% 55% / 0.8),
                  0 0 ${size * 2}px hsl(195 85% 55% / 0.5),
                  0 0 ${size * 3}px hsl(195 85% 55% / 0.3)
                `,
              }}
            />
            {/* Rays */}
            {[0, 45, 90, 135].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: size * 0.15,
                  height: size * 2,
                  background: 'linear-gradient(180deg, transparent, hsl(195 85% 70% / 0.6), transparent)',
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  borderRadius: '50%',
                }}
              />
            ))}
          </motion.div>
        );

      case 'nebula':
        return (
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: duration, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div 
              className="rounded-full blur-2xl"
              style={{ 
                width: size, 
                height: size * 0.6,
                background: `
                  radial-gradient(ellipse, 
                    hsl(280 60% 50% / 0.4) 0%, 
                    hsl(250 60% 45% / 0.2) 50%, 
                    transparent 70%
                  )
                `,
              }}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${initialX}%`, top: `${initialY}%` }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, Math.random() * 20 - 10, Math.random() * 15 - 7, 0],
        y: [0, Math.random() * 15 - 7, Math.random() * 20 - 10, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay },
        scale: { duration: 2, delay, ease: 'easeOut' },
        x: { duration: duration, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    >
      {renderObject()}
    </motion.div>
  );
}

export default SpaceObject;
