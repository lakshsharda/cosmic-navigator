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
  /** Gravity offset from hover interactions */
  gravityOffset?: THREE.Vector3;
  /** Scroll velocity for subtle drift effects */
  velocity?: number;
}

/**
 * Controls camera position based on scroll progress
 * Maps scroll (0-1) to camera Z position with smooth interpolation
 * Adds subtle X/Y drift for depth perception
 */
export function CameraScrollController({
  scrollProgress,
  startZ = 8,
  endZ = -70,
  gravityOffset = new THREE.Vector3(0, 0, 0),
  velocity = 0,
}: CameraScrollControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, startZ));
  const currentPosition = useRef(new THREE.Vector3(0, 0, startZ));
  const timeRef = useRef(0);

  // Update target position based on scroll progress
  useEffect(() => {
    // Linear interpolation between start and end Z
    const targetZ = startZ + (endZ - startZ) * scrollProgress;
    targetPosition.current.z = targetZ;
  }, [scrollProgress, startZ, endZ]);

  // Smooth camera movement with subtle drift
  useFrame((_, delta) => {
    timeRef.current += delta;

    // Calculate target with gravity offset
    const targetX = gravityOffset.x;
    const targetY = gravityOffset.y;
    const targetZ = targetPosition.current.z + gravityOffset.z;

    // Add subtle breathing/drift effect based on time
    // Very subtle sine wave for organic feel
    const driftX = Math.sin(timeRef.current * 0.3) * 0.05;
    const driftY = Math.cos(timeRef.current * 0.2) * 0.03;

    // Smooth interpolation with adaptive speed
    // Faster when far from target, slower when close
    const distance = currentPosition.current.distanceTo(
      new THREE.Vector3(targetX + driftX, targetY + driftY, targetZ)
    );
    const lerpFactor = Math.min(0.08 + distance * 0.02, 0.15);

    currentPosition.current.x += (targetX + driftX - currentPosition.current.x) * lerpFactor;
    currentPosition.current.y += (targetY + driftY - currentPosition.current.y) * lerpFactor;
    currentPosition.current.z += (targetZ - currentPosition.current.z) * lerpFactor;

    // Apply to camera
    camera.position.copy(currentPosition.current);

    // Camera always looks slightly ahead (into the negative Z direction)
    camera.lookAt(
      currentPosition.current.x,
      currentPosition.current.y,
      currentPosition.current.z - 10
    );
  });

  return null;
}

export default CameraScrollController;
