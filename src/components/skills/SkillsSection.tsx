import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillSphere3D } from './SkillSphere3D';

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

interface SkillIconProps {
  skill: Skill;
}

function SkillIcon({ skill }: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'auto' }}
    >
      <motion.div
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1.5px solid rgba(34, 197, 94, 0.5)',
          boxShadow: isHovered
            ? '0 0 12px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.1)'
            : '0 0 4px rgba(34, 197, 94, 0.15)',
        }}
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          style={{
            filter: 'brightness(1.1)',
          }}
          onError={(e) => {
            // Fallback to first letter if icon fails
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const span = document.createElement('span');
              span.textContent = skill.name.charAt(0);
              span.style.cssText = 'font-family: JetBrains Mono, monospace; font-size: 14px; font-weight: 700; color: #22c55e;';
              parent.appendChild(span);
            }
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{
              bottom: 'calc(100% + 8px)',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div
              className="px-3 py-2 rounded-lg whitespace-nowrap text-center"
              style={{
                background: 'rgba(10, 15, 20, 0.95)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <p
                className="text-xs font-semibold mb-0.5"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#f0fdf4',
                  letterSpacing: '0.02em',
                }}
              >
                {skill.name}
              </p>
              <p
                className="text-[10px]"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#86efac',
                }}
              >
                {skill.descriptor}
              </p>
            </div>
            {/* Tooltip arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                top: '100%',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(10, 15, 20, 0.95)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SkillsSectionProps {
  focusWeight: number;
}

export function SkillsSection({ focusWeight }: SkillsSectionProps) {
  // Flatten all skills into a single array for the 3D sphere
  const allSkills = useMemo(() => {
    return SKILL_CATEGORIES.flatMap(category => category.skills);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '16px 20px',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '800px',
        opacity: focusWeight > 0.3 ? Math.min((focusWeight - 0.3) / 0.5, 1) : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '4px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '20px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          SKILLS
        </h2>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            fontWeight: 600,
            color: '#a5f3fc',
            margin: 0,
            letterSpacing: '0.15em',
            textShadow: '0 1px 6px rgba(0,0,0,0.7)',
          }}
        >
          Technical Expertise
        </p>
      </div>

      {/* 3D Skills Sphere */}
      <SkillSphere3D 
        skills={allSkills} 
        radius={3.5} 
        height="380px"
      />
    </div>
  );
}

export default SkillsSection;
