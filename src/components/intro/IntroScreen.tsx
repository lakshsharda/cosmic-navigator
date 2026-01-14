import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ChevronDown } from 'lucide-react';
import { SpaceObject3D } from './SpaceObject';

interface IntroScreenProps {
  onScrollToPortfolio: () => void;
}

/**
 * Intro screen with 3D space objects and cosmic branding
 */
export function IntroScreen({ onScrollToPortfolio }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background overflow-hidden"
    >
      {/* 3D Canvas with space objects */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#030712']} />
          
          {/* Ambient and point lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#38bdf8" />
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#a78bfa" />
          <pointLight position={[0, 5, 5]} intensity={0.8} color="#fbbf24" />
          
          {/* Star background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={4000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />
          
          {/* 3D Space Objects */}
          <Suspense fallback={null}>
            {/* Saturn-like planet - top right */}
            <SpaceObject3D 
              type="saturn" 
              position={[7, 3.5, -3]} 
              scale={2}
            />
            
            {/* Gas giant - left side */}
            <SpaceObject3D 
              type="planet" 
              position={[-8, -1.5, -6]} 
              scale={2.5}
              color="#6366f1"
            />
            
            {/* Glowing star - top left */}
            <SpaceObject3D 
              type="star" 
              position={[-5, 4.5, -2]} 
              scale={1}
            />
            
            {/* Small asteroid - bottom right */}
            <SpaceObject3D 
              type="asteroid" 
              position={[6, -3.5, -3]} 
              scale={0.8}
            />
            
            {/* Nebula cloud - background center-right */}
            <SpaceObject3D 
              type="nebula" 
              position={[3, 0, -12]} 
              scale={5}
            />

            {/* Additional moon - bottom left */}
            <SpaceObject3D 
              type="moon" 
              position={[-5, -4, -5]} 
              scale={0.9}
            />
          </Suspense>
          
          {/* Subtle camera movement */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Welcome text */}
        <p 
          className="font-space text-sm md:text-base tracking-[0.3em] text-muted-foreground/60 mb-6"
          style={{ fontWeight: 400 }}
        >
          WELCOME TO MY PORTFOLIO
        </p>

        {/* Main name - Space Grotesk SemiBold */}
        <h1 
          className="font-space text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight"
          style={{
            textShadow: '0 0 80px hsl(195 85% 55% / 0.4), 0 0 40px hsl(195 85% 55% / 0.2)',
          }}
        >
          LAKSH SHARDA
        </h1>

        {/* Subtitle - Space Grotesk Regular */}
        <p 
          className="font-space text-base md:text-lg tracking-[0.25em] text-primary/70 mt-6"
          style={{ fontWeight: 400 }}
        >
          DEVELOPER • LEADER • CREATOR
        </p>
      </div>

      {/* Centered scroll indicator at bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        <motion.button
          onClick={onScrollToPortfolio}
          className="flex flex-col items-center gap-3 group cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span 
            className="font-space text-xs tracking-[0.2em] text-muted-foreground/50 group-hover:text-primary/70 transition-colors"
            style={{ fontWeight: 400 }}
          >
            SCROLL TO EXPLORE
          </span>
          <div className="flex flex-col items-center">
            <ChevronDown className="w-5 h-5 text-primary/40 group-hover:text-primary/70 transition-colors" />
            <ChevronDown className="w-5 h-5 text-primary/20 -mt-3 group-hover:text-primary/50 transition-colors" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export default IntroScreen;
