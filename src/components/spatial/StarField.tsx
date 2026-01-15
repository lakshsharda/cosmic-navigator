import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  /** Number of stars */
  count?: number;
  /** Radius of the star field sphere */
  radius?: number;
  /** Base star size */
  size?: number;
}

/**
 * Minimal star field for depth perception
 * Extremely subtle - just enough to convey infinite space
 */
export function StarField({
  count = 3000,
  radius = 250,
  size = 0.25,
}: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate star positions
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution biased toward the camera path
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.4 + Math.random() * 0.6);

      // Position stars around the camera path (along Z axis)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      // Distribute along Z from +20 to -100 (along camera path)
      positions[i * 3 + 2] = 20 - Math.random() * 120;

      // All small stars - no big squares
      sizes[i] = size * (0.3 + Math.random() * 0.7);
    }

    return { positions, sizes };
  }, [count, radius, size]);

  // Subtle parallax animation
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Very slow rotation for subtle life
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.003;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation
        color="#e0f0ff"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Ambient dust particles for extra depth
 */
export function DustParticles({
  count = 100,
}: {
  count?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = -Math.random() * 90;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Gentle floating motion
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        color="#38bdf8"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default StarField;
