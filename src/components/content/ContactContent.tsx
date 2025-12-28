import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactData } from '@/data/portfolioContent';

interface ContactContentProps {
  focusWeight: number;
  isActive: boolean;
}

/**
 * Contact section - terminal-inspired, minimal
 * Clickable actions without decoration
 */
export function ContactContent({ focusWeight, isActive }: ContactContentProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  if (focusWeight < 0.3) return null;

  const actions = [
    { id: 'email', label: 'email', value: contactData.email, href: `mailto:${contactData.email}` },
    { id: 'github', label: 'github', value: 'profile', href: contactData.github },
    { id: 'linkedin', label: 'linkedin', value: 'profile', href: contactData.linkedin },
    { id: 'resume', label: 'resume', value: 'download', href: contactData.resume },
  ];

  return (
    <motion.div
      className="flex flex-col gap-2 max-w-sm font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {/* Terminal-style prompt */}
      <div className="flex items-center gap-2 text-muted-foreground/50 text-[10px]">
        <span>$</span>
        <span>contact --list</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 pl-3 border-l border-border/30">
        {actions.map((action, index) => {
          const isHovered = hoveredAction === action.id;
          
          return (
            <motion.a
              key={action.id}
              href={action.href}
              target={action.id !== 'email' && action.id !== 'resume' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-1 text-sm transition-colors duration-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 + focusWeight * 0.4 }}
              transition={{ duration: 0.1, delay: index * 0.03 }}
              onHoverStart={() => setHoveredAction(action.id)}
              onHoverEnd={() => setHoveredAction(null)}
            >
              {/* Action indicator */}
              <span 
                className={`text-[10px] transition-colors duration-100 ${
                  isHovered ? 'text-primary' : 'text-muted-foreground/40'
                }`}
              >
                →
              </span>

              {/* Label */}
              <span 
                className={`transition-colors duration-100 ${
                  isHovered ? 'text-foreground' : 'text-foreground/70'
                }`}
              >
                {action.label}
              </span>

              {/* Value */}
              <span 
                className={`text-xs transition-colors duration-100 ${
                  isHovered ? 'text-primary/80' : 'text-muted-foreground/50'
                }`}
              >
                {action.value}
              </span>

              {/* Cursor blink on hover */}
              {isHovered && (
                <motion.span
                  className="w-1.5 h-3 bg-primary/60"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.a>
          );
        })}
      </div>

      {/* Minimal footer */}
      <div className="mt-2 text-[9px] text-muted-foreground/30">
        Open to opportunities
      </div>
    </motion.div>
  );
}

export default ContactContent;
