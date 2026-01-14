import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ExplosionParticlesProps {
  count?: number;
  explosionProgress: number; // 0 = compressed, 1 = fully expanded
}

/**
 * Core explosion particles that burst outward from center
 */
function ExplosionParticles({ count = 8000, explosionProgress }: ExplosionParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate initial positions (all at center) and target positions (sphere)
  const { initialPositions, targetPositions, velocities, colors } = useMemo(() => {
    const initial = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Start compressed at center with slight randomness
      initial[i3] = (Math.random() - 0.5) * 0.5;
      initial[i3 + 1] = (Math.random() - 0.5) * 0.5;
      initial[i3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Target: spherical distribution with varying radius
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      target[i3] = radius * Math.sin(phi) * Math.cos(theta);
      target[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      target[i3 + 2] = radius * Math.cos(phi);
      
      // Velocity for continued drift
      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Colors: mix of cyan, purple, white
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Cyan
        col[i3] = 0.2 + Math.random() * 0.3;
        col[i3 + 1] = 0.7 + Math.random() * 0.3;
        col[i3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorChoice < 0.7) {
        // Purple/magenta
        col[i3] = 0.6 + Math.random() * 0.4;
        col[i3 + 1] = 0.2 + Math.random() * 0.3;
        col[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        // White/bright
        col[i3] = 0.9 + Math.random() * 0.1;
        col[i3 + 1] = 0.9 + Math.random() * 0.1;
        col[i3 + 2] = 0.95 + Math.random() * 0.05;
      }
    }
    
    return { initialPositions: initial, targetPositions: target, velocities: vel, colors: col };
  }, [count]);
  
  // Animate positions based on explosion progress
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Eased progress for smooth explosion
    const easedProgress = 1 - Math.pow(1 - Math.min(explosionProgress, 1), 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Interpolate between initial and target
      positions[i3] = THREE.MathUtils.lerp(initialPositions[i3], targetPositions[i3], easedProgress);
      positions[i3 + 1] = THREE.MathUtils.lerp(initialPositions[i3 + 1], targetPositions[i3 + 1], easedProgress);
      positions[i3 + 2] = THREE.MathUtils.lerp(initialPositions[i3 + 2], targetPositions[i3 + 2], easedProgress);
      
      // Add subtle drift after explosion
      if (explosionProgress > 0.8) {
        const driftFactor = (explosionProgress - 0.8) * 5;
        positions[i3] += Math.sin(time * 0.5 + i) * velocities[i3] * driftFactor * 2;
        positions[i3 + 1] += Math.cos(time * 0.3 + i * 0.5) * velocities[i3 + 1] * driftFactor * 2;
        positions[i3 + 2] += Math.sin(time * 0.4 + i * 0.7) * velocities[i3 + 2] * driftFactor * 2;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });
  
  return (
    <Points ref={pointsRef} positions={initialPositions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}

/**
 * Core glow/energy at the center during explosion
 */
function CoreGlow({ explosionProgress }: { explosionProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Core shrinks as explosion progresses
    const scale = Math.max(0.1, (1 - explosionProgress) * 8 + Math.sin(time * 3) * 0.5);
    meshRef.current.scale.setScalar(scale);
    
    // Pulsing intensity
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.max(0, (1 - explosionProgress * 1.2)) * (0.8 + Math.sin(time * 5) * 0.2);
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#88ddff"
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Nebula dust clouds that form after explosion
 */
function NebulaDust({ count = 3000, explosionProgress }: { count?: number; explosionProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Clustered distribution for nebula effect
      const clusterAngle = Math.random() * Math.PI * 2;
      const clusterRadius = 5 + Math.random() * 25;
      const height = (Math.random() - 0.5) * 15;
      
      pos[i3] = Math.cos(clusterAngle) * clusterRadius + (Math.random() - 0.5) * 8;
      pos[i3 + 1] = height + (Math.random() - 0.5) * 5;
      pos[i3 + 2] = Math.sin(clusterAngle) * clusterRadius + (Math.random() - 0.5) * 8;
      
      // Warm nebula colors: orange, pink, purple
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Orange/red
        col[i3] = 0.9 + Math.random() * 0.1;
        col[i3 + 1] = 0.4 + Math.random() * 0.3;
        col[i3 + 2] = 0.2 + Math.random() * 0.2;
      } else if (colorChoice < 0.6) {
        // Pink
        col[i3] = 0.9 + Math.random() * 0.1;
        col[i3 + 1] = 0.3 + Math.random() * 0.3;
        col[i3 + 2] = 0.6 + Math.random() * 0.3;
      } else {
        // Deep purple
        col[i3] = 0.4 + Math.random() * 0.3;
        col[i3 + 1] = 0.1 + Math.random() * 0.2;
        col[i3 + 2] = 0.6 + Math.random() * 0.4;
      }
      
      sz[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions: pos, colors: col, sizes: sz };
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Fade in as explosion completes
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = Math.min(1, Math.max(0, (explosionProgress - 0.5) * 2)) * 0.6;
    
    // Slow swirl
    pointsRef.current.rotation.y = time * 0.01;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0}
      />
    </Points>
  );
}

/**
 * Background star field
 */
function StarField({ count = 2000 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    
    return pos;
  }, [count]);
  
  return (
    <Points positions={positions}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

/**
 * Camera controller
 */
function CameraController({ explosionProgress }: { explosionProgress: number }) {
  useFrame((state) => {
    // Camera pulls back slightly as explosion happens
    const targetZ = 20 + explosionProgress * 15;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.02);
    
    // Subtle sway
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.1) * 2;
    state.camera.position.y = Math.cos(time * 0.15) * 1;
    
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}

interface CosmicExplosionProps {
  explosionProgress: number;
}

/**
 * Main cosmic explosion scene
 */
export function CosmicExplosion({ explosionProgress }: CosmicExplosionProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{ background: '#000008' }}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.1} />
      
      <CameraController explosionProgress={explosionProgress} />
      <StarField count={2500} />
      <CoreGlow explosionProgress={explosionProgress} />
      <ExplosionParticles count={10000} explosionProgress={explosionProgress} />
      <NebulaDust count={4000} explosionProgress={explosionProgress} />
    </Canvas>
  );
}

export default CosmicExplosion;
