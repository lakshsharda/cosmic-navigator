import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <span className="text-primary text-sm tracking-[0.3em] uppercase">01</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              About Me
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-foreground font-medium">full-stack developer</span> with 
                expertise in building scalable, production-ready applications. My technical focus 
                includes React, TypeScript, Node.js, and cloud-native architectures.
              </p>
              <p>
                I have hands-on experience with frontend frameworks, RESTful APIs, database design, 
                and CI/CD pipelines. I prioritize writing clean, testable code and building systems 
                that are maintainable long-term.
              </p>
              <p>
                Currently exploring <span className="text-primary">distributed systems</span>, 
                <span className="text-primary"> performance optimization</span>, and 
                <span className="text-primary"> developer tooling</span>.
              </p>
            </div>

            {/* Quick facts */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-border/50 bg-card/50">
                <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Quick Facts
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">Based in India</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">CS Student</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">Open to Opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
