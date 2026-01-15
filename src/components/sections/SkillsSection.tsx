import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  descriptor: string;
  icon: string;
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
      { name: 'Redux', descriptor: 'State Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Node.js', descriptor: 'Runtime Environment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind CSS', descriptor: 'Utility Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'REST API', descriptor: 'API Architecture', icon: 'https://cdn.simpleicons.org/openapiinitiative/6BA539' },
      { name: 'JWT', descriptor: 'Token Authentication', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
      { name: 'Vercel', descriptor: 'Deployment Platform', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
      { name: 'Postman', descriptor: 'API Testing Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
  {
    name: 'DATA & ML',
    skills: [
      { name: 'Python', descriptor: 'Programming Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow', descriptor: 'Deep Learning Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', descriptor: 'ML Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'OpenCV', descriptor: 'Computer Vision', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'Scikit-learn', descriptor: 'ML Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'NumPy', descriptor: 'Numerical Computing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', descriptor: 'Data Analysis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'MediaPipe', descriptor: 'ML Solutions', icon: 'https://cdn.simpleicons.org/mediapipe/0097A7' },
    ],
  },
  {
    name: 'DATABASES',
    skills: [
      { name: 'MongoDB', descriptor: 'NoSQL Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', descriptor: 'Relational Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', descriptor: 'Cloud Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Redis', descriptor: 'In-Memory Store', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'SQL', descriptor: 'Query Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    name: 'CLOUD & DEVOPS',
    skills: [
      { name: 'Docker', descriptor: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Google Cloud', descriptor: 'Cloud Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'AWS', descriptor: 'Cloud Services', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Nginx', descriptor: 'Web Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { name: 'Linux', descriptor: 'Operating System', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    ],
  },
  {
    name: 'IOT SYSTEMS',
    skills: [
      { name: 'Arduino', descriptor: 'Microcontroller', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
      { name: 'Raspberry Pi', descriptor: 'Single-Board Computer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
      { name: 'MQTT', descriptor: 'IoT Protocol', icon: 'https://cdn.simpleicons.org/mqtt/660066' },
      { name: 'C++', descriptor: 'Systems Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
  },
  {
    name: 'TOOLS',
    skills: [
      { name: 'Git', descriptor: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', descriptor: 'Code Hosting', icon: 'https://cdn.simpleicons.org/github/ffffff' },
      { name: 'Figma', descriptor: 'Design Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Java', descriptor: 'Enterprise Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    ],
  },
];

function SkillIcon({ skill }: { skill: Skill }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-background/60 border border-green-500/40"
        style={{
          boxShadow: isHovered
            ? '0 0 12px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.1)'
            : '0 0 4px rgba(34, 197, 94, 0.15)',
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ bottom: 'calc(100% + 8px)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="px-3 py-2 rounded-lg whitespace-nowrap text-center bg-card border border-green-500/30 shadow-lg">
              <p className="text-xs font-semibold font-mono text-foreground mb-0.5">
                {skill.name}
              </p>
              <p className="text-[10px] text-green-400">
                {skill.descriptor}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight text-center">
            SKILLS
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest text-center">
            Technical Expertise
          </p>

          <div className="space-y-6">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <div className="min-w-[120px] border-l-2 border-primary/60 pl-3">
                  <span className="font-mono text-xs font-semibold text-primary tracking-wider">
                    {category.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillIcon key={skillIdx} skill={skill} />
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

export default SkillsSection;
