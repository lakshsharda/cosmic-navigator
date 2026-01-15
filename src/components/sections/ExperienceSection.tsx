import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'THINKINGLABS AI',
    role: 'Lead Intern Scientist – ThinkVisual Assist Project',
    duration: 'Dec 2025 – Present',
    description: [
      'Leading end-to-end development of an AI-driven visual assistance pipeline.',
      'Working on scene understanding, object detection, and real-time inference.',
      'Focused on assistive technologies and real-world deployment.',
    ],
  },
  {
    company: 'U2CA Consultants',
    role: 'Full Stack Developer Intern',
    duration: 'Jun 2025 – Aug 2025',
    description: [
      'Built a scalable full-stack web application "The Thursday Thing".',
      'Used React, Node.js, and Firebase.',
      'Delivered secure, responsive, production-ready systems in agile teams.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            EXPERIENCE
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest">
            Professional Journey
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <div className="space-y-10">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Timeline dot with icon */}
                  <motion.div
                    className="absolute left-2.5 top-1 w-8 h-8 rounded-full bg-secondary border-2 border-primary flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 hsla(var(--primary), 0.4)',
                        '0 0 0 8px hsla(var(--primary), 0)',
                        '0 0 0 0 hsla(var(--primary), 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                    }}
                  >
                    <Briefcase className="w-4 h-4 text-primary" />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className="p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-mono text-lg font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="text-foreground/80 text-sm">
                          {exp.role}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 w-fit whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    
                    <ul className="space-y-2 mt-4">
                      {exp.description.map((bullet, bIdx) => (
                        <motion.li
                          key={bIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + bIdx * 0.1 }}
                          viewport={{ once: true }}
                          className="text-foreground/80 text-sm leading-relaxed flex gap-3"
                        >
                          <span className="text-primary flex-shrink-0 mt-1">▹</span>
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;
