import { useMemo } from 'react';
import * as THREE from 'three';

interface StarFieldProps {
  /** Number of stars */
  count?: number;
  /** Radius of the star field */
  radius?: number;
  /** Base star size */
  size?: number;
}

/**
 * Static star field for depth perception only
 * No animation - purely structural depth cue
 * Stars exist to show camera is moving through space
 */
export function StarField({
  count = 400,
  radius = 100,
  size = 0.3,
}: StarFieldProps) {
  // Generate star positions once - no animation
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a cylinder around the camera path
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.3 + Math.random() * 0.7);

      // X/Y: circular distribution
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(theta) * 0.6; // Flatten slightly

      // Z: distribute along camera path (from start to beyond end)
      pos[i * 3 + 2] = 30 - Math.random() * 130;
    }

    return pos;
  }, [count, radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color="#64748b"
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

export default StarField;
