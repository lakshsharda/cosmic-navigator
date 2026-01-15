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

  // Smaller plane geometry - reduced width
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(11, 7), []);
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(12.5, 8), []);
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

  // Solid dark background
  const baseColor = '#030712';
  const glowColor = '#0ea5e9';
  const borderColor = isActive ? '#22d3ee' : '#0891b2';

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

      {/* Main plane - solid dark background */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <primitive object={planeGeometry} attach="geometry" />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border effect */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={0.7}
        />
      </lineSegments>

      {/* HTML content - sized to fit inside the plane */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: '620px', // Smaller to fit inside border
        }}
        transform
        occlude={false}
        distanceFactor={8}
      >
        <div style={{
          opacity: focusWeight > 0.3 ? Math.min((focusWeight - 0.3) / 0.5, 1) : 0,
          transition: 'opacity 0.2s ease',
        }}>
          {/* Simple label when approaching */}
          {!showFullContent && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '10px',
              padding: '20px',
            }}>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px',
                letterSpacing: '0.3em',
                color: '#22d3ee',
                fontWeight: 600,
              }}>
                {`0${index + 1}`}
              </span>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '28px',
                letterSpacing: '0.1em',
                fontWeight: 700,
                color: '#ffffff',
              }}>
                {label.toUpperCase()}
              </span>
            </div>
          )}

          {/* Full content when very focused */}
          {showFullContent && content && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: content.hasImage ? '1fr auto' : '1fr',
              gap: '32px',
              alignItems: 'center',
              padding: '20px 28px',
            }}>
              {/* Text Content */}
              <div style={{ textAlign: 'left' }}>
                {/* Section label */}
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#22d3ee',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '6px',
                }}>
                  0{index + 1} / {label.toUpperCase()}
                </span>

                {/* Main heading - maximum contrast */}
                <h2 style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 4px 0',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}>
                  {content.title}
                </h2>

                {/* Subtitle */}
                {content.subtitle && (
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#22d3ee',
                    margin: '0 0 16px 0',
                    letterSpacing: '0.12em',
                  }}>
                    {content.subtitle}
                  </p>
                )}

                {/* Description - high contrast */}
                {content.description && (
                  <div style={{ marginBottom: '16px' }}>
                    {content.description.map((para, i) => (
                      <p key={i} style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#f1f5f9', // Very high contrast
                        margin: '0 0 10px 0',
                        lineHeight: 1.6,
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
                    gap: '8px', 
                    flexWrap: 'wrap',
                  }}>
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#22d3ee',
                          padding: '5px 12px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(34, 211, 238, 0.1)',
                          border: '1px solid rgba(34, 211, 238, 0.35)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Image placeholder */}
              {content.hasImage && (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '2px solid rgba(34, 211, 238, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    color: '#475569',
                  }}>
                    Your Image
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Html>

      {/* Corner accents */}
      <mesh position={[-5.3, -3.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.9} 
        />
      </mesh>
      <mesh position={[5.3, -3.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.9} 
        />
      </mesh>
      <mesh position={[-5.3, 3.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.9} 
        />
      </mesh>
      <mesh position={[5.3, 3.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={borderColor} 
          transparent 
          opacity={targets.opacity * 0.9} 
        />
      </mesh>
    </group>
  );
}

export default SectionPlane;
