import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements } from '@/data/portfolioContent';

interface AchievementsContentProps {
  focusWeight: number;
  isActive: boolean;
}

/**
 * Achievements as signal pulses
 * Each achievement briefly expands on focus/hover
 */
export function AchievementsContent({ focusWeight, isActive }: AchievementsContentProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (focusWeight < 0.3) return null;

  return (
    <motion.div
      className="flex flex-col gap-3 max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {achievements.map((achievement, index) => {
        const isHovered = hoveredId === achievement.id;
        
        return (
          <motion.div
            key={achievement.id}
            className="relative cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 + focusWeight * 0.5 }}
            transition={{ duration: 0.15, delay: index * 0.05 }}
            onHoverStart={() => setHoveredId(achievement.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {/* Pulse indicator */}
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    isHovered ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
                {/* Pulse ring */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/50"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm text-foreground/90">
                    {achievement.title}
                  </span>
                  <span className="font-mono text-[10px] text-primary/70 font-medium">
                    {achievement.rank}
                  </span>
                </div>

                {/* Expanded context */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <p className="font-mono text-[11px] text-muted-foreground/70 mt-1">
                        {achievement.context}
                      </p>
                      <span className="font-mono text-[9px] text-muted-foreground/40">
                        {achievement.year}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default AchievementsContent;
