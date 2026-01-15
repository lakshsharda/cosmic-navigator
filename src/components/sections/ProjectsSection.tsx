import { motion } from 'framer-motion';
import { PROJECTS_DATA, Project } from '@/components/projects/ProjectModal';

interface ProjectsSectionProps {
  onProjectClick: (project: Project) => void;
}

export function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 relative">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight text-center">
            PROJECTS
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest text-center">
            Featured Work
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-mono text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-primary/80 flex-shrink-0">
                    {project.year}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>
                <button className="font-mono text-xs text-primary hover:text-primary/80 transition-colors">
                  View Details →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsSection;
