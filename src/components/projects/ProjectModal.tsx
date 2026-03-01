import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ExternalLink, Calendar, Code2 } from 'lucide-react';

// Project images
import projectVisionAi from '@/assets/project-vision-ai.png';
import projectManthan from '@/assets/project-manthan.png';
import projectBurntFace from '@/assets/project-burnt-face.png';
import projectBreathguard from '@/assets/project-breathguard.png';

export interface Project {
  id: number;
  title: string;
  year: string;
  shortDescription: string;
  fullDescription: string[];
  techStack: string[];
  image?: string;
  youtubeUrl?: string;
   repoUrl?: string;
   repoLabel?: string;
   demoUrl?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'CodeJanitor',
    year: '2025',
    shortDescription: 'Autonomous DevSecOps agent that finds, verifies, and repairs security vulnerabilities in real-time.',
    fullDescription: [
      'CodeJanitor is a self-healing security layer for CI/CD pipelines using multi-agent AI architecture.',
      'Red Team Agent: Attempts to exploit vulnerabilities within a Docker Sandbox to confirm they are real and reachable.',
      'Blue Team Agent: Analyzes code and generates precise patches, then re-tests against exploits to verify fixes.',
      'Automated workflow: Detection → Validation → Remediation → Regression Testing → PR Generation.',
    ],
    techStack: ['AI Agents', 'DevSecOps', 'Docker', 'CI/CD', 'Security'],
    image: '/codjanitor.png',
    youtubeUrl: 'https://www.youtube.com/embed/hKggrSrdvHg',
    demoUrl: 'http://143.110.255.103:3000/',
  },
  {
    id: 2,
    title: 'Vision-Based Assistive AI',
    year: '2025',
    shortDescription: 'Deep learning–based assistive vision system for image and video scene understanding.',
    fullDescription: [
      'Built a deep learning–based computer vision system for image and video scene understanding.',
      'Designed assistive AI features that translate visual data into actionable guidance for accessibility use cases.',
      'Implemented complete ML pipelines including data preprocessing, model inference, and real-time API integration.',
    ],
    techStack: ['Python', 'Computer Vision', 'Deep Learning'],
    image: projectVisionAi,
    youtubeUrl: 'https://www.youtube.com/embed/LwvlC_jxezQ',
    demoUrl: 'https://laksh123y9gi67txry6cv-ai-navigation-assistant.hf.space/',
  },
  {
    id: 3,
    title: 'CultureCircle',
    year: '2025',
    shortDescription: 'AI-powered group compatibility platform using taste intelligence and real-time recommendations.',
    fullDescription: [
      'Integrated Qloo Taste AI API (5.5M+ entities) to compute accurate group compatibility scores.',
      'Designed a Harmony Score algorithm using Gemini API with sub-200ms explainable recommendations.',
      'Implemented real-time Firebase Firestore synchronization for seamless multi-user updates.',
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'Firebase', 'Gemini API', 'Qloo API'],
    youtubeUrl: 'https://www.youtube.com/embed/1gRseMOR9I0',
    repoUrl: 'https://github.com/Laksh-npc/culture-circle-vibes-hub',
    repoLabel: 'Code',
  },
  {
    id: 4,
    title: 'Manthan – Mental Wellness App',
    year: '2025',
    shortDescription: 'Mobile mental wellness app delivering personalized ML-based wellness insights.',
    fullDescription: [
      'Built a mobile mental wellness application integrating an ML model trained on questionnaire-based datasets.',
      'Generated three personalized wellness scores with 80%+ classification accuracy.',
      'Implemented secure authentication, user profiling, and real-time cloud storage using Firebase.',
    ],
    techStack: ['Java', 'Machine Learning', 'Firebase', 'Mobile App Development'],
    image: projectManthan,
    repoUrl: 'https://github.com/lakshsharda/mental-welness',
    repoLabel: 'Code',
  },
  {
    id: 5,
    title: 'Burnt Face Reconstruction',
    year: '2025',
    shortDescription: 'GAN-based facial image reconstruction and restoration system.',
    fullDescription: [
      'Developed a GAN-based deep learning model for facial image reconstruction and restoration.',
      'Focused on improving visual realism and structural accuracy in damaged facial images.',
    ],
    techStack: ['Python', 'Deep Learning', 'GANs'],
    image: projectBurntFace,
  },
  {
    id: 6,
    title: 'LearnLift',
    year: '2025',
    shortDescription: 'Platform designed to enhance peer-to-peer learning and academic collaboration.',
    fullDescription: [
      'Built a structured learning platform enabling students to access resources, interact with peers, and improve academic outcomes through organized content and collaboration tools.',
    ],
    techStack: ['Web Development', 'Learning Systems'],
    image: '/tudent.png',
    repoUrl: 'https://github.com/Laksh-npc/LearnLift_final',
    repoLabel: 'Code',
  },
  {
    id: 7,
    title: 'BreathGuard (IoT Project)',
    year: '2025',
    shortDescription: 'IoT-based air quality and breathing safety monitoring system.',
    fullDescription: [
      'Developed BreathGuard, an IoT-based system designed to monitor air quality and breathing conditions in real time.',
      'Focused on health and safety use cases with live sensor data visualization and alerts.',
    ],
    techStack: ['IoT', 'Sensors', 'Cloud Integration'],
    image: projectBreathguard,
  },
  {
    id: 8,
    title: 'The Thursday Thing',
    year: '2025',
    shortDescription: 'Scalable full-stack web platform built for real-world production use.',
    fullDescription: [
      'Built "The Thursday Thing", a scalable full-stack web application using React, Node.js, and Firebase.',
      'Designed and implemented secure authentication, responsive UI, and backend services.',
      'Developed within agile teams with a focus on production-ready architecture and performance.',
    ],
    techStack: ['React', 'Node.js', 'Firebase', 'Full Stack Development'],
    repoUrl: 'https://github.com/lakshsharda/thursday-tribe-frontend-glow',
    repoLabel: 'Code',
  },
  {
    id: 9,
    title: 'Author Contribution & Institutional Analysis of Highly Cited Indian Research Papers',
    year: '2024',
    shortDescription: 'Research-driven analysis of author collaboration, institutional impact, and publication strategies in highly cited Indian academic papers.',
    fullDescription: [
      'INTRODUCTION',
      'The research paper delves into an in-depth analysis of the contributions made by individual authors and groups of authors to highly cited academic papers originating from India. It seeks to understand the dynamics of authorial input in shaping the success and impact of such scholarly works, offering a nuanced exploration of the factors that contribute to their widespread recognition.',
      'By examining whether papers authored by a single individual or through collaborations involving multiple authors receive more attention and citations, the study sheds light on the interplay between solo and collaborative academic efforts in driving research influence.',
      'A significant focus of the research lies in mapping the institutional affiliations of these authors. By identifying the universities, research institutes, and organizations with which they are associated, the study highlights the institutions that are at the forefront of producing impactful academic research in India.',
      'Furthermore, the paper categorizes the types of research being published, distinguishing between articles, reviews, and conference papers, among other formats. It examines how these different publication types influence citation rates and academic recognition.',
      'By evaluating author collaboration patterns, institutional affiliations, and publication formats, the study identifies trends that underpin the success of academic research in India.',
      'The findings offer actionable insights for researchers, institutions, and policymakers by highlighting how collaboration, institutional support, and publication strategies contribute to research visibility and citation impact.',
    ],
    techStack: ['Research Analysis', 'Bibliometrics', 'Data Analysis', 'Academic Research'],
    image: '/image.png',
  },
  {
    id: 10,
    title: 'Stock Market Analytics & Financial Network Platform',
    year: '2025',
    shortDescription: 'Full-stack stock market platform with trading dashboard and advanced financial network analytics.',
    fullDescription: [
      'Comprehensive stock market analysis and visualization platform with a Groww-inspired dashboard and DSFM analytics engine.',
      'Live and historical price visualization, company info, sector trends, market movers, watchlists, and portfolio tracking.',
      'Computed log returns from NSE data; built correlation matrices and financial networks.',
      'Analyzed network connectivity and structure with Betweenness Centrality using the Brandes algorithm.',
      'Interactive walkthrough of centrality computation; shock propagation simulation using correlation-based decay.',
      'Systemic risk and contagion effect analysis.',
      'Hybrid ARIMA–GARCH models for returns and volatility with confidence intervals.',
      'Interactive charts, heatmaps, network graphs, and forecast views in full-stack architecture.',
    ],
    techStack: ['React', 'Python', 'Data Science', 'Financial Networks', 'ARIMA', 'GARCH', 'NSE Data'],
    image: '/dsfm.png',
    repoUrl: 'https://github.com/Laksh-npc/pixel-perfect-clone-4392',
    repoLabel: 'Code',
  },
  {
    id: 11,
    title: 'EcoEmpower',
    year: '2024',
    shortDescription: 'A sustainability-focused web platform built to promote eco-friendly awareness and actions.',
    fullDescription: [
      'Built a sustainability-focused web platform to promote environmental awareness.',
      'Designed interactive and responsive UI using HTML and CSS.',
      'Implemented dynamic functionality using JavaScript.',
      'Organized content to present eco-friendly practices and insights clearly.',
      'Focused on clean design, usability, and accessibility.',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    image: '/ecoempower.png',
    repoUrl: 'https://github.com/lakshsharda/EcoEmpower',
    repoLabel: 'Code',
  },
];

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [imagePopupOpen, setImagePopupOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imagePopupOpen) {
          setImagePopupOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, imagePopupOpen]);

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-secondary/50 to-background/95 border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} />
            </motion.button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[85vh] custom-scrollbar">
              {/* Media Section */}
              {project.youtubeUrl ? (
                <div className="w-full aspect-video bg-background/50">
                  <iframe
                    src={project.youtubeUrl}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : project.image ? (
                <motion.div
                  className="relative w-full h-48 sm:h-56 bg-background/50 cursor-pointer group overflow-hidden"
                  onClick={() => setImagePopupOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Zoom overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm">
                      <ZoomIn size={14} className="text-primary" />
                      <span className="font-mono text-xs text-primary">Click to expand</span>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="w-full h-32 bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center">
                  <Code2 size={40} className="text-primary/40" />
                </div>
              )}

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight"
                    >
                      {project.title}
                    </motion.h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
                      >
                        <Calendar size={12} className="text-primary" />
                        <span className="font-mono text-xs text-primary">{project.year}</span>
                      </motion.div>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0d1526] border border-white/10 text-foreground text-xs font-mono hover:border-primary/60 hover:text-primary transition-colors"
                        >
                          <span>{project.repoLabel || 'Code'}</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/20 border border-primary/40 text-primary text-xs font-mono hover:bg-primary/30 hover:border-primary/60 transition-colors"
                        >
                          <span>Demo</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {project.shortDescription}
                  </motion.p>
                </div>

                {/* Tech Stack */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={14} className="text-primary" />
                    <span className="font-mono text-xs text-primary tracking-wider">TECH STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="font-mono text-xs px-3 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-foreground/90 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink size={14} className="text-primary" />
                    <span className="font-mono text-xs text-primary tracking-wider">PROJECT DETAILS</span>
                  </div>
                  <ul className="space-y-3">
                    {project.fullDescription.map((desc, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex gap-3 text-foreground/85 text-sm leading-relaxed"
                      >
                        <span className="text-primary mt-1 flex-shrink-0">●</span>
                        <span>{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Image Popup Overlay */}
      <AnimatePresence>
        {imagePopupOpen && project.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 sm:p-12 bg-background/95 backdrop-blur-xl cursor-pointer"
            onClick={() => setImagePopupOpen(false)}
          >
            {/* Close hint */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 flex items-center gap-3"
            >
              <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                Press ESC or click anywhere to close
              </span>
              <motion.button
                onClick={() => setImagePopupOpen(false)}
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </motion.div>

            {/* Full-size image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectModal;
