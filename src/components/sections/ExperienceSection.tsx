import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <span className="text-primary text-sm tracking-[0.3em] uppercase">02</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              Experience
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {EXPERIENCE_DATA.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-background border-2 border-primary" />

                <div className="pb-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-primary font-medium mb-4">{exp.role}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
