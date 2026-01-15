import { motion } from 'framer-motion';

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
    <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            EXPERIENCE
          </h2>
          <p className="font-mono text-xs text-primary mb-8 tracking-widest">
            Professional Journey
          </p>

          <div className="space-y-8">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="border-l-2 border-primary/50 pl-6"
              >
                <h3 className="font-mono text-lg font-bold text-foreground mb-1">
                  {exp.company}
                </h3>
                <p className="text-foreground/80 text-sm mb-1">
                  {exp.role}
                </p>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  {exp.duration}
                </p>
                <ul className="space-y-2">
                  {exp.description.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-foreground/80 text-sm leading-relaxed flex gap-2"
                    >
                      <span className="text-primary flex-shrink-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;
