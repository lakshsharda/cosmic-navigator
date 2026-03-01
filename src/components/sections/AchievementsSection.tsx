import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  position: string;
  year: string;
  description: string;
  image: string;
  link?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: 'Top 20 – Smart India Hackathon (College Level)',
    position: 'Team Member',
    year: '2023–2025',
    description: 'Secured Top 20 position for two consecutive years in the college-level Smart India Hackathon.',
    image: '/1.1.png',
  },
  {
    id: 2,
    title: 'Top 10 – Ideathon',
    position: 'Participant',
    year: '2023–2024',
    description: 'Achieved Top 10 rank in a college-level ideathon focused on innovation and problem-solving.',
    image: '/1.2.jpeg',
  },
  {
    id: 3,
    title: 'Technical Member – GLITCH',
    position: 'Technical Team Member',
    year: '2024–2025',
    description: 'Contributed to the development and maintenance of the GLITCH technical fest website.',
    image: '/1.3.jpeg',
    link: 'https://glitchbmu.com',
  },
  {
    id: 4,
    title: 'Technical Committee Member – STELMAR',
    position: 'Technical Committee Member',
    year: '2024–2025',
    description: 'Worked as a technical committee member supporting website and technical operations for STELMAR.',
    image: '/1.4.jpeg',
    link: 'https://stelmar.bmu.edu.in/',
  },
  {
    id: 5,
    title: 'Technical Member – HACKED Hackathon',
    position: 'Technical Team Member',
    year: '2024–2025',
    description: 'Assisted in building and maintaining the official website for the HACKED hackathon event.',
    image: '/1.5.jpeg',
    link: 'https://hackbmu.in/',
  },
  {
    id: 6,
    title: 'Winner – Global Virtual Classroom (Website Designing)',
    position: 'Team Leader',
    year: '2017–2018',
    description: 'Won the Global Virtual Classroom competition as Team Leader for website designing.',
    image: '/1.6.png',
    link: 'https://sites.google.com/gsbi.org/gvc1705',
  },
  {
    id: 7,
    title: 'Winner – APEC Taiwan Competition',
    position: 'Team Member',
    year: '2019–2020',
    description: 'Led the team to victory in an international APEC competition held in Taiwan.',
    image: '/1.7.jpeg',
  },
];

export function AchievementsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goToPrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? ACHIEVEMENTS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIdx((prev) => (prev === ACHIEVEMENTS.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <section id="achievements" className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
              ACHIEVEMENTS AND POSITION OF RESPONSIBILITIES
            </h2>
            <p className="font-mono text-xs text-primary tracking-widest">
              Recognition & Awards
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative rounded-xl bg-secondary/30 border border-primary/20 overflow-hidden">
            {/* Slides */}
            <div className="relative min-h-[420px] sm:min-h-[380px] md:min-h-0 md:h-96 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center w-full h-full">
                    {/* Image */}
                    <div className="flex items-center justify-center h-36 sm:h-44 md:h-full">
                      <img
                        src={ACHIEVEMENTS[currentIdx].image}
                        alt={ACHIEVEMENTS[currentIdx].title}
                        className="w-full h-full object-contain rounded-lg max-h-36 sm:max-h-44 md:max-h-80"
                      />
                    </div>

                    {/* Content */}
                      <div className="flex flex-col justify-center space-y-2 sm:space-y-4">
                      <div>
                        <h3 className="font-mono text-sm sm:text-lg md:text-xl font-bold text-foreground mb-1 line-clamp-2">
                          {ACHIEVEMENTS[currentIdx].title}
                        </h3>
                        <p className="text-primary font-mono text-sm font-semibold">
                          {ACHIEVEMENTS[currentIdx].position}
                        </p>
                      </div>

                      <p className="text-foreground/85 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {ACHIEVEMENTS[currentIdx].description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">
                          {ACHIEVEMENTS[currentIdx].year}
                        </span>
                        {ACHIEVEMENTS[currentIdx].link && (
                          <a
                            href={ACHIEVEMENTS[currentIdx].link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
                          >
                            Visit
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Previous achievement"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Next achievement"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {ACHIEVEMENTS.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIdx
                      ? 'bg-primary w-6'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to achievement ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-6">
            <p className="font-mono text-xs text-muted-foreground">
              {currentIdx + 1} / {ACHIEVEMENTS.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AchievementsSection;
