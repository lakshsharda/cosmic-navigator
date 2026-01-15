import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:laksh@example.com' },
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <span className="text-primary text-sm tracking-[0.3em] uppercase">06</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              Get In Touch
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out!
              </p>

              {/* Social links */}
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 group"
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="p-8 rounded-xl border border-border/50 bg-card/50">
              <h3 className="text-xl font-bold text-foreground mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-6">
                Currently available for freelance projects and full-time opportunities.
              </p>
              <a
                href="mailto:laksh@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Laksh Sharda. All rights reserved.</p>
            <p>Designed & Built with ❤️</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
