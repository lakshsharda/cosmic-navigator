/**
 * Portfolio content data structure
 * Separate from spatial logic - pure data
 */

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'concept';
  proficiency: number; // 0-1
}

export interface Project {
  id: string;
  name: string;
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  skillIds: string[]; // Links to skills
  year: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  impact: string;
  skillIds: string[];
}

export interface Achievement {
  id: string;
  title: string;
  rank: string;
  context: string;
  year: number;
}

// ============================================
// SKILLS DATA
// ============================================
export const skills: Skill[] = [
  // Languages
  { id: 'typescript', name: 'TypeScript', category: 'language', proficiency: 0.9 },
  { id: 'python', name: 'Python', category: 'language', proficiency: 0.85 },
  { id: 'rust', name: 'Rust', category: 'language', proficiency: 0.6 },
  { id: 'sql', name: 'SQL', category: 'language', proficiency: 0.8 },
  
  // Frameworks
  { id: 'react', name: 'React', category: 'framework', proficiency: 0.9 },
  { id: 'nodejs', name: 'Node.js', category: 'framework', proficiency: 0.85 },
  { id: 'threejs', name: 'Three.js', category: 'framework', proficiency: 0.75 },
  { id: 'nextjs', name: 'Next.js', category: 'framework', proficiency: 0.8 },
  
  // Tools
  { id: 'docker', name: 'Docker', category: 'tool', proficiency: 0.75 },
  { id: 'aws', name: 'AWS', category: 'tool', proficiency: 0.7 },
  { id: 'git', name: 'Git', category: 'tool', proficiency: 0.9 },
  { id: 'figma', name: 'Figma', category: 'tool', proficiency: 0.65 },
  
  // Concepts
  { id: 'ml', name: 'Machine Learning', category: 'concept', proficiency: 0.7 },
  { id: 'cv', name: 'Computer Vision', category: 'concept', proficiency: 0.65 },
  { id: 'systems', name: 'Systems Design', category: 'concept', proficiency: 0.8 },
  { id: 'webgl', name: 'WebGL', category: 'concept', proficiency: 0.7 },
];

