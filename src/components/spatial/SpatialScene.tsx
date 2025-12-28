import { useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { CameraScrollController } from './CameraScrollController';
import { SectionPlane } from './SectionPlane';
import { StarField, DustParticles } from './StarField';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useFocusDetection, SECTION_CONFIGS } from '@/hooks/useFocusDetection';
import { useGravityHover } from '@/hooks/useGravityHover';

/**
 * Main spatial scene component
 * Orchestrates camera, sections, and interactions
 */
export function SpatialScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-based camera progress
  const { smoothProgress } = useScrollProgress({
    scrollDistance: 4000,
    smoothing: 0.06,
    inertiaDecay: 0.92,
  });

  // Calculate current camera Z position
  const startZ = 10;
  const endZ = -82;
  const cameraZ = startZ + (endZ - startZ) * smoothProgress;

  // Focus detection based on camera proximity to sections
  const { activeSection, sectionWeights } = useFocusDetection(
    SECTION_CONFIGS,
    cameraZ,
    10 // Focus threshold
  );

  // Gravity hover interactions
  const { state: gravityState, onSectionHover, updateDisplacements } = useGravityHover({
    maxCameraOffset: 0.3,
    maxSectionDisplacement: 0.2,
    smoothing: 0.08,
    gravityRange: 25,
  });

  // Update section positions for gravity calculations
  useEffect(() => {
    const positions = SECTION_CONFIGS.map(section => ({
      id: section.id,
      position: new THREE.Vector3(0, 0, section.zPosition),
    }));
    updateDisplacements(positions);
  }, [updateDisplacements]);

  // Section plane positions (centered, slight variations for visual interest)
  const sectionPositions = useMemo(() => {
    return SECTION_CONFIGS.map((section, i) => ({
      ...section,
      position: [
        Math.sin(i * 0.6) * 0.4,
        Math.cos(i * 0.8) * 0.25,
        section.zPosition,
      ] as [number, number, number],
    }));
  }, []);

  // Handle section hover with gravity effect
  const handleSectionHover = useCallback((
    sectionId: string | null,
    position?: THREE.Vector3
  ) => {
    onSectionHover(sectionId, position);
  }, [onSectionHover]);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [0, 0, startZ],
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Deep space background color */}
      <color attach="background" args={['#040810']} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      
      {/* Dynamic point light that follows camera */}
      <pointLight
        position={[0, 2, cameraZ + 8]}
        intensity={gravityState.lightIntensity * 0.4}
        color="#38bdf8"
        distance={35}
        decay={2}
      />

      {/* Secondary accent light */}
      <pointLight
        position={[4, -2, cameraZ - 5]}
        intensity={0.1}
        color="#818cf8"
        distance={25}
        decay={2}
      />

      {/* Star field background */}
      <StarField count={500} radius={120} size={0.35} />
      
      {/* Ambient dust particles */}
      <DustParticles count={80} />

      {/* Camera controller */}
      <CameraScrollController
        scrollProgress={smoothProgress}
        startZ={startZ}
        endZ={endZ}
        gravityOffset={gravityState.cameraOffset}
      />

      {/* Section planes */}
      {sectionPositions.map((section, index) => (
        <SectionPlane
          key={section.id}
          id={section.id}
          label={section.label}
          position={section.position}
          focusWeight={sectionWeights.get(section.id) || 0}
          isActive={activeSection?.id === section.id}
          onHover={handleSectionHover}
          displacement={gravityState.sectionDisplacements.get(section.id)}
          index={index}
        />
      ))}

      {/* Subtle depth fog */}
      <fog attach="fog" args={['#040810', 50, 120]} />
    </Canvas>
  );
}

export default SpatialScene;
