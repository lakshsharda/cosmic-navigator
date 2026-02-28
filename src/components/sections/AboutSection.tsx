import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
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

          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-2 rounded-2xl opacity-30 blur-lg" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }} />
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-blue-500/30" style={{ boxShadow: '0 0 12px rgba(59,130,246,0.2)' }}>
              <img 
                src="/image1.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
