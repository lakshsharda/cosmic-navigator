import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

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
 * Section anchor in 3D space
 * Visual prominence is driven by focus weight (camera proximity)
 * No decorative animation - all changes are state-driven
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

      {/* Label - visibility driven by focus weight */}
      <Html
        center
        position={[0, 0, 0.1]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        transform
        occlude={false}
        distanceFactor={10}
      >
        <div
          className="flex flex-col items-center gap-1"
          style={{ opacity: Math.max(0.1, focusWeight) }}
        >
          <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
            {`0${index + 1}`}
          </span>
          <span
            className={`font-mono text-xl tracking-[0.15em] font-medium ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {label.toUpperCase()}
          </span>
        </div>
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
