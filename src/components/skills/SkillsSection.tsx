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
      { name: 'Redux', descriptor: 'State Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'HTML', descriptor: 'Markup Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', descriptor: 'Styling Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind CSS', descriptor: 'Utility Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Node.js', descriptor: 'Runtime Environment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', descriptor: 'Backend Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', descriptor: 'NoSQL Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Firebase', descriptor: 'Cloud Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    ],
  },
  {
    name: 'DATA & ML',
    skills: [
      { name: 'Python', descriptor: 'Programming Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'SQL', descriptor: 'Query Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Machine Learning', descriptor: 'AI Models', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'Computer Vision', descriptor: 'Image Processing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'GANs', descriptor: 'Deep Learning Models', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Data Analysis', descriptor: 'Analytics & Insights', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    ],
  },
  {
    name: 'SYSTEMS & CORE',
    skills: [
      { name: 'C++', descriptor: 'Systems Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', descriptor: 'Enterprise Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'DSA', descriptor: 'Algorithms & Structures', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/thealgorithms/thealgorithms-original.svg' },
      { name: 'IoT Systems', descriptor: 'Embedded Solutions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
    ],
  },
  {
    name: 'TOOLS',
    skills: [
      { name: 'Git', descriptor: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', descriptor: 'Code Hosting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Firebase', descriptor: 'Backend Services', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Figma', descriptor: 'Design Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Canva', descriptor: 'Graphics Editor', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
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
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer"
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
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
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
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '20px 24px',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '680px',
        opacity: focusWeight > 0.3 ? Math.min((focusWeight - 0.3) / 0.5, 1) : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '4px' }}>
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

      {/* Categories */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {SKILL_CATEGORIES.map((category, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Category Label */}
            <div
              style={{
                minWidth: '100px',
                flexShrink: 0,
                borderLeft: '2px solid rgba(34, 197, 94, 0.6)',
                paddingLeft: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#4ade80',
                  letterSpacing: '0.08em',
                  lineHeight: 1.4,
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}
              >
                {category.name}
              </span>
            </div>

            {/* Skills Icons Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {category.skills.map((skill, skillIdx) => (
                <SkillIcon key={skillIdx} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
