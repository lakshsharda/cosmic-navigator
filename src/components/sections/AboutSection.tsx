import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
              About Me
            </h2>
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed max-w-xl">
              I'm a tech-driven problem solver who enjoys turning complex ideas into simple, reliable, and impactful solutions. 
              I approach development not just as writing code, but as understanding problems deeply, breaking them down logically, 
              and building systems that work well in real-world conditions.
            </p>
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed max-w-xl mt-4">
              My focus is on creating solutions that are scalable, maintainable, and user-centric. Before jumping into implementation, 
              I spend time analyzing requirements, identifying edge cases, and designing clear workflows. I believe strong fundamentals, 
              clean structure, and thoughtful decision-making matter more than chasing tools or trends.
            </p>
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed max-w-xl mt-4">
              I enjoy working across the entire lifecycle of a product-from ideation and system design to execution and refinement. 
              Driven by curiosity, I actively explore new technologies, especially in system design, optimization, and developer experience. 
              I'm always looking for opportunities to learn, improve, and collaborate with people who value innovation, quality, 
              and purposeful problem-solving.
            </p>
          </div>

          {/* Profile Image Placeholder */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-secondary/50 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-xs text-muted-foreground">Image</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
