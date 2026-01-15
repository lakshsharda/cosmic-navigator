import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Experience data type
interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

// Experience entries
const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'THINKINGLABS AI',
    role: 'Lead Intern Scientist – ThinkVisual Assist Project',
    duration: 'Dec 2025 – Present',
    description: [
      'Leading end-to-end development of an AI-driven visual assistance pipeline.',
      'Working on scene understanding, object detection, and real-time inference.',
      'Focused on assistive technologies and real-world deployment.',
    ],
  },
  {
    company: 'U2CA Consultants',
    role: 'Full Stack Developer Intern',
    duration: 'Jun 2025 – Aug 2025',
    description: [
      'Built a scalable full-stack web application "The Thursday Thing".',
      'Used React, Node.js, and Firebase.',
      'Delivered secure, responsive, production-ready systems in agile teams.',
    ],
  },
];

// Section content data
const SECTION_CONTENT: Record<string, {
  title: string;
  subtitle?: string;
  description?: string;
  hasImage?: boolean;
  isExperience?: boolean;
}> = {
  about: {
    title: 'LAKSH SHARDA',
    subtitle: 'Developer • Designer • Creator',
    description: "I'm a full-stack developer with expertise in building scalable, production-ready applications. My technical focus includes React, TypeScript, Node.js, and cloud-native architectures. I have hands-on experience with frontend frameworks, RESTful APIs, database design, and CI/CD pipelines. I prioritize writing clean, testable code and building systems that are maintainable long-term. Currently exploring distributed systems, performance optimization, and developer tooling.",
    hasImage: true,
  },
  experience: {
    title: 'EXPERIENCE',
    subtitle: 'Professional Journey',
    isExperience: true,
  },
  projects: {
    title: 'PROJECTS',
    subtitle: 'Featured Work',
  },
  skills: {
    title: 'SKILLS',
    subtitle: 'Technical Expertise',
  },
  achievements: {
    title: 'ACHIEVEMENTS',
    subtitle: 'Recognition & Awards',
  },
  contact: {
    title: 'CONTACT',
    subtitle: 'Get In Touch',
  },
};

interface SectionPlaneProps {
  id: string;
  label: string;
  position: [number, number, number];
  focusWeight: number;
  isActive: boolean;
  onHover?: (id: string | null, position?: THREE.Vector3) => void;
  displacement?: THREE.Vector3;
  index: number;
}

/**
 * A single section plane in 3D space with content that scales with focus
 */
