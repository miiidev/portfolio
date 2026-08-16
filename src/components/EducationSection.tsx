import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { education } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function EducationSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="education"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-8">
        Education
      </motion.h2>
      <div className="space-y-3">
        {education.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-surface border border-edge rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 min-h-11 text-left"
              >
                <div>
                  <p className="text-xs font-mono text-dim mb-1">{item.period}</p>
                  <h3 className="text-lg font-bold text-copy">{item.title}</h3>
                  <p className="text-sm text-muted">{item.org}</p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
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
                    <div className="px-6 pb-5 text-sm text-muted leading-relaxed">
                      {item.description || 'More details coming soon.'}
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