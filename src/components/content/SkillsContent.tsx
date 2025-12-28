import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { skills, getSkillProjects, getSkillConnections } from '@/data/portfolioContent';

interface SkillsContentProps {
  focusWeight: number;
  isActive: boolean;
  activeProjectId?: string | null;
}

/**
 * Skills as connected nodes
 * Shows connections between skills used together in projects
 * Highlights relevant skills when a project is selected
 */
export function SkillsContent({ 
  focusWeight, 
  isActive,
  activeProjectId 
}: SkillsContentProps) {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  
  // Get skill connections (skills used together)
  const connections = useMemo(() => getSkillConnections(), []);
  
  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped = new Map<string, typeof skills>();
    skills.forEach(skill => {
      const category = skill.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(skill);
    });
    return grouped;
  }, []);

  // Get projects for hovered skill
  const hoveredSkillProjects = useMemo(() => {
    if (!hoveredSkillId) return [];
    return getSkillProjects(hoveredSkillId);
  }, [hoveredSkillId]);

  // Determine which skills should be highlighted
  const getSkillHighlight = useCallback((skillId: string) => {
    // If a skill is hovered, highlight it and its connections
    if (hoveredSkillId) {
      if (skillId === hoveredSkillId) return 'active';
      if (connections.get(hoveredSkillId)?.has(skillId)) return 'connected';
      return 'dimmed';
    }
    
    // If a project is active (from projects section), highlight its skills
    if (activeProjectId) {
      const projectSkills = getSkillProjects(skillId);
      if (projectSkills.some(p => p.id === activeProjectId)) return 'active';
      return 'dimmed';
    }
    
    return 'default';
  }, [hoveredSkillId, activeProjectId, connections]);

  if (focusWeight < 0.3) return null;

  const categoryLabels: Record<string, string> = {
    language: 'Languages',
    framework: 'Frameworks',
    tool: 'Tools',
    concept: 'Concepts',
  };

  return (
    <motion.div
      className="flex flex-col gap-4 max-w-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: focusWeight }}
      transition={{ duration: 0.15 }}
    >
      {/* Skill categories */}
      <div className="flex flex-col gap-3">
        {Array.from(skillsByCategory.entries()).map(([category, categorySkills]) => (
          <div key={category} className="flex flex-col gap-1.5">
            <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">
              {categoryLabels[category]}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categorySkills.map((skill) => {
                const highlight = getSkillHighlight(skill.id);
                
                return (
                  <motion.div
                    key={skill.id}
                    className={`
                      relative px-2 py-1 rounded cursor-pointer border transition-all duration-100
                      ${highlight === 'active' 
                        ? 'border-primary/60 bg-primary/15 text-foreground' 
                        : highlight === 'connected'
                          ? 'border-primary/30 bg-primary/5 text-foreground/80'
                          : highlight === 'dimmed'
                            ? 'border-border/20 bg-secondary/5 text-muted-foreground/40'
                            : 'border-border/30 bg-secondary/10 text-foreground/70'
                      }
                    `}
                    onHoverStart={() => setHoveredSkillId(skill.id)}
                    onHoverEnd={() => setHoveredSkillId(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span className="font-mono text-[11px]">
                      {skill.name}
                    </span>
                    
                    {/* Proficiency indicator */}
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-primary/30 rounded-b"
                      style={{ width: `${skill.proficiency * 100}%` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Linked projects indicator */}
      {hoveredSkillId && hoveredSkillProjects.length > 0 && (
        <motion.div
          className="pt-2 border-t border-border/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">
            Used in
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {hoveredSkillProjects.map(project => (
              <span
                key={project.id}
                className="font-mono text-[10px] text-primary/70"
              >
                {project.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SkillsContent;