export function SectionPlane({
  id,
  label,
  position,
  focusWeight,
  isActive,
  onHover,
  displacement = new THREE.Vector3(0, 0, 0),
  index,
}: SectionPlaneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const borderRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  const content = SECTION_CONTENT[id];

  // Animated values
  const animatedValues = useRef({
    scale: 1,
    opacity: 0,
    glowOpacity: 0,
    rotationY: 0,
  });

  // Calculate target values - ONLY visible when focused
  const targets = useMemo(() => {
    // Only show when focus weight is significant
    const visibility = focusWeight > 0.3 ? (focusWeight - 0.3) / 0.7 : 0;
    const baseScale = 0.9 + focusWeight * 0.15;
    
    return {
      scale: isActive ? baseScale * 1.02 : baseScale,
      opacity: visibility * 0.95, // Fade in only when close
      glowOpacity: isActive ? visibility * 0.25 : visibility * 0.1,
      rotationY: hovered ? 0.01 : 0,
    };
  }, [focusWeight, isActive, hovered]);

  // Larger plane geometry with room for content (keep everything inside border)
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(15.5, 7.6), []);
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(16.6, 8.6), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(planeGeometry), [planeGeometry]);

  // Smooth animation
  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current || !glowRef.current) return;

    const lerp = (current: number, target: number, speed: number) =>
      current + (target - current) * Math.min(speed * delta * 60, 1);

    animatedValues.current.scale = lerp(animatedValues.current.scale, targets.scale, 0.08);
    animatedValues.current.opacity = lerp(animatedValues.current.opacity, targets.opacity, 0.12);
    animatedValues.current.glowOpacity = lerp(animatedValues.current.glowOpacity, targets.glowOpacity, 0.08);
    animatedValues.current.rotationY = lerp(animatedValues.current.rotationY, targets.rotationY, 0.1);

    const s = animatedValues.current.scale;
    groupRef.current.scale.set(s, s, 1);
    groupRef.current.rotation.y = animatedValues.current.rotationY;

    groupRef.current.position.x = position[0] + (displacement?.x || 0);
    groupRef.current.position.y = position[1] + (displacement?.y || 0);
    groupRef.current.position.z = position[2] + (displacement?.z || 0);

    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = animatedValues.current.opacity;

    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    glowMaterial.opacity = animatedValues.current.glowOpacity;

    if (borderRef.current) {
      const borderMaterial = borderRef.current.material as THREE.LineBasicMaterial;
      borderMaterial.opacity = animatedValues.current.opacity * 0.8;
    }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (groupRef.current && onHover) {
      onHover(id, groupRef.current.position);
    }
  };

  const handlePointerLeave = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
    if (onHover) {
      onHover(null);
    }
  };

  // Darker background for better contrast
  const baseColor = '#020408';
  const glowColor = '#0891b2';
  const borderColor = isActive ? '#67e8f9' : '#22d3ee';

  // Show full content only when very focused
  const showFullContent = focusWeight > 0.6;

  return (
    <group ref={groupRef} position={position}>
      {/* Glow effect behind the plane */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <primitive object={glowGeometry} attach="geometry" />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Main plane - fully transparent so stars show through */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <primitive object={planeGeometry} attach="geometry" />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border effect - subtle and soft */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={0.5}
        />
      </lineSegments>

      {/* HTML content - sized to stay INSIDE the plane border */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: '720px',
        }}
        transform
        occlude={false}
        distanceFactor={8}
      >
        <div
          style={{
            opacity: focusWeight > 0.3 ? Math.min((focusWeight - 0.3) / 0.5, 1) : 0,
            transition: 'opacity 0.2s ease',
            boxSizing: 'border-box',
          }}
        >
          {/* Simple label when approaching */}
          {!showFullContent && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '28px',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: '#F5FAFF',
                }}
              >
                {label.toUpperCase()}
              </span>
            </div>
          )}

          {/* Full content when very focused */}
          {showFullContent && content && (
            <div
              style={{
                display: 'flex',
                flexDirection: content.isExperience ? 'column' : 'row',
                alignItems: content.isExperience ? 'flex-start' : 'center',
                gap: content.isExperience ? '16px' : '28px',
                padding: '24px 28px',
                boxSizing: 'border-box',
                background: content.isExperience ? 'rgba(2, 4, 8, 0.85)' : 'transparent',
                borderRadius: '8px',
              }}
            >
              {/* Experience Section Layout */}
              {content.isExperience ? (
                <>
                  {/* Header */}
                  <div style={{ marginBottom: '8px' }}>
                    <h2
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 4px 0',
                        letterSpacing: '0.02em',
                        lineHeight: 1.2,
                        textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                      }}
                    >
                      {content.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#a5f3fc',
                        margin: 0,
                        letterSpacing: '0.15em',
                        textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      {content.subtitle}
                    </p>
                  </div>

                  {/* Experience Items */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                      width: '100%',
                    }}
                  >
                    {EXPERIENCE_DATA.map((exp, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderLeft: '2px solid rgba(103, 232, 249, 0.5)',
                          paddingLeft: '14px',
                        }}
                      >
                        {/* Company Name */}
                        <h3
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#F5FAFF',
                            margin: '0 0 3px 0',
                            letterSpacing: '0.02em',
                            lineHeight: 1.3,
                          }}
                        >
                          {exp.company}
                        </h3>
                        {/* Role */}
                        <p
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#e2e8f0',
                            margin: '0 0 2px 0',
                            lineHeight: 1.4,
                          }}
                        >
                          {exp.role}
                        </p>
                        {/* Duration */}
                        <p
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '10px',
                            fontWeight: 400,
                            color: '#94a3b8',
                            margin: '0 0 8px 0',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {exp.duration}
                        </p>
                        {/* Description bullets */}
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                          }}
                        >
                          {exp.description.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              style={{
                                fontFamily: 'Inter, system-ui, sans-serif',
                                fontSize: '11px',
                                fontWeight: 400,
                                color: '#DDE7EE',
                                lineHeight: 1.7,
                                marginBottom: '2px',
                                paddingLeft: '12px',
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
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Default Section Layout (About, etc.) */}
                  <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 6px 0',
                        letterSpacing: '0.02em',
                        lineHeight: 1.2,
                        textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                      }}
                    >
                      {content.title}
                    </h2>

                    {content.subtitle && (
                      <p
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#a5f3fc',
                          margin: '0 0 14px 0',
                          letterSpacing: '0.15em',
                          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                        }}
                      >
                        {content.subtitle}
                      </p>
                    )}

                    {content.description && (
                      <p
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#ffffff',
                          margin: 0,
                          lineHeight: 1.75,
                          maxWidth: '420px',
                          textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                        }}
                      >
                        {content.description}
                      </p>
                    )}
                  </div>

                  {content.hasImage && (
                    <div
                      style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(8, 15, 30, 0.6)',
                        border: '1px solid rgba(103, 232, 249, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '10px',
                          color: '#94a3b8',
                        }}
                      >
                        Image
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Html>

      {/* Corner accents */}
      <mesh position={[-7.55, -3.55, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.7} 
        />
      </mesh>
      <mesh position={[7.55, -3.55, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.7} 
        />
      </mesh>
      <mesh position={[-7.55, 3.55, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.7} 
        />
      </mesh>
      <mesh position={[7.55, 3.55, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.7} 
        />
      </mesh>
    </group>
  );
}

export default SectionPlane;
