import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceObject3DProps {
  type: 'planet' | 'saturn' | 'asteroid' | 'star' | 'nebula' | 'moon';
  position: [number, number, number];
  scale?: number;
  color?: string;
}

/**
 * 3D Space objects with realistic materials and animations
 */
export function SpaceObject3D({ 
  type, 
  position, 
  scale = 1,
  color 
}: SpaceObject3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Animation speeds based on type
  const rotationSpeed = useMemo(() => {
    switch (type) {
      case 'star': return 0.008;
      case 'asteroid': return 0.015;
      case 'nebula': return 0.001;
      default: return 0.003;
    }
  }, [type]);

  // Floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle floating motion for the whole group
    groupRef.current.position.y = position[1] + Math.sin(time * 0.4 + position[0]) * 0.2;
    groupRef.current.position.x = position[0] + Math.cos(time * 0.25 + position[1]) * 0.15;

    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += rotationSpeed;
    }
    
    // Saturn ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001;
    }

    // Pulsing glow for stars
    if (glowRef.current && type === 'star') {
      const pulseScale = 1 + Math.sin(time * 1.5) * 0.1;
      glowRef.current.scale.setScalar(pulseScale);
    }
  });

  // Render based on type
  switch (type) {
    case 'saturn':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          {/* Planet body */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              color="#e7c496"
              roughness={0.7}
              metalness={0.1}
              emissive="#e7c496"
              emissiveIntensity={0.08}
            />
          </mesh>
          
          {/* Planet bands/stripes effect */}
          <mesh scale={1.002}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              color="#d4a574"
              roughness={0.8}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Main ring */}
          <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0.3]}>
            <ringGeometry args={[1.4, 2.3, 64]} />
            <meshStandardMaterial 
              color="#c9a06a"
              side={THREE.DoubleSide}
              transparent
              opacity={0.75}
              roughness={0.6}
              emissive="#c9a06a"
              emissiveIntensity={0.05}
            />
          </mesh>
          
          {/* Inner ring detail */}
          <mesh rotation={[Math.PI / 2.5, 0, 0.3]}>
            <ringGeometry args={[1.15, 1.35, 64]} />
            <meshStandardMaterial 
              color="#b8956b"
              side={THREE.DoubleSide}
              transparent
              opacity={0.5}
            />
          </mesh>
          
          {/* Atmosphere glow */}
          <mesh scale={1.12}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color="#ffe4b8"
              transparent
              opacity={0.12}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      );

    case 'planet':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              color={color || "#4f46e5"}
              roughness={0.5}
              metalness={0.25}
              emissive={color || "#4f46e5"}
              emissiveIntensity={0.12}
            />
          </mesh>
          
          {/* Cloud layer */}
          <mesh scale={1.03} rotation={[0.1, 0, 0.15]}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial 
              color="#a5b4fc"
              transparent
              opacity={0.25}
              roughness={1}
            />
          </mesh>
          
          {/* Atmosphere */}
          <mesh scale={1.18}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color={color || "#818cf8"}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      );

    case 'moon':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial 
              color="#b8bcc4"
              roughness={0.95}
              metalness={0}
              emissive="#9ca3af"
              emissiveIntensity={0.03}
            />
          </mesh>
          
          {/* Subtle glow */}
          <mesh scale={1.12}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#d1d5db"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      );

    case 'asteroid':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
              color="#6b7280"
              roughness={1}
              metalness={0.35}
              flatShading
            />
          </mesh>
          
          {/* Secondary rock */}
          <mesh position={[0.6, 0.3, 0.2]} scale={0.4}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#78716c"
              roughness={1}
              metalness={0.3}
              flatShading
            />
          </mesh>
        </group>
      );

    case 'star':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          {/* Core */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#fef9c3" />
          </mesh>
          
          {/* Inner glow */}
          <mesh ref={glowRef} scale={1.6}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#fcd34d"
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Outer glow */}
          <mesh scale={2.8}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#fbbf24"
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Point light from star */}
          <pointLight color="#fcd34d" intensity={2.5} distance={18} decay={2} />
        </group>
      );

    case 'nebula':
      return (
        <group ref={groupRef} position={position} scale={scale}>
          {/* Layered nebula clouds */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#c084fc"
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          <mesh scale={1.6} rotation={[0.5, 0.3, 0]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#38bdf8"
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          <mesh scale={2.2} rotation={[0.2, 0.6, 0.3]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#f472b6"
              transparent
              opacity={0.06}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      );

    default:
      return null;
  }
}

export default SpaceObject3D;
