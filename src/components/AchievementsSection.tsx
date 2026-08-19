import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { achievements } from '../data';
import { softContainerVariants as containerVariants, softItemVariants as itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function AchievementsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="achievements"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading>Achievements</SectionHeading>
      </motion.div>
      <div className="space-y-3 max-w-3xl">
        {achievements.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl bg-surface border border-edge card-shadow overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 py-4 min-h-11 text-left"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.year}</p>
                  <h3 className="text-base font-extrabold text-copy">{item.title}</h3>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-5 pb-4 text-sm text-muted leading-relaxed">
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
