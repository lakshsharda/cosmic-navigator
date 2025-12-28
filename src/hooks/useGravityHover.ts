import { useState, useCallback, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GravityHoverState {
  /** Currently hovered section ID */
  hoveredSection: string | null;
  /** Gravitational offset for camera (subtle pull toward hovered section) */
  cameraOffset: THREE.Vector3;
  /** Per-section displacement from gravity effect */
  sectionDisplacements: Map<string, THREE.Vector3>;
  /** Light intensity multiplier for focused areas */
  lightIntensity: number;
}

interface GravityHoverConfig {
  /** Maximum camera offset distance */
  maxCameraOffset?: number;
  /** Maximum section displacement */
  maxSectionDisplacement?: number;
  /** Smoothing factor for transitions */
  smoothing?: number;
  /** Gravity falloff distance */
  gravityRange?: number;
}

/**
 * Manages gravity-inspired hover interactions
 * Creates subtle physics-based pull toward hovered elements
 */
export function useGravityHover(
  config: GravityHoverConfig = {}
): {
  state: GravityHoverState;
  onSectionHover: (sectionId: string | null, sectionPosition?: THREE.Vector3) => void;
  updateDisplacements: (sections: { id: string; position: THREE.Vector3 }[]) => void;
} {
  const {
    maxCameraOffset = 0.5,
    maxSectionDisplacement = 0.3,
    smoothing = 0.1,
    gravityRange = 20,
  } = config;

  const [state, setState] = useState<GravityHoverState>({
    hoveredSection: null,
    cameraOffset: new THREE.Vector3(0, 0, 0),
    sectionDisplacements: new Map(),
    lightIntensity: 1,
  });

  // Refs for smooth animation
  const targetOffsetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentOffsetRef = useRef(new THREE.Vector3(0, 0, 0));
  const hoveredPositionRef = useRef<THREE.Vector3 | null>(null);
  const sectionsRef = useRef<{ id: string; position: THREE.Vector3 }[]>([]);
  const animationRef = useRef<number>();

  // Handle section hover
  const onSectionHover = useCallback((
    sectionId: string | null,
    sectionPosition?: THREE.Vector3
  ) => {
    hoveredPositionRef.current = sectionPosition || null;
    
    if (sectionId && sectionPosition) {
      // Calculate target camera offset (subtle pull toward section)
      // Only apply X/Y offset, Z is controlled by scroll
      targetOffsetRef.current.set(
        sectionPosition.x * 0.1 * maxCameraOffset,
        sectionPosition.y * 0.1 * maxCameraOffset,
        0 // Z offset handled separately
      );
    } else {
      // Reset to neutral
      targetOffsetRef.current.set(0, 0, 0);
    }
    
    setState(prev => ({
      ...prev,
      hoveredSection: sectionId,
      lightIntensity: sectionId ? 1.3 : 1,
    }));
  }, [maxCameraOffset]);

  // Update section positions for displacement calculation
  const updateDisplacements = useCallback((
    sections: { id: string; position: THREE.Vector3 }[]
  ) => {
    sectionsRef.current = sections;
  }, []);

  // Animation loop for smooth transitions
  useEffect(() => {
    const animate = () => {
      // Smooth interpolation for camera offset
      currentOffsetRef.current.lerp(targetOffsetRef.current, smoothing);
      
      // Calculate section displacements based on hover gravity
      const newDisplacements = new Map<string, THREE.Vector3>();
      
      if (hoveredPositionRef.current && sectionsRef.current.length > 0) {
        sectionsRef.current.forEach(section => {
          const displacement = new THREE.Vector3();
          
          if (state.hoveredSection && section.id !== state.hoveredSection) {
            // Calculate distance from hovered section
            const distance = section.position.distanceTo(hoveredPositionRef.current!);
            
            if (distance < gravityRange) {
              // Direction away from hovered section (subtle repulsion)
              const direction = section.position.clone()
                .sub(hoveredPositionRef.current!)
                .normalize();
              
              // Inverse square falloff for displacement
              const strength = (1 - distance / gravityRange) * maxSectionDisplacement;
              displacement.copy(direction).multiplyScalar(strength * 0.5);
            }
          }
          
          newDisplacements.set(section.id, displacement);
        });
      }
      
      // Only update state if offset changed meaningfully
      const offsetDiff = currentOffsetRef.current.distanceTo(state.cameraOffset);
      if (offsetDiff > 0.001) {
        setState(prev => ({
          ...prev,
          cameraOffset: currentOffsetRef.current.clone(),
          sectionDisplacements: newDisplacements,
        }));
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [smoothing, maxSectionDisplacement, gravityRange, state.hoveredSection, state.cameraOffset]);

  return {
    state,
    onSectionHover,
    updateDisplacements,
  };
}

export default useGravityHover;
