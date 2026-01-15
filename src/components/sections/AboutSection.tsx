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
              I'm a full-stack developer with expertise in building scalable, production-ready applications. 
              My technical focus includes React, TypeScript, Node.js, and cloud-native architectures. 
              I have hands-on experience with frontend frameworks, RESTful APIs, database design, and CI/CD pipelines. 
              I prioritize writing clean, testable code and building systems that are maintainable long-term. 
              Currently exploring distributed systems, performance optimization, and developer tooling.
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
