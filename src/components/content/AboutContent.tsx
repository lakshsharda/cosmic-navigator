import { useState } from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/data/portfolioContent';

interface AboutContentProps {
  focusWeight: number;
  isActive: boolean;
}

/**
 * About section content with progressive disclosure
 * Shows summary + focus areas, reveals keywords on interaction
 */
export function AboutContent({ focusWeight, isActive }: AboutContentProps) {
  const [expanded, setExpanded] = useState(false);

  if (focusWeight < 0.3) return null;

  return (
    <motion.div
      className="flex flex-col gap-4 max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {/* Professional summary */}
      <p className="font-mono text-sm text-foreground/80 leading-relaxed">
        {aboutData.summary}
      </p>

      {/* Focus areas - always visible when in focus */}
      <div className="flex flex-wrap justify-center gap-2">
        {aboutData.focus.map((area, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs font-mono text-primary/80 border border-primary/20 rounded"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Keywords - revealed on hover/click */}
      <motion.div
        className="mt-2"
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-center gap-1 cursor-pointer">
          {aboutData.keywords.map((keyword, i) => (
            <motion.span
              key={i}
              className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: expanded ? 0.9 : 0.4 }}
              transition={{ duration: 0.15, delay: i * 0.03 }}
            >
              {keyword}
              {i < aboutData.keywords.length - 1 && <span className="mx-1">·</span>}
            </motion.span>
          ))}
        </div>
        
        {/* Depth indicator */}
        <motion.div
          className="mt-3 flex justify-center gap-1"
          animate={{ opacity: expanded ? 0.8 : 0.3 }}
        >
          {[0.9, 0.7, 0.8, 0.6].map((level, i) => (
            <div
              key={i}
              className="w-1 bg-primary/40 rounded-full"
              style={{ height: `${level * 16}px` }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default AboutContent;
