import { motion } from 'framer-motion';
import { GraduationCap, School } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  icon: 'school' | 'graduation';
}

const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'BML Munjal University',
    degree: 'B.Tech in Computer Science Engineering',
    duration: '2023 – Present',
    score: 'CGPA: 8.33',
    icon: 'graduation',
  },
  {
    institution: 'DLDAV Model School',
    degree: 'Class 12th (CBSE)',
    duration: '2022 – 2023',
    score: '81%',
    icon: 'school',
  },
  {
    institution: 'DLDAV Model School',
    degree: 'Class 10th (CBSE)',
    duration: '2020 – 2021',
    score: '91%',
    icon: 'school',
  },
];

export function EducationSection() {
  return (
    <section id="education" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            EDUCATION
          </h2>
          <p className="font-mono text-xs text-primary mb-10 tracking-widest">
            Academic Journey
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

            <div className="space-y-8">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-3 top-1 w-7 h-7 rounded-full bg-secondary border-2 border-primary/60 flex items-center justify-center"
                    whileHover={{ scale: 1.2, borderColor: 'hsl(var(--primary))' }}
                  >
                    {edu.icon === 'graduation' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <School className="w-3.5 h-3.5 text-primary" />
                    )}
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className="p-5 rounded-xl bg-secondary/30 border border-primary/20 hover:border-primary/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-mono text-lg font-bold text-foreground">
                        {edu.institution}
                      </h3>
                      <span className="font-mono text-xs text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/30 w-fit">
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-foreground/80 text-sm mb-1">
                      {edu.degree}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {edu.duration}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EducationSection;
