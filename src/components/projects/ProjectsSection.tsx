import { useState } from 'react';
import { PROJECTS_DATA, Project } from './ProjectModal';

interface ProjectsSectionProps {
  focusWeight: number;
}

export function ProjectsSection({ focusWeight }: ProjectsSectionProps) {
  const [, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    // Dispatch custom event to open modal in parent
    window.dispatchEvent(new CustomEvent('openProjectModal', { detail: project }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px 24px',
        boxSizing: 'border-box',
        width: '100%',
        opacity: focusWeight > 0.3 ? Math.min((focusWeight - 0.3) / 0.5, 1) : 0,
        transition: 'opacity 0.2s ease',
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
          PROJECTS
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
          Featured Work
        </p>
      </div>

      {/* Projects Grid - 2 per row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          width: '100%',
        }}
      >
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(8, 15, 30, 0.4)',
              border: '1px solid rgba(103, 232, 249, 0.25)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* Title & Year */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <h3
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#F5FAFF',
                  margin: 0,
                  lineHeight: 1.3,
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  color: '#94a3b8',
                  flexShrink: 0,
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Short Description */}
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 400,
                color: '#DDE7EE',
                margin: 0,
                lineHeight: 1.5,
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
              }}
            >
              {project.shortDescription}
            </p>

            {/* Tech Stack Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px',
                    fontWeight: 500,
                    color: '#a5f3fc',
                    padding: '3px 6px',
                    backgroundColor: 'rgba(8, 15, 30, 0.6)',
                    borderRadius: '10px',
                    border: '1px solid rgba(103, 232, 249, 0.35)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px',
                    fontWeight: 500,
                    color: '#67e8f9',
                    padding: '3px 6px',
                  }}
                >
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(project)}
              style={{
                marginTop: '4px',
                padding: '5px 10px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                fontWeight: 600,
                color: '#67e8f9',
                backgroundColor: 'rgba(103, 232, 249, 0.1)',
                border: '1px solid rgba(103, 232, 249, 0.4)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                alignSelf: 'flex-start',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(103, 232, 249, 0.25)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(103, 232, 249, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View More Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
