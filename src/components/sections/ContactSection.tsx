import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-5xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a 
              href="tel:8810392753" 
              className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  +91 8810392753
                </p>
              </div>
            </a>

            <a 
              href="mailto:laksh.sharda.23cse@bmu.edu.in" 
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  laksh.sharda.23cse@bmu.edu.in
                </p>
              </div>
            </a>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <a
                href="https://github.com/lakshsharda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <Github className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/laksh-sharda-5541a7290/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right - Message */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-foreground/90 text-lg leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Open to internships and opportunities. Passionate developer with a problem-solver's mindset.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
