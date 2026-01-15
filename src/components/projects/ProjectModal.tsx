import { useEffect } from 'react';
import { X } from 'lucide-react';

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
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
    id: 5,
    title: 'LearnLift',
    year: '2025',
    shortDescription: 'Platform designed to enhance peer-to-peer learning and academic collaboration.',
    fullDescription: [
      'Built LearnLift as a structured learning platform enabling students to access resources, interact with peers, and improve academic outcomes through organized content and collaboration tools.',
    ],
    techStack: ['Web Development', 'Learning Systems'],
  },
  {
    id: 6,
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
    id: 7,
    title: 'The Thursday Thing',
    year: '2025',
    shortDescription: 'Scalable full-stack web platform built for real-world production use.',
    fullDescription: [
      'Built "The Thursday Thing", a scalable full-stack web application using React, Node.js, and Firebase.',
      'Designed and implemented secure authentication, responsive UI, and backend services.',
      'Developed within agile teams with a focus on production-ready architecture and performance.',
    ],
    techStack: ['React', 'Node.js', 'Firebase', 'Full Stack Development'],
  },
];

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal Content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '85vh',
          backgroundColor: 'rgba(8, 15, 30, 0.98)',
          border: '1px solid rgba(103, 232, 249, 0.4)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(103, 232, 249, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(103, 232, 249, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          }}
        >
          <X size={18} color="#67e8f9" />
        </button>

        {/* Scrollable Content */}
        <div
          style={{
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {/* Media Section */}
          {project.youtubeUrl ? (
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '24px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <iframe
                src={project.youtubeUrl}
                title={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : project.image ? (
            <div
              style={{
                width: '100%',
                maxHeight: '200px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          ) : null}

          {/* Header */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h2
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#F5FAFF',
                  margin: 0,
                }}
              >
                {project.title}
              </h2>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  color: '#94a3b8',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(103, 232, 249, 0.1)',
                  borderRadius: '6px',
                  border: '1px solid rgba(103, 232, 249, 0.3)',
                }}
              >
                {project.year}
              </span>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#a5f3fc',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(8, 15, 30, 0.8)',
                  borderRadius: '20px',
                  border: '1px solid rgba(103, 232, 249, 0.4)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Full Description */}
          <div>
            <h3
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                fontWeight: 600,
                color: '#67e8f9',
                margin: '0 0 12px 0',
                letterSpacing: '0.08em',
              }}
            >
              PROJECT DETAILS
            </h3>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {project.fullDescription.map((desc, idx) => (
                <li
                  key={idx}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#DDE7EE',
                    lineHeight: 1.7,
                    marginBottom: '10px',
                    paddingLeft: '16px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: '#67e8f9',
                    }}
                  >
                    •
                  </span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
