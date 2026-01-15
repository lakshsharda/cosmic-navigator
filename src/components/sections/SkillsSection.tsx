import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Skill {
  name: string;
  icon: string;
  descriptor: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'DEVELOPMENT',
    skills: [
      { name: 'JavaScript', descriptor: 'Programming Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React.js', descriptor: 'Frontend Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', descriptor: 'React Framework', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { name: 'Node.js', descriptor: 'Runtime Environment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'TypeScript', descriptor: 'Typed JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', descriptor: 'Utility Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    name: 'DATA & ML',
    skills: [
      { name: 'Python', descriptor: 'Programming Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow', descriptor: 'Deep Learning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', descriptor: 'ML Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'OpenCV', descriptor: 'Computer Vision', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'Pandas', descriptor: 'Data Analysis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', descriptor: 'Numerical Computing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    ],
  },
  {
    name: 'DATABASES & CLOUD',
    skills: [
      { name: 'MongoDB', descriptor: 'NoSQL Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', descriptor: 'Relational DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', descriptor: 'Cloud Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Docker', descriptor: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS', descriptor: 'Cloud Services', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Git', descriptor: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="skills"
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
            <span className="text-primary text-sm tracking-[0.3em] uppercase">04</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              Skills
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Skills grid */}
          <div className="space-y-12">
            {SKILL_CATEGORIES.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-6">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="w-16 h-16 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/5">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* Tooltip */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg z-10 whitespace-nowrap"
                        >
                          <p className="text-sm font-medium text-foreground">{skill.name}</p>
                          <p className="text-xs text-muted-foreground">{skill.descriptor}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
