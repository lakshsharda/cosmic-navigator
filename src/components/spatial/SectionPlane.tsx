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
    const baseOpacity = 0.08 + focusWeight * 0.25;
    const baseScale = 0.85 + focusWeight * 0.2;
    
    return {
      scale: isActive ? baseScale * 1.05 : baseScale,
      opacity: hovered ? Math.min(baseOpacity + 0.1, 0.4) : baseOpacity,
      glowOpacity: isActive ? 0.25 + focusWeight * 0.2 : focusWeight * 0.1,
      rotationY: hovered ? 0.02 : 0,
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
      borderMaterial.opacity = isActive ? 0.6 : 0.25;
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

  const baseColor = isActive ? '#1e3a5f' : '#1a2744';
  const glowColor = '#0ea5e9';
  const borderColor = isActive ? '#38bdf8' : '#334155';

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

      {/* Main glass plane */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <primitive object={planeGeometry} attach="geometry" />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border effect */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {/* HTML overlay for content - scales with 3D plane */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: '700px',
        }}
        transform
        occlude={false}
        distanceFactor={8}
      >
        <div 
          className="w-full"
          style={{
            opacity: 0.15 + focusWeight * 0.85,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Simple label when far away */}
          {!showFullContent && (
            <div className="flex flex-col items-center gap-2">
              <span 
                className="font-mono text-sm tracking-[0.3em] text-primary/60"
                style={{ fontSize: '14px' }}
              >
                {`0${index + 1}`}
              </span>
              <span 
                className={`font-mono text-3xl tracking-[0.2em] font-medium ${
                  isActive ? 'text-foreground' : 'text-foreground/60'
                }`}
                style={{ 
                  fontSize: '28px',
                  textShadow: isActive ? '0 0 30px hsl(195 85% 55% / 0.4)' : 'none'
                }}
              >
                {label.toUpperCase()}
              </span>
            </div>
          )}

          {/* Full content when focused */}
          {showFullContent && content && (
            <div 
              className="grid grid-cols-5 gap-8 items-center px-6"
              style={{ opacity: contentOpacity }}
            >
              {/* Left: Text Content (3 columns) */}
              <div className="col-span-3 space-y-4 text-left">
                <div>
                  <span className="font-mono text-xs text-primary tracking-widest">
                    0{index + 1} / {label.toUpperCase()}
                  </span>
                  <h2 className="font-mono text-2xl font-semibold text-foreground mt-1 tracking-tight">
                    {content.title}
                  </h2>
                  {content.subtitle && (
                    <p className="text-primary font-mono text-sm mt-0.5">{content.subtitle}</p>
                  )}
                </div>

                {content.description && (
                  <div className="space-y-2 text-secondary-foreground/80 text-sm leading-relaxed">
                    {content.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                {content.tags && (
                  <div className="flex gap-2 pt-2">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono text-primary border border-primary/30 bg-primary/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Image placeholder (2 columns) */}
              {content.hasImage && (
                <div className="col-span-2 flex justify-center">
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-primary/30 bg-secondary/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-muted-foreground text-xs">Your Image</span>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Html>

      {/* Corner dots for frame effect */}
      <mesh position={[-6.8, -4.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.7 : 0.3} 
        />
      </mesh>
      <mesh position={[6.8, -4.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.7 : 0.3} 
        />
      </mesh>
      <mesh position={[-6.8, 4.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.7 : 0.3} 
        />
      </mesh>
      <mesh position={[6.8, 4.3, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.7 : 0.3} 
        />
      </mesh>
    </group>
  );
}

export default SectionPlane;
