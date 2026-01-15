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

  // Calculate responsive layout based on focus weight
  // As user zooms in (higher focus), transition from 2 columns to 1 column
  const isVerticalLayout = focusWeight > 0.75;
  const gridColumns = isVerticalLayout ? '1fr' : 'repeat(2, 1fr)';
  
  // Calculate opacity - visible from the start when focusWeight > 0.3
  const opacity = focusWeight > 0.3 ? 1 : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px 16px',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        opacity,
        transition: 'opacity 0.3s ease',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '16px',
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

      {/* Projects Grid - responsive based on focus */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: gridColumns,
          gap: isVerticalLayout ? '5px' : '6px',
          width: '100%',
          maxWidth: '100%',
          flex: 1,
          overflowY: isVerticalLayout ? 'auto' : 'hidden',
          transition: 'all 0.3s ease',
          justifyContent: 'center',
          alignContent: 'start',
        }}
      >
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            style={{
              padding: isVerticalLayout ? '8px 10px' : '8px 10px',
              backgroundColor: 'rgba(8, 15, 30, 0.85)',
              border: '1px solid rgba(103, 232, 249, 0.4)',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minHeight: isVerticalLayout ? 'auto' : '60px',
              maxHeight: isVerticalLayout ? '90px' : '75px',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Title & Year */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <h3
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: isVerticalLayout ? '11px' : '10px',
                  fontWeight: 700,
                  color: '#F5FAFF',
                  margin: 0,
                  lineHeight: 1.3,
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  flex: 1,
                  transition: 'font-size 0.3s ease',
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: isVerticalLayout ? '9px' : '8px',
                  color: '#a5f3fc',
                  flexShrink: 0,
                  fontWeight: 500,
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Short Description */}
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: isVerticalLayout ? '9px' : '8px',
                fontWeight: 400,
                color: '#DDE7EE',
                margin: 0,
                lineHeight: 1.4,
                textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                display: '-webkit-box',
                WebkitLineClamp: isVerticalLayout ? 3 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                transition: 'font-size 0.3s ease',
              }}
            >
              {project.shortDescription}
            </p>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(project)}
              style={{
                marginTop: 'auto',
                padding: '5px 10px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: isVerticalLayout ? '8px' : '7px',
                fontWeight: 600,
                color: '#67e8f9',
                backgroundColor: 'rgba(103, 232, 249, 0.15)',
                border: '1px solid rgba(103, 232, 249, 0.5)',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                alignSelf: 'flex-start',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(103, 232, 249, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(103, 232, 249, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;