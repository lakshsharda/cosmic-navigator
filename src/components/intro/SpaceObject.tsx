import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface SpaceObjectProps {
  type: 'planet' | 'asteroid' | 'ring' | 'moon' | 'comet';
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
  // Random movement range for floating effect
  const movement = useMemo(() => ({
    x: [0, Math.random() * 30 - 15, Math.random() * 20 - 10, 0],
    y: [0, Math.random() * 25 - 12, Math.random() * 15 - 7, 0],
    rotate: type === 'asteroid' ? [0, 360] : [0, type === 'comet' ? 15 : 5, 0],
  }), [type]);

  const renderObject = () => {
    switch (type) {
      case 'planet':
        return (
          <div 
            className="relative rounded-full"
            style={{ 
              width: size, 
              height: size,
              background: 'radial-gradient(circle at 30% 30%, hsl(195 85% 55% / 0.4), hsl(250 60% 35% / 0.6), hsl(230 25% 10%))',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.1}px ${size * 0.3}px hsl(230 25% 5% / 0.8),
                0 0 ${size * 0.4}px hsl(195 85% 55% / 0.3),
                0 0 ${size}px hsl(250 60% 45% / 0.2)
              `,
            }}
          >
            {/* Planet ring */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-40"
              style={{
                width: size * 1.6,
                height: size * 0.4,
                borderColor: 'hsl(195 85% 55% / 0.5)',
                transform: 'translate(-50%, -50%) rotateX(70deg)',
              }}
            />
          </div>
        );

      case 'asteroid':
        return (
          <div
            className="relative"
            style={{
              width: size,
              height: size * 0.7,
              background: 'linear-gradient(135deg, hsl(220 15% 35%), hsl(220 15% 20%), hsl(220 15% 12%))',
              borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
              boxShadow: `
                inset -${size * 0.1}px -${size * 0.05}px ${size * 0.2}px hsl(220 15% 8%),
                0 0 ${size * 0.3}px hsl(220 15% 25% / 0.3)
              `,
            }}
          >
            {/* Craters */}
            <div 
              className="absolute rounded-full bg-background/30"
              style={{ width: size * 0.2, height: size * 0.15, top: '20%', left: '25%' }}
            />
            <div 
              className="absolute rounded-full bg-background/20"
              style={{ width: size * 0.12, height: size * 0.1, top: '55%', left: '60%' }}
            />
          </div>
        );

      case 'ring':
        return (
          <div className="relative" style={{ width: size, height: size }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: size - i * (size * 0.15),
                  height: size - i * (size * 0.15),
                  top: '50%',
                  left: '50%',
                  borderColor: `hsl(195 85% 55% / ${0.4 - i * 0.1})`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: duration * (1 + i * 0.5), repeat: Infinity, ease: 'linear' }}
              />
            ))}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: size * 0.3,
                height: size * 0.3,
                background: 'radial-gradient(circle, hsl(195 85% 55% / 0.6), hsl(250 60% 45% / 0.4))',
                boxShadow: `0 0 ${size * 0.3}px hsl(195 85% 55% / 0.4)`,
              }}
            />
          </div>
        );

      case 'moon':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: 'radial-gradient(circle at 35% 35%, hsl(220 10% 60%), hsl(220 10% 35%), hsl(220 10% 20%))',
              boxShadow: `
                inset -${size * 0.1}px -${size * 0.08}px ${size * 0.2}px hsl(220 10% 10%),
                0 0 ${size * 0.25}px hsl(220 10% 50% / 0.3)
              `,
            }}
          />
        );

      case 'comet':
        return (
          <div className="relative" style={{ width: size * 2, height: size }}>
            {/* Comet tail */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{
                width: size * 1.5,
                height: size * 0.6,
                background: 'linear-gradient(90deg, hsl(195 85% 55% / 0.5), hsl(195 85% 55% / 0.1), transparent)',
                borderRadius: '50% 0 0 50%',
                filter: 'blur(3px)',
              }}
            />
            {/* Comet head */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: size * 0.5,
                height: size * 0.5,
                background: 'radial-gradient(circle, hsl(195 90% 80%), hsl(195 85% 55%))',
                boxShadow: `0 0 ${size * 0.4}px hsl(195 85% 55% / 0.6)`,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${initialX}%`, top: `${initialY}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: movement.x,
        y: movement.y,
        rotate: movement.rotate,
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1.5, delay },
        x: { duration: duration, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: type === 'asteroid' ? duration * 3 : duration * 2, repeat: Infinity, ease: 'linear', delay },
      }}
    >
      {renderObject()}
    </motion.div>
  );
}

export default SpaceObject;
