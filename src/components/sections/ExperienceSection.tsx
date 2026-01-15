import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
  side: 'left' | 'right';
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
    side: 'left',
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
    side: 'right',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]"
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            EXPERIENCE
          </h2>
          <p className="font-mono text-xs text-primary tracking-widest">
            Professional Journey
          </p>
        </motion.div>

        {/* Timeline with center line */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${
                  idx !== EXPERIENCE_DATA.length - 1 ? 'md:mb-16' : ''
                }`}
              >
                {/* Left side content */}
                <div className={`w-full md:w-1/2 ${exp.side === 'left' ? 'md:pr-12' : 'md:pr-12 md:order-1'}`}>
                  {exp.side === 'left' && (
                    <motion.div
                      className="p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className="font-mono text-lg font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="text-primary/90 text-sm font-medium">
                          {exp.role}
                        </p>
                        <span className="font-mono text-xs text-muted-foreground">
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
                            <span className="text-primary flex-shrink-0">▹</span>
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Center dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 hidden md:flex"
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 hsla(var(--primary), 0.4)',
                      '0 0 0 12px hsla(var(--primary), 0)',
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

                {/* Right side content */}
                <div className={`w-full md:w-1/2 ${exp.side === 'right' ? 'md:pl-12' : 'md:pl-12 md:order-2'}`}>
                  {exp.side === 'right' && (
                    <motion.div
                      className="p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className="font-mono text-lg font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="text-primary/90 text-sm font-medium">
                          {exp.role}
                        </p>
                        <span className="font-mono text-xs text-muted-foreground">
                          {exp.duration}
                        </span>
                      </div>
                      
                      <ul className="space-y-2 mt-4">
                        {exp.description.map((bullet, bIdx) => (
                          <motion.li
                            key={bIdx}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + bIdx * 0.1 }}
                            viewport={{ once: true }}
                            className="text-foreground/80 text-sm leading-relaxed flex gap-3"
                          >
                            <span className="text-primary flex-shrink-0">▹</span>
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Mobile timeline dot */}
                <div className="md:hidden absolute left-0 top-6 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <Briefcase className="w-3 h-3 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
