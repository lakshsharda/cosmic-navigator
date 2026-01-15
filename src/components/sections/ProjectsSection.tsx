import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

import projectBreathguard from '@/assets/project-breathguard.png';
import projectBurntFace from '@/assets/project-burnt-face.png';
import projectManthan from '@/assets/project-manthan.png';
import projectVisionAI from '@/assets/project-vision-ai.png';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'breathguard',
    title: 'BreathGuard',
    description: 'AI-powered respiratory health monitoring system with real-time analysis.',
    image: projectBreathguard,
    tags: ['Python', 'TensorFlow', 'IoT'],
    github: '#',
  },
  {
    id: 'burnt-face',
    title: 'Burnt Face Detection',
    description: 'Deep learning model for burn injury classification and severity assessment.',
    image: projectBurntFace,
    tags: ['PyTorch', 'OpenCV', 'Medical AI'],
    github: '#',
  },
  {
    id: 'manthan',
    title: 'Manthan Platform',
    description: 'Full-stack educational platform with interactive learning modules.',
    image: projectManthan,
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
  },
  {
    id: 'vision-ai',
    title: 'Vision AI Assistant',
    description: 'Real-time visual assistance for the visually impaired using AI.',
    image: projectVisionAI,
    tags: ['TensorFlow', 'MediaPipe', 'React Native'],
    github: '#',
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <span className="text-primary text-sm tracking-[0.3em] uppercase">03</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              Projects
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover glow */}
                {hoveredId === project.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.05) 0%, transparent 70%)',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
