import { useState, useCallback, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GravityHoverState {
  hoveredSection: string | null;
  cameraOffset: THREE.Vector3;
  sectionDisplacements: Map<string, THREE.Vector3>;
  lightIntensity: number;
}

interface GravityHoverConfig {
  maxCameraOffset?: number;
  maxSectionDisplacement?: number;
  smoothing?: number;
  gravityRange?: number;
}

/**
 * Physics-inspired hover interaction
 * 
 * When hovering a section:
 * - Camera subtly pulls toward it (gravity)
 * - Nearby sections shift away (repulsion)
 * - Light intensity increases (focus)
 * 
 * All effects are subtle, reversible, and never hijack control.
 */
export function useGravityHover(config: GravityHoverConfig = {}): {
  state: GravityHoverState;
  onSectionHover: (sectionId: string | null, sectionPosition?: THREE.Vector3) => void;
  updateDisplacements: (sections: { id: string; position: THREE.Vector3 }[]) => void;
} {
  const {
    maxCameraOffset = 0.2,
    maxSectionDisplacement = 0.15,
    smoothing = 0.08,
    gravityRange = 20,
  } = config;

  const [state, setState] = useState<GravityHoverState>({
    hoveredSection: null,
    cameraOffset: new THREE.Vector3(0, 0, 0),
    sectionDisplacements: new Map(),
    lightIntensity: 1,
  });

  const targetOffset = useRef(new THREE.Vector3(0, 0, 0));
  const currentOffset = useRef(new THREE.Vector3(0, 0, 0));
  const hoveredPos = useRef<THREE.Vector3 | null>(null);
  const sections = useRef<{ id: string; position: THREE.Vector3 }[]>([]);
  const animationRef = useRef<number>();

  const onSectionHover = useCallback(
    (sectionId: string | null, sectionPosition?: THREE.Vector3) => {
      hoveredPos.current = sectionPosition || null;

      if (sectionId && sectionPosition) {
        // Subtle camera pull (X/Y only, Z is scroll-controlled)
        targetOffset.current.set(
          sectionPosition.x * 0.05 * maxCameraOffset,
          sectionPosition.y * 0.05 * maxCameraOffset,
          0
        );
      } else {
        targetOffset.current.set(0, 0, 0);
      }

      setState((prev) => ({
        ...prev,
        hoveredSection: sectionId,
        lightIntensity: sectionId ? 1.15 : 1,
      }));
    },
    [maxCameraOffset]
  );

  const updateDisplacements = useCallback(
    (sectionList: { id: string; position: THREE.Vector3 }[]) => {
      sections.current = sectionList;
    },
    []
  );

  useEffect(() => {
    const animate = () => {
      // Smooth interpolation of camera offset
      currentOffset.current.lerp(targetOffset.current, smoothing);

      // Calculate section displacements (repulsion from hovered section)
      const displacements = new Map<string, THREE.Vector3>();

      if (hoveredPos.current && sections.current.length > 0) {
        for (const section of sections.current) {
          const displacement = new THREE.Vector3(0, 0, 0);

          if (state.hoveredSection && section.id !== state.hoveredSection) {
            const distance = section.position.distanceTo(hoveredPos.current);

            if (distance < gravityRange && distance > 0) {
              const direction = section.position
                .clone()
                .sub(hoveredPos.current)
                .normalize();

              const strength = (1 - distance / gravityRange) * maxSectionDisplacement;
              displacement.copy(direction).multiplyScalar(strength * 0.3);
            }
          }

          displacements.set(section.id, displacement);
        }
      }

      // Only update if offset changed meaningfully
      if (currentOffset.current.lengthSq() > 0.00001 || displacements.size > 0) {
        setState((prev) => ({
          ...prev,
          cameraOffset: currentOffset.current.clone(),
          sectionDisplacements: displacements,
        }));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [smoothing, maxSectionDisplacement, gravityRange, state.hoveredSection]);

  return { state, onSectionHover, updateDisplacements };
}

export default useGravityHover;
