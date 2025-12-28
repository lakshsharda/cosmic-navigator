import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface SectionPlaneProps {
  /** Section identifier */
  id: string;
  /** Display label for the section */
  label: string;
  /** Position in 3D space */
  position: [number, number, number];
  /** Focus weight (0-1) for opacity and scale */
  focusWeight: number;
  /** Whether this is the active section */
  isActive: boolean;
  /** Callback when hovered */
  onHover?: (id: string | null, position?: THREE.Vector3) => void;
  /** External displacement from gravity effects */
  displacement?: THREE.Vector3;
  /** Section index for display */
  index: number;
}

/**
 * A single section plane in 3D space
 * Glass-like appearance with focus-responsive behavior
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

  // Animated values
  const animatedValues = useRef({
    scale: 1,
    opacity: 0.3,
    glowOpacity: 0,
    rotationY: 0,
  });

  // Calculate target values based on focus and hover state
  const targets = useMemo(() => {
    const baseOpacity = 0.12 + focusWeight * 0.35;
    const baseScale = 0.85 + focusWeight * 0.2;
    
    return {
      scale: isActive ? baseScale * 1.05 : baseScale,
      opacity: hovered ? Math.min(baseOpacity + 0.15, 0.55) : baseOpacity,
      glowOpacity: isActive ? 0.3 + focusWeight * 0.25 : focusWeight * 0.15,
      rotationY: hovered ? 0.02 : 0,
    };
  }, [focusWeight, isActive, hovered]);

  // Create geometry once
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(8, 5), []);
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(10, 6.5), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(planeGeometry), [planeGeometry]);

  // Smooth animation
  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current || !glowRef.current) return;

    const lerp = (current: number, target: number, speed: number) =>
      current + (target - current) * Math.min(speed * delta * 60, 1);

    // Interpolate animated values
    animatedValues.current.scale = lerp(animatedValues.current.scale, targets.scale, 0.08);
    animatedValues.current.opacity = lerp(animatedValues.current.opacity, targets.opacity, 0.1);
    animatedValues.current.glowOpacity = lerp(animatedValues.current.glowOpacity, targets.glowOpacity, 0.08);
    animatedValues.current.rotationY = lerp(animatedValues.current.rotationY, targets.rotationY, 0.1);

    // Apply scale to group
    const s = animatedValues.current.scale;
    groupRef.current.scale.set(s, s, 1);

    // Apply subtle rotation
    groupRef.current.rotation.y = animatedValues.current.rotationY;

    // Apply displacement from gravity effects
    groupRef.current.position.x = position[0] + (displacement?.x || 0);
    groupRef.current.position.y = position[1] + (displacement?.y || 0);
    groupRef.current.position.z = position[2] + (displacement?.z || 0);

    // Update material opacity
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = animatedValues.current.opacity;

    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    glowMaterial.opacity = animatedValues.current.glowOpacity;

    // Update border opacity
    if (borderRef.current) {
      const borderMaterial = borderRef.current.material as THREE.LineBasicMaterial;
      borderMaterial.opacity = isActive ? 0.7 : 0.35;
    }
  });

  // Handle pointer events
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

  // Colors
  const baseColor = isActive ? '#1e3a5f' : '#1a2744';
  const glowColor = '#0ea5e9';
  const borderColor = isActive ? '#38bdf8' : '#334155';

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
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border effect */}
      <lineSegments ref={borderRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={0.5}
        />
      </lineSegments>

      {/* HTML overlay for crisp text rendering */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        transform
        occlude={false}
        distanceFactor={10}
      >
        <div 
          className="flex flex-col items-center gap-2"
          style={{
            opacity: 0.1 + focusWeight * 0.9,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span 
            className="font-mono text-sm tracking-[0.3em] text-primary/60"
            style={{ fontSize: '12px' }}
          >
            {`0${index + 1}`}
          </span>
          <span 
            className={`font-mono text-2xl tracking-[0.2em] font-medium ${
              isActive ? 'text-foreground' : 'text-foreground/60'
            }`}
            style={{ 
              fontSize: '24px',
              textShadow: isActive ? '0 0 30px hsl(195 85% 55% / 0.4)' : 'none'
            }}
          >
            {label.toUpperCase()}
          </span>
        </div>
      </Html>

      {/* Corner dots for frame effect */}
      <mesh position={[-3.8, -2.3, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.8 : 0.4} 
        />
      </mesh>
      <mesh position={[3.8, -2.3, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.8 : 0.4} 
        />
      </mesh>
      <mesh position={[-3.8, 2.3, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.8 : 0.4} 
        />
      </mesh>
      <mesh position={[3.8, 2.3, 0.01]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial 
          color={isActive ? '#38bdf8' : '#475569'} 
          transparent 
          opacity={isActive ? 0.8 : 0.4} 
        />
      </mesh>
    </group>
  );
}

export default SectionPlane;
