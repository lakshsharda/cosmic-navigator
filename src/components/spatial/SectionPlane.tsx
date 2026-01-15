import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Section content data
const SECTION_CONTENT: Record<string, {
  title: string;
  subtitle?: string;
  description?: string[];
  tags?: string[];
  hasImage?: boolean;
}> = {
  about: {
    title: 'LAKSH SHARDA',
    subtitle: 'Developer • Designer • Creator',
    description: [
      "I'm a tech-focused developer with a strong interest in building scalable, well-structured applications.",
      "My experience includes web development, frontend frameworks, and backend services.",
      "I focus on writing clean, maintainable code and understanding how systems work end-to-end."
    ],
    tags: ['Full Stack', 'System Design', 'UI/UX'],
    hasImage: true,
  },
  experience: {
    title: 'EXPERIENCE',
    subtitle: 'Professional Journey',
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
    opacity: 0.3,
    glowOpacity: 0,
    rotationY: 0,
  });

  // Calculate target values based on focus and hover state
  const targets = useMemo(() => {
    const baseOpacity = 0.6 + focusWeight * 0.3; // Higher base opacity for better text backdrop
    const baseScale = 0.85 + focusWeight * 0.2;
    
    return {
      scale: isActive ? baseScale * 1.05 : baseScale,
      opacity: hovered ? Math.min(baseOpacity + 0.1, 0.9) : baseOpacity,
      glowOpacity: isActive ? 0.3 + focusWeight * 0.2 : focusWeight * 0.15,
      rotationY: hovered ? 0.015 : 0,
    };
  }, [focusWeight, isActive, hovered]);

  // Create geometry - larger plane for content
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(14, 9), []);
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(16, 11), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(planeGeometry), [planeGeometry]);

  // Smooth animation
  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current || !glowRef.current) return;

    const lerp = (current: number, target: number, speed: number) =>
      current + (target - current) * Math.min(speed * delta * 60, 1);

    animatedValues.current.scale = lerp(animatedValues.current.scale, targets.scale, 0.08);
    animatedValues.current.opacity = lerp(animatedValues.current.opacity, targets.opacity, 0.1);
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
      borderMaterial.opacity = isActive ? 0.7 : 0.4;
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

  // Darker base for better text contrast
  const baseColor = '#050a12';
  const glowColor = '#0ea5e9';
  const borderColor = isActive ? '#38bdf8' : '#1e40af';

  // Calculate content visibility based on focus weight
  const showFullContent = focusWeight > 0.5;
  const contentOpacity = Math.max(0, (focusWeight - 0.3) / 0.7);

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

      {/* Main glass plane - solid dark for text readability */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <primitive object={planeGeometry} attach="geometry" />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border effect */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={0.6}
        />
      </lineSegments>

      {/* HTML overlay for content */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: '820px',
        }}
        transform
        occlude={false}
        distanceFactor={8}
      >
        <div 
          style={{
            opacity: 0.4 + focusWeight * 0.6,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Simple label when far away */}
          {!showFullContent && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '16px',
                letterSpacing: '0.3em',
                color: '#67e8f9', // Bright cyan
                fontWeight: 500,
              }}>
                {`0${index + 1}`}
              </span>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '36px',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: '#EAF6FF', // Bright off-white
              }}>
                {label.toUpperCase()}
              </span>
            </div>
          )}

          {/* Full content when focused */}
          {showFullContent && content && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gap: '48px',
              alignItems: 'center',
              padding: '24px 32px',
              opacity: contentOpacity,
            }}>
              {/* Left: Text Content */}
              <div style={{ textAlign: 'left' }}>
                {/* Section label */}
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  color: '#67e8f9', // Bright cyan
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  0{index + 1} / {label.toUpperCase()}
                </span>

                {/* Main heading - bright and bold */}
                <h2 style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#CFF4FF', // Light cyan as specified
                  margin: '0 0 6px 0',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}>
                  {content.title}
                </h2>

                {/* Subtitle - medium weight, spaced */}
                {content.subtitle && (
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#38bdf8', // Cyan accent
                    margin: '0 0 20px 0',
                    letterSpacing: '0.15em',
                  }}>
                    {content.subtitle}
                  </p>
                )}

                {/* Description paragraphs - clean, readable */}
                {content.description && (
                  <div style={{ marginBottom: '20px' }}>
                    {content.description.map((para, i) => (
                      <p key={i} style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#e2e8f0', // Strong contrast - slate-200
                        margin: '0 0 12px 0',
                        lineHeight: 1.65, // Good readability
                        letterSpacing: '0.01em',
                      }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {content.tags && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    flexWrap: 'wrap',
                    marginTop: '8px',
                  }}>
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#67e8f9',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(56, 189, 248, 0.12)',
                          border: '1px solid rgba(103, 232, 249, 0.3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Image placeholder - visually separated */}
              {content.hasImage && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  paddingLeft: '24px',
                  borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
                }}>
                  <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '2px solid rgba(56, 189, 248, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      color: '#64748b',
                    }}>
                      Your Image
                    </span>
                    {/* Corner accents */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid #38bdf8', borderLeft: '2px solid #38bdf8' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid #38bdf8', borderRight: '2px solid #38bdf8' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid #38bdf8', borderLeft: '2px solid #38bdf8' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid #38bdf8', borderRight: '2px solid #38bdf8' }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Html>

      {/* Corner dots for frame effect */}
      <mesh position={[-6.8, -4.3, 0.01]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#1e40af'} 
          transparent 
          opacity={isActive ? 0.9 : 0.5} 
        />
      </mesh>
      <mesh position={[6.8, -4.3, 0.01]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#1e40af'} 
          transparent 
          opacity={isActive ? 0.9 : 0.5} 
        />
      </mesh>
      <mesh position={[-6.8, 4.3, 0.01]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#1e40af'} 
          transparent 
          opacity={isActive ? 0.9 : 0.5} 
        />
      </mesh>
      <mesh position={[6.8, 4.3, 0.01]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#1e40af'} 
          transparent 
          opacity={isActive ? 0.9 : 0.5} 
        />
      </mesh>
    </group>
  );
}

export default SectionPlane;
