import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            CONTACT
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest">
            Get In Touch
          </p>

          <p className="text-foreground/80 text-base sm:text-lg mb-4 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <motion.p
            className="text-primary font-medium text-base sm:text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Open to internships and opportunities. Passionate developer with a problem-solver's mindset.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <motion.a
              href="tel:+918810392753"
              className="w-14 h-14 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6 text-primary" />
            </motion.a>
            <motion.a
              href="mailto:laksh.sharda.23cse@bmu.edu.in"
              className="w-14 h-14 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6 text-primary" />
            </motion.a>
            <motion.a
              href="https://github.com/lakshsharda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-primary" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/laksh-sharda-5541a7290/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6 text-primary" />
            </motion.a>
          </div>

          {/* Contact details text */}
          <motion.div
            className="space-y-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-primary/60" />
              <span>+91 8810392753</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-primary/60" />
              <span>laksh.sharda.23cse@bmu.edu.in</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
