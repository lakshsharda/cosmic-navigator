import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            CONTACT
          </h2>
          <p className="font-mono text-xs text-primary tracking-widest">
            Get In Touch
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left - Personal Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.a
                href="tel:+918810392753"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/20 hover:border-primary/50 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">PHONE</p>
                  <p className="text-lg font-semibold text-foreground tracking-wide">+91 8810392753</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:laksh.sharda.23cse@bmu.edu.in"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/20 hover:border-primary/50 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">EMAIL</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground break-all">laksh.sharda.23cse@bmu.edu.in</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/lakshsharda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/20 hover:border-primary/50 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">GITHUB</p>
                  <p className="text-lg font-semibold text-foreground">lakshsharda</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/laksh-sharda-5541a7290/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-primary/20 hover:border-primary/50 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">LINKEDIN</p>
                  <p className="text-lg font-semibold text-foreground">Laksh Sharda</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Tagline and Message */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 backdrop-blur-sm">
              <motion.p
                className="text-foreground/90 text-lg sm:text-xl leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>

              <motion.div
                className="p-4 rounded-xl bg-primary/10 border border-primary/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-primary font-medium text-base sm:text-lg leading-relaxed">
                  Open to internships and opportunities. Passionate developer with a problem-solver's mindset.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
