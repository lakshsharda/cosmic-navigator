import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  descriptor: string;
  icon: string;
}

// Fibonacci sphere distribution for even spacing
function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
}

interface SkillNodeProps {
  skill: Skill;
  position: THREE.Vector3;
  index: number;
  isAutoRotating: boolean;
}

function SkillNode({ skill, position, index, isAutoRotating }: SkillNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Make the skill node always face the camera (billboard effect)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Skill Circle Button */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: isHovered 
                ? 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)'
                : 'radial-gradient(circle, rgba(20, 30, 40, 0.9) 0%, rgba(0, 0, 0, 0.95) 70%)',
              border: isHovered 
                ? '2px solid rgba(34, 197, 94, 0.8)' 
                : '1.5px solid rgba(34, 197, 94, 0.4)',
              boxShadow: isHovered
                ? '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3), inset 0 0 15px rgba(34, 197, 94, 0.2)'
                : '0 0 8px rgba(34, 197, 94, 0.2), inset 0 0 5px rgba(34, 197, 94, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease-out',
            }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                width: '24px',
                height: '24px',
                objectFit: 'contain',
                filter: isHovered ? 'brightness(1.3)' : 'brightness(1.1)',
                transition: 'filter 0.2s ease-out',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                style={{
                  bottom: 'calc(100% + 12px)',
                }}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    background: 'rgba(5, 10, 15, 0.95)',
                    border: '1px solid rgba(34, 197, 94, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#f0fdf4',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {skill.name}
                  </p>
                  <p
                    style={{
                      margin: '2px 0 0 0',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '10px',
                      color: '#86efac',
                    }}
                  >
                    {skill.descriptor}
                  </p>
                </div>
                {/* Arrow */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '100%',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid rgba(5, 10, 15, 0.95)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}

interface RotatingSphereProps {
  skills: Skill[];
  radius: number;
  isAutoRotating: boolean;
}

function RotatingSphere({ skills, radius, isAutoRotating }: RotatingSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, radius), [skills.length, radius]);

  // Auto-rotate the sphere slowly
  useFrame((state, delta) => {
    if (groupRef.current && isAutoRotating) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name + index}
          skill={skill}
          position={positions[index]}
          index={index}
          isAutoRotating={isAutoRotating}
        />
      ))}
    </group>
  );
}

interface SkillSphere3DProps {
  skills: Skill[];
  radius?: number;
  height?: string;
  className?: string;
}

export function SkillSphere3D({ 
  skills, 
  radius = 3.5, 
  height = '400px',
  className = '' 
}: SkillSphere3DProps) {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteractionStart = () => {
    setIsDragging(true);
    setIsAutoRotating(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    // Resume auto-rotation after 3 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={className}
      style={{ 
        height, 
        width: '100%',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Instruction hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: 'rgba(34, 197, 94, 0.6)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        DRAG TO ROTATE • SCROLL TO ZOOM
      </div>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        onPointerDown={handleInteractionStart}
        onPointerUp={handleInteractionEnd}
        onPointerLeave={handleInteractionEnd}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
        
        <RotatingSphere 
          skills={skills} 
          radius={radius} 
          isAutoRotating={isAutoRotating}
        />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={6}
          maxDistance={15}
          autoRotate={false}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default SkillSphere3D;
