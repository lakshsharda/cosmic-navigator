import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getProjectSkills } from '@/data/portfolioContent';

interface ProjectsContentProps {
  focusWeight: number;
  isActive: boolean;
  onProjectSelect?: (projectId: string | null) => void;
}

/**
 * Projects as interactive nodes
 * Hover: name + stack, Click: expand with details
 */
export function ProjectsContent({ 
  focusWeight, 
  isActive,
  onProjectSelect 
}: ProjectsContentProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleProjectClick = useCallback((projectId: string) => {
    const newId = expandedId === projectId ? null : projectId;
    setExpandedId(newId);
    onProjectSelect?.(newId);
  }, [expandedId, onProjectSelect]);

  const handleHover = useCallback((projectId: string | null) => {
    setHoveredId(projectId);
    if (!expandedId) {
      onProjectSelect?.(projectId);
    }
  }, [expandedId, onProjectSelect]);

  if (focusWeight < 0.3) return null;

  return (
    <motion.div
      className="flex flex-col gap-4 max-w-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {/* Project nodes grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {projects.map((project, index) => {
          const isHovered = hoveredId === project.id;
          const isExpanded = expandedId === project.id;
          const relatedSkills = getProjectSkills(project.id);

          return (
            <motion.div
              key={project.id}
              className={`
                relative cursor-pointer rounded border transition-colors duration-150
                ${isExpanded 
                  ? 'border-primary/50 bg-primary/5' 
                  : isHovered 
                    ? 'border-primary/30 bg-secondary/30' 
                    : 'border-border/30 bg-secondary/10'
                }
              `}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: index * 0.03 }}
              onHoverStart={() => handleHover(project.id)}
              onHoverEnd={() => handleHover(null)}
              onClick={() => handleProjectClick(project.id)}
              layout
            >
              <div className="p-3">
                {/* Node header */}
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      isExpanded || isHovered ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                  <span className="font-mono text-sm text-foreground/90">
                    {project.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">
                    {project.year}
                  </span>
                </div>

                {/* Tech stack - visible on hover */}
                <AnimatePresence>
                  {(isHovered || isExpanded) && (
                    <motion.div
                      className="flex flex-wrap gap-1 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 text-[9px] font-mono text-primary/70 bg-primary/10 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="mt-3 pt-3 border-t border-border/20 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Problem */}
                      <div>
                        <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">
                          Problem
                        </span>
                        <p className="font-mono text-[11px] text-foreground/70 mt-0.5">
                          {project.problem}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">
                          Solution
                        </span>
                        <p className="font-mono text-[11px] text-foreground/70 mt-0.5">
                          {project.solution}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div>
                        <span className="font-mono text-[9px] text-primary/60 uppercase tracking-wider">
                          Outcome
                        </span>
                        <p className="font-mono text-[11px] text-primary/80 mt-0.5">
                          {project.outcome}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProjectsContent;
