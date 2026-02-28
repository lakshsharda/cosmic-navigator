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
    company: 'U2CA Consultants',
    role: 'Full Stack Developer Intern',
    duration: 'Jun 2025 – Aug 2025',
    description: [
      'Built a scalable full-stack web application "The Thursday Thing".',
      'Used React, Node.js, and Firebase.',
      'Delivered secure, responsive, production-ready systems in agile teams.',
    ],
  },
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
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-8 relative overflow-hidden">
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
              y: [-20, 20, -20],
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

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            EXPERIENCE
          </h2>
          <p className="font-mono text-xs text-primary tracking-widest">
            Professional Journey
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="relative hidden md:block">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 -translate-x-1/2" />

          {/* U2CA - Left side, above */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            className="relative flex items-center mb-20"
          >
            {/* Left content */}
            <div className="w-1/2 pr-16 flex justify-end">
              <motion.div
                className="p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm max-w-md relative"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Horizontal connector line from card to center */}
                <div className="absolute top-1/2 -right-16 w-16 h-0.5 bg-gradient-to-r from-primary/20 to-primary" />
                
                <div className="flex flex-col gap-2 mb-3">
                  <h3 className="font-mono text-lg font-bold text-foreground">
                    {EXPERIENCE_DATA[0].company}
                  </h3>
                  <p className="text-primary/90 text-sm font-medium">
                    {EXPERIENCE_DATA[0].role}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {EXPERIENCE_DATA[0].duration}
                  </span>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {EXPERIENCE_DATA[0].description.map((bullet, bIdx) => (
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
            </div>

            {/* Center dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10"
            >
              <motion.div
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
                }}
                className="w-full h-full rounded-full flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 text-primary" />
              </motion.div>
            </div>

            {/* Right side empty */}
            <div className="w-1/2 pl-16" />
          </motion.div>

          {/* ThinkingLabs - Right side, below */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-center"
          >
            {/* Left side empty */}
            <div className="w-1/2 pr-16" />

            {/* Center dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10"
            >
              <motion.div
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
                  delay: 0.5,
                }}
                className="w-full h-full rounded-full flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 text-primary" />
              </motion.div>
            </div>

            {/* Right content */}
            <div className="w-1/2 pl-16 flex justify-start">
              <motion.div
                className="p-6 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm max-w-md relative"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Horizontal connector line from center to card */}
                <div className="absolute top-1/2 -left-16 w-16 h-0.5 bg-gradient-to-l from-primary/20 to-primary" />
                
                <div className="flex flex-col gap-2 mb-3">
                  <h3 className="font-mono text-lg font-bold text-foreground">
                    {EXPERIENCE_DATA[1].company}
                  </h3>
                  <p className="text-primary/90 text-sm font-medium">
                    {EXPERIENCE_DATA[1].role}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {EXPERIENCE_DATA[1].duration}
                  </span>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {EXPERIENCE_DATA[1].description.map((bullet, bIdx) => (
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
            </div>
          </motion.div>
        </div>

        {/* Mobile view - stacked */}
        <div className="md:hidden space-y-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-primary" />
              </div>
              <div className="p-5 rounded-xl bg-secondary/30 border border-primary/20">
                <h3 className="font-mono text-base font-bold text-foreground">{exp.company}</h3>
                <p className="text-primary/90 text-sm font-medium mt-1">{exp.role}</p>
                <span className="font-mono text-xs text-muted-foreground">{exp.duration}</span>
                <ul className="space-y-2 mt-3">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-foreground/80 text-sm flex gap-2">
                      <span className="text-primary">▹</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
