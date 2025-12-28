import { useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { CameraScrollController } from './CameraScrollController';
import { SectionPlane } from './SectionPlane';
import { StarField } from './StarField';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useFocusDetection, SECTION_CONFIGS } from '@/hooks/useFocusDetection';
import { useGravityHover } from '@/hooks/useGravityHover';

/**
 * Main spatial scene
 * 
 * STRUCTURE:
 * - Scroll controls camera Z position (portfolio progression)
 * - Sections exist at fixed Z positions (spatial anchors)
 * - Focus weight determines visual prominence
 * - Gravity hover provides subtle physics-based interaction
 * - Content appears via progressive disclosure when sections are focused
 */
export function SpatialScene() {
  const [mounted, setMounted] = useState(false);
  // Track active project for skill-project linking
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll → Camera Z mapping
  const { smoothProgress } = useScrollProgress({
    scrollDistance: 4000,
    smoothing: 0.06,
    inertiaDecay: 0.92,
  });

  // Camera position bounds
  const startZ = 10;
  const endZ = -82;
  const cameraZ = startZ + (endZ - startZ) * smoothProgress;

  // Focus detection: which section is camera closest to?
  const { activeSection, sectionWeights } = useFocusDetection(
    SECTION_CONFIGS,
    cameraZ,
    10 // Focus threshold (Z distance for full focus)
  );

  // Gravity hover: subtle camera pull toward hovered section
  const { state: gravityState, onSectionHover, updateDisplacements } = useGravityHover({
    maxCameraOffset: 0.2,
    maxSectionDisplacement: 0.15,
    smoothing: 0.06,
    gravityRange: 20,
  });

  // Initialize section positions for gravity calculations
  useEffect(() => {
    updateDisplacements(
      SECTION_CONFIGS.map(s => ({
        id: s.id,
        position: new THREE.Vector3(0, 0, s.zPosition),
      }))
    );
  }, [updateDisplacements]);

  // Clear active project when leaving projects/skills sections
  useEffect(() => {
    if (activeSection?.id !== 'projects' && activeSection?.id !== 'skills') {
      setActiveProjectId(null);
    }
  }, [activeSection?.id]);

  // Section positions (aligned on Z, centered on X/Y)
  const sectionPositions = useMemo(() => {
    return SECTION_CONFIGS.map((section) => ({
      ...section,
      position: [0, 0, section.zPosition] as [number, number, number],
    }));
  }, []);

  const handleSectionHover = useCallback(
    (sectionId: string | null, position?: THREE.Vector3) => {
      onSectionHover(sectionId, position);
    },
    [onSectionHover]
  );

  const handleProjectSelect = useCallback((projectId: string | null) => {
    setActiveProjectId(projectId);
  }, []);

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
      {/* Background */}
      <color attach="background" args={['#030712']} />

      {/* Ambient light */}
      <ambientLight intensity={0.12} />

      {/* Main light follows camera - intensity affected by hover */}
      <pointLight
        position={[0, 3, cameraZ + 10]}
        intensity={0.3 * gravityState.lightIntensity}
        color="#e2e8f0"
        distance={40}
        decay={2}
      />

      {/* Stars for depth reference (static, no animation) */}
      <StarField count={300} radius={80} size={0.25} />

      {/* Camera controller */}
      <CameraScrollController
        scrollProgress={smoothProgress}
        startZ={startZ}
        endZ={endZ}
        gravityOffset={gravityState.cameraOffset}
      />

      {/* Section planes with content */}
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
          activeProjectId={activeProjectId}
          onProjectSelect={handleProjectSelect}
        />
      ))}

      {/* Depth fog */}
      <fog attach="fog" args={['#030712', 40, 100]} />
    </Canvas>
  );
}

export default SpatialScene;
