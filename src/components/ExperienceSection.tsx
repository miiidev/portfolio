import { motion } from 'framer-motion';
import { experience } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-1">
        Experience
      </motion.h2>
      <motion.p variants={itemVariants} className="text-sm text-muted mb-8">
        Where I&apos;ve worked
      </motion.p>
      <div className="space-y-6">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-surface border border-edge rounded-xl p-6"
          >
            <p className="text-xs font-mono text-dim mb-1">{item.period}</p>
            <h3 className="text-lg font-bold text-copy mb-1">{item.title}</h3>
            {item.org && <p className="text-sm text-muted mb-2">{item.org}</p>}
            <p className="text-sm text-muted leading-relaxed mb-3">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-canvas text-copy/80 px-3 py-1.5 rounded-full border border-edge"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}