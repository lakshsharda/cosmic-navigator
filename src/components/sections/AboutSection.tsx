import { motion } from 'framer-motion';

interface AboutSectionProps {
  isActive: boolean;
}

/**
 * About section content with image on right, text on left
 */
export function AboutSection({ isActive }: AboutSectionProps) {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-mono text-sm text-primary tracking-widest">01 / ABOUT</span>
            <h2 className="font-mono text-4xl md:text-5xl font-semibold text-foreground mt-2 tracking-tight">
              LAKSH SHARDA
            </h2>
            <p className="text-primary font-mono text-lg mt-1">Developer • Designer • Creator</p>
          </motion.div>

          <motion.div
            className="space-y-4 text-secondary-foreground/90 leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              I'm a tech-focused developer with a strong interest in building scalable, 
              well-structured applications. I enjoy working across the stack, from designing 
              clean user interfaces to implementing efficient backend logic.
            </p>
            <p>
              My experience includes web development, frontend frameworks, and backend services, 
              along with hands-on work in project architecture, APIs, and databases. I focus on 
              writing clean, maintainable code and understanding how systems work end-to-end.
            </p>
            <p>
              I've led and contributed to multiple technical projects and competitions, working 
              on problem-solving, system design, and collaboration under real constraints. I'm 
              particularly interested in emerging technologies, performance optimization, and 
              building products that are both technically sound and user-centric.
            </p>
          </motion.div>

          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="glass-panel px-4 py-2 rounded-lg">
              <span className="text-primary font-mono text-sm">Full Stack</span>
            </div>
            <div className="glass-panel px-4 py-2 rounded-lg">
              <span className="text-primary font-mono text-sm">System Design</span>
            </div>
            <div className="glass-panel px-4 py-2 rounded-lg">
              <span className="text-primary font-mono text-sm">UI/UX</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
            
            {/* Image container with border */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-primary/30 glass-panel">
              {/* Placeholder - user will add their image */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background flex items-center justify-center">
                <span className="font-mono text-muted-foreground text-sm">Your Image</span>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/60" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutSection;
