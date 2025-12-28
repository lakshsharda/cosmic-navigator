import { useMemo } from 'react';

export interface SectionConfig {
  id: string;
  label: string;
  /** Z position in 3D space (negative = further into screen) */
  zPosition: number;
}

interface FocusDetectionResult {
  /** Currently active section based on camera proximity */
  activeSection: SectionConfig | null;
  /** Index of the active section */
  activeSectionIndex: number;
  /** All sections with their focus weights (0-1) */
  sectionWeights: Map<string, number>;
  /** Distance to each section */
  sectionDistances: Map<string, number>;
}

/**
 * Calculates which section the camera is focused on based on proximity
 * Uses exponential falloff for natural focus transitions
 */
export function useFocusDetection(
  sections: SectionConfig[],
  cameraZ: number,
  focusThreshold: number = 5
): FocusDetectionResult {
  return useMemo(() => {
    const sectionWeights = new Map<string, number>();
    const sectionDistances = new Map<string, number>();
    
    let closestSection: SectionConfig | null = null;
    let closestDistance = Infinity;
    let closestIndex = -1;

    sections.forEach((section, index) => {
      // Calculate distance from camera to section plane
      const distance = Math.abs(cameraZ - section.zPosition);
      sectionDistances.set(section.id, distance);
      
      // Calculate focus weight using exponential falloff
      // Weight = e^(-distance² / (2 * threshold²))
      // This creates a smooth Gaussian-like falloff
      const weight = Math.exp(-(distance * distance) / (2 * focusThreshold * focusThreshold));
      sectionWeights.set(section.id, weight);
      
      // Track closest section
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
        closestIndex = index;
      }
    });

    return {
      activeSection: closestSection,
      activeSectionIndex: closestIndex,
      sectionWeights,
      sectionDistances,
    };
  }, [sections, cameraZ, focusThreshold]);
}

/**
 * Predefined section configurations with Z positions
 * Sections are spaced evenly along the Z-axis
 */
export const SECTION_CONFIGS: SectionConfig[] = [
  { id: 'about', label: 'About', zPosition: 0 },
  { id: 'experience', label: 'Experience', zPosition: -15 },
  { id: 'projects', label: 'Projects', zPosition: -30 },
  { id: 'skills', label: 'Skills', zPosition: -45 },
  { id: 'achievements', label: 'Achievements', zPosition: -60 },
  { id: 'contact', label: 'Contact', zPosition: -75 },
];

/** Total Z-depth of the portfolio space */
export const TOTAL_DEPTH = Math.abs(
  SECTION_CONFIGS[SECTION_CONFIGS.length - 1].zPosition - SECTION_CONFIGS[0].zPosition
);

export default useFocusDetection;