// ============================================
// PROJECTS DATA
// ============================================
export const projects: Project[] = [
  {
    id: 'spatial-portfolio',
    name: 'Spatial Portfolio',
    problem: 'Traditional portfolios fail to communicate depth and interconnection of skills',
    solution: 'Built a 3D spatial navigation system with scroll-driven camera and focus detection',
    outcome: 'Interactive experience that demonstrates technical depth through the medium itself',
    techStack: ['React', 'Three.js', 'TypeScript', 'Tailwind'],
    skillIds: ['react', 'threejs', 'typescript', 'webgl', 'systems'],
    year: 2024,
  },
  {
    id: 'cv-pipeline',
    name: 'CV Processing Pipeline',
    problem: 'Manual document processing was bottlenecking onboarding flow',
    solution: 'Designed real-time OCR pipeline with ML-based extraction and validation',
    outcome: '90% reduction in manual review time, 99.2% accuracy on structured documents',
    techStack: ['Python', 'TensorFlow', 'AWS Lambda', 'PostgreSQL'],
    skillIds: ['python', 'ml', 'cv', 'aws', 'sql'],
    year: 2023,
  },
  {
    id: 'design-system',
    name: 'Component Design System',
    problem: 'Inconsistent UI across products causing maintenance overhead',
    solution: 'Created comprehensive component library with semantic tokens and accessibility built-in',
    outcome: '40% faster feature development, unified brand experience across 5 products',
    techStack: ['React', 'TypeScript', 'Storybook', 'Figma'],
    skillIds: ['react', 'typescript', 'figma', 'systems'],
    year: 2023,
  },
  {
    id: 'realtime-collab',
    name: 'Real-time Collaboration Engine',
    problem: 'Users needed concurrent editing without conflicts or data loss',
    solution: 'Implemented CRDT-based sync engine with optimistic updates and conflict resolution',
    outcome: 'Sub-100ms sync latency, zero data conflicts in production',
    techStack: ['Rust', 'WebSocket', 'Redis', 'TypeScript'],
    skillIds: ['rust', 'typescript', 'nodejs', 'systems'],
    year: 2024,
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================
export const experiences: Experience[] = [
  {
    id: 'senior-dev',
    role: 'Senior Software Engineer',
    company: 'Tech Company',
    period: '2022 - Present',
    responsibilities: [
      'Lead architecture decisions for frontend platform',
      'Mentor team of 4 engineers',
      'Drive technical strategy for product initiatives',
    ],
    impact: 'Reduced page load time by 60%, increased developer velocity by 35%',
    skillIds: ['typescript', 'react', 'nextjs', 'systems', 'aws'],
  },
  {
    id: 'fullstack-dev',
    role: 'Full Stack Developer',
    company: 'Startup',
    period: '2020 - 2022',
    responsibilities: [
      'Built core product features end-to-end',
      'Designed and implemented API architecture',
      'Established CI/CD and testing practices',
    ],
    impact: 'Shipped 12 major features, grew user base from 1K to 50K',
    skillIds: ['nodejs', 'react', 'docker', 'sql', 'git'],
  },
  {
    id: 'ml-intern',
    role: 'ML Research Intern',
    company: 'Research Lab',
    period: '2019 - 2020',
    responsibilities: [
      'Developed computer vision models for medical imaging',
      'Published research on efficient inference techniques',
    ],
    impact: 'Paper accepted at top-tier venue, model deployed in clinical trial',
    skillIds: ['python', 'ml', 'cv'],
  },
];

// ============================================
// ACHIEVEMENTS DATA
// ============================================
export const achievements: Achievement[] = [
  {
    id: 'hackathon-1',
    title: 'Hackathon Winner',
    rank: '1st Place',
    context: 'National level, 500+ participants',
    year: 2023,
  },
  {
    id: 'oss-contrib',
    title: 'Open Source Contributor',
    rank: 'Top 50',
    context: 'Major framework, 1000+ merged PRs total',
    year: 2024,
  },
  {
    id: 'speaker',
    title: 'Conference Speaker',
    rank: 'Invited',
    context: 'International tech conference, 2000+ attendees',
    year: 2023,
  },
];

// ============================================
// ABOUT DATA
// ============================================
export const aboutData = {
  summary: 'Engineer focused on systems that scale. I build tools that multiply human capability.',
  focus: ['Systems Architecture', 'Interactive Experiences', 'Developer Tools'],
  keywords: ['AI/ML', 'WebGL', 'Distributed Systems', 'DX'],
};

// ============================================
// CONTACT DATA
// ============================================
export const contactData = {
  email: 'hello@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  resume: '/resume.pdf',
};

// ============================================
// UTILITY: Get skills for a project
// ============================================
export function getProjectSkills(projectId: string): Skill[] {
  const project = projects.find(p => p.id === projectId);
  if (!project) return [];
  return skills.filter(s => project.skillIds.includes(s.id));
}

// ============================================
// UTILITY: Get projects for a skill
// ============================================
export function getSkillProjects(skillId: string): Project[] {
  return projects.filter(p => p.skillIds.includes(skillId));
}

// ============================================
// UTILITY: Get skill connections (skills used together)
// ============================================
export function getSkillConnections(): Map<string, Set<string>> {
  const connections = new Map<string, Set<string>>();
  
  skills.forEach(skill => {
    connections.set(skill.id, new Set());
  });
  
  // Skills are connected if they appear in the same project
  projects.forEach(project => {
    project.skillIds.forEach(skillA => {
      project.skillIds.forEach(skillB => {
        if (skillA !== skillB) {
          connections.get(skillA)?.add(skillB);
        }
      });
    });
  });
  
  return connections;
}
