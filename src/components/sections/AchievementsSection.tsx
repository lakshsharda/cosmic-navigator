import { motion } from 'framer-motion';

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            ACHIEVEMENTS
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest">
            Recognition & Awards
          </p>

          <div className="p-8 rounded-xl bg-secondary/30 border border-primary/20">
            <p className="text-muted-foreground font-mono text-sm">
              Coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AchievementsSection;
