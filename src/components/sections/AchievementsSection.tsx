import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Award, Star, Medal } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Hackathon Winner',
    description: 'First place at National Level Hackathon for AI-powered healthcare solution.',
    icon: <Trophy className="w-6 h-6" />,
    year: '2024',
  },
  {
    title: 'Research Publication',
    description: 'Published paper on Deep Learning for Medical Image Analysis.',
    icon: <Star className="w-6 h-6" />,
    year: '2024',
  },
  {
    title: 'Academic Excellence',
    description: 'Dean\'s List recognition for outstanding academic performance.',
    icon: <Award className="w-6 h-6" />,
    year: '2023',
  },
  {
    title: 'Open Source Contributor',
    description: 'Active contributor to major open-source ML projects.',
    icon: <Medal className="w-6 h-6" />,
    year: '2023',
  },
];

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="achievements"
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
            <span className="text-primary text-sm tracking-[0.3em] uppercase">05</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              Achievements
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Achievements grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">{achievement.title}</h3>
                      <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
