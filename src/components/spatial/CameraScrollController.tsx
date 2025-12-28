import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraScrollControllerProps {
  /** Scroll progress value (0-1) */
  scrollProgress: number;
  /** Starting Z position of camera */
  startZ?: number;
  /** Ending Z position of camera */
  endZ?: number;
  /** Gravity offset from hover interactions (physics-based) */
  gravityOffset?: THREE.Vector3;
}

/**
 * Controls camera position based on scroll progress
 * Maps scroll (0-1) to camera Z position with smooth interpolation
 * 
 * STRUCTURAL: Camera Z = portfolio progression
 * No decorative drift - all motion is intentional
 */
export function CameraScrollController({
  scrollProgress,
  startZ = 10,
  endZ = -82,
  gravityOffset = new THREE.Vector3(0, 0, 0),
}: CameraScrollControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, startZ));
  const currentPosition = useRef(new THREE.Vector3(0, 0, startZ));

  // Update target Z based on scroll progress (linear mapping)
  useEffect(() => {
    targetPosition.current.z = startZ + (endZ - startZ) * scrollProgress;
  }, [scrollProgress, startZ, endZ]);

  // Smooth camera interpolation - no idle motion
  useFrame(() => {
    // Target includes gravity offset from hover
    const targetX = gravityOffset.x;
    const targetY = gravityOffset.y;
    const targetZ = targetPosition.current.z;

    // Fixed lerp factor for consistent, predictable movement
    const lerpFactor = 0.08;

    // Interpolate toward target
    currentPosition.current.x += (targetX - currentPosition.current.x) * lerpFactor;
    currentPosition.current.y += (targetY - currentPosition.current.y) * lerpFactor;
    currentPosition.current.z += (targetZ - currentPosition.current.z) * lerpFactor;

    // Apply to camera
    camera.position.copy(currentPosition.current);

    // Camera looks ahead along Z-axis (into negative Z)
    camera.lookAt(
      currentPosition.current.x * 0.5, // Slight parallax on look target
      currentPosition.current.y * 0.5,
      currentPosition.current.z - 15
    );
  });

  return null;
}

export default CameraScrollController;
