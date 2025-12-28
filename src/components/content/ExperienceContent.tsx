import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '@/data/portfolioContent';

interface ExperienceContentProps {
  focusWeight: number;
  isActive: boolean;
}

/**
 * Experience section with layered depth cards
 * Progressive disclosure: Role → Responsibilities → Impact
 */
export function ExperienceContent({ focusWeight, isActive }: ExperienceContentProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (focusWeight < 0.3) return null;

  return (
    <motion.div
      className="flex flex-col gap-3 max-w-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {experiences.map((exp, index) => {
        const isHovered = hoveredId === exp.id;
        const isExpanded = expandedId === exp.id;
        
        return (
          <motion.div
            key={exp.id}
            className="relative cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 0.4 + focusWeight * 0.6,
              x: 0,
            }}
            transition={{ duration: 0.15, delay: index * 0.05 }}
            onHoverStart={() => setHoveredId(exp.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => setExpandedId(isExpanded ? null : exp.id)}
          >
            {/* Depth layer indicator */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
              style={{
                background: isExpanded 
                  ? 'hsl(var(--primary))' 
                  : isHovered 
                    ? 'hsl(var(--primary) / 0.5)' 
                    : 'hsl(var(--muted-foreground) / 0.2)',
              }}
            />

            <div className="pl-3">
              {/* Level 1: Always visible - Role & Company */}
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-sm text-foreground/90">
                  {exp.role}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {exp.period}
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground/70">
                {exp.company}
              </span>

              {/* Level 2: Hover - Responsibilities */}
              <AnimatePresence>
                {(isHovered || isExpanded) && (
                  <motion.ul
                    className="mt-2 space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        className="font-mono text-[11px] text-muted-foreground/70 pl-2 border-l border-border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {resp}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Level 3: Click - Impact */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="mt-2 pt-2 border-t border-border/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="font-mono text-[10px] text-primary/70 uppercase tracking-wider">
                      Impact
                    </span>
                    <p className="font-mono text-xs text-foreground/80 mt-1">
                      {exp.impact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ExperienceContent;
