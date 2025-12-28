import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  AboutContent,
  ExperienceContent,
  ProjectsContent,
  SkillsContent,
  AchievementsContent,
  ContactContent,
} from '@/components/content';

interface SectionPlaneProps {
  id: string;
  label: string;
  position: [number, number, number];
  focusWeight: number;
  isActive: boolean;
  onHover?: (id: string | null, position?: THREE.Vector3) => void;
  displacement?: THREE.Vector3;
  index: number;
  activeProjectId?: string | null;
  onProjectSelect?: (projectId: string | null) => void;
}

/**
 * Section anchor in 3D space with content container
 * Visual prominence is driven by focus weight (camera proximity)
 * Content appears via progressive disclosure when focused
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
  activeProjectId,
  onProjectSelect,
}: SectionPlaneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const borderRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  // Current animated values (for smooth transitions)
  const current = useRef({ scale: 1, opacity: 0.1 });

  // Target values derived from state
  const targets = useMemo(() => {
    // Scale: 0.8 (distant) to 1.0 (in focus)
    const scale = 0.8 + focusWeight * 0.2 + (isActive ? 0.05 : 0) + (hovered ? 0.03 : 0);
    // Opacity: low when distant, high when in focus
    const opacity = 0.08 + focusWeight * 0.4 + (hovered ? 0.1 : 0);
    
    return { scale, opacity };
  }, [focusWeight, isActive, hovered]);

  // Geometry (created once)
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(8, 5), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(planeGeometry), [planeGeometry]);

  // Smooth interpolation toward target values
  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;

    const lerp = 0.1;
    current.current.scale += (targets.scale - current.current.scale) * lerp;
    current.current.opacity += (targets.opacity - current.current.opacity) * lerp;

    // Apply scale
    const s = current.current.scale;
    groupRef.current.scale.set(s, s, 1);

    // Apply gravity displacement
    groupRef.current.position.set(
      position[0] + (displacement?.x || 0),
      position[1] + (displacement?.y || 0),
      position[2] + (displacement?.z || 0)
    );

    // Update opacity
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = current.current.opacity;

    // Border opacity follows focus
    if (borderRef.current) {
      const borderMat = borderRef.current.material as THREE.LineBasicMaterial;
      borderMat.opacity = 0.2 + focusWeight * 0.5;
    }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (groupRef.current && onHover) {
      onHover(id, new THREE.Vector3(...position));
    }
  };

  const handlePointerLeave = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
    onHover?.(null);
  };

  // Colors based on focus state
  const planeColor = isActive ? '#1e3a5f' : '#0f172a';
  const borderColor = isActive ? '#38bdf8' : '#334155';

  // Render section-specific content
  const renderContent = () => {
    const contentProps = { focusWeight, isActive };
    
    switch (id) {
      case 'about':
        return <AboutContent {...contentProps} />;
      case 'experience':
        return <ExperienceContent {...contentProps} />;
      case 'projects':
        return (
          <ProjectsContent 
            {...contentProps} 
            onProjectSelect={onProjectSelect}
          />
        );
      case 'skills':
        return (
          <SkillsContent 
            {...contentProps} 
            activeProjectId={activeProjectId}
          />
        );
      case 'achievements':
        return <AchievementsContent {...contentProps} />;
      case 'contact':
        return <ContactContent {...contentProps} />;
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Main plane */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <primitive object={planeGeometry} attach="geometry" />
        <meshBasicMaterial
          color={planeColor}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial color={borderColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Section label - visibility driven by focus weight */}
      <Html
        center
        position={[0, 2.8, 0.1]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        transform
        occlude={false}
        distanceFactor={10}
      >
        <div
          className="flex items-center gap-2"
          style={{ opacity: Math.max(0.2, focusWeight * 0.8) }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground/60">
            {`0${index + 1}`}
          </span>
          <span className="w-4 h-px bg-border/30" />
          <span
            className={`font-mono text-xs tracking-[0.15em] font-medium uppercase ${
              isActive ? 'text-foreground/80' : 'text-muted-foreground/60'
            }`}
          >
            {label}
          </span>
        </div>
      </Html>

      {/* Content container - appears when focused */}
      <Html
        center
        position={[0, -0.2, 0.2]}
        style={{ 
          pointerEvents: focusWeight > 0.5 ? 'auto' : 'none',
          userSelect: 'none',
        }}
        transform
        occlude={false}
        distanceFactor={10}
      >
        {renderContent()}
      </Html>

      {/* Corner markers (structural frame) */}
      {[[-3.8, -2.3], [3.8, -2.3], [-3.8, 2.3], [3.8, 2.3]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <circleGeometry args={[0.04, 8]} />
          <meshBasicMaterial
            color={borderColor}
            transparent
            opacity={0.3 + focusWeight * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default SectionPlane;
