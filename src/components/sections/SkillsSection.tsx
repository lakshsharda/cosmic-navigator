import { useState } from 'react';

interface Skill {
  name: string;
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
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'REST API', icon: 'https://cdn.simpleicons.org/openapiinitiative/6BA539' },
      { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
  {
    name: 'DATA & ML',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'MediaPipe', icon: 'https://cdn.simpleicons.org/mediapipe/0097A7' },
    ],
  },
  {
    name: 'DATABASES',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    name: 'CLOUD & DEVOPS',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    ],
  },
  {
    name: 'IOT SYSTEMS',
    skills: [
      { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
      { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
      { name: 'MQTT', icon: 'https://cdn.simpleicons.org/mqtt/660066' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
  },
  {
    name: 'TOOLS',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    ],
  },
];

function SkillIcon({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-background/60 border border-primary/15 hover:border-primary/50 flex items-center justify-center transition-colors cursor-pointer">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = 'none';
            const parent = t.parentElement;
            if (parent && !parent.querySelector('span')) {
              const s = document.createElement('span');
              s.textContent = skill.name.charAt(0);
              s.className = 'font-mono text-sm font-bold text-primary';
              parent.appendChild(s);
            }
          }}
        />
      </div>

      {/* Tooltip on hover */}
      {hovered && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-background/95 border border-primary/30 shadow-lg whitespace-nowrap">
            <span className="font-mono text-[11px] text-foreground">{skill.name}</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-background/95" />
        </div>
      )}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-5xl w-full mx-auto">
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight text-center">
          SKILLS
        </h2>
        <p className="font-mono text-xs text-primary mb-10 tracking-widest text-center">
          Technical Expertise
        </p>

        <div className="space-y-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 sm:p-5 rounded-xl bg-secondary/20 border border-primary/15"
            >
              {/* Category label */}
              <h3 className="font-mono text-[11px] font-bold text-primary tracking-widest w-full sm:w-36 flex-shrink-0">
                {category.name}
              </h3>

              {/* Separator */}
              <div className="hidden sm:block w-px h-8 bg-primary/20 flex-shrink-0" />

              {/* Skill icons row */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <SkillIcon key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
