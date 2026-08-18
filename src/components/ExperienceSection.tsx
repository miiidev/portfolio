import { motion } from 'framer-motion';
import { experience } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

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
      <motion.div variants={itemVariants}>
        <SectionHeading>Experience</SectionHeading>
      </motion.div>
      <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-2xl bg-surface border border-edge card-shadow p-6"
          >
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{item.period}</p>
            <h3 className="text-lg font-extrabold text-copy mb-1">{item.title}</h3>
            {item.org && <p className="text-sm text-muted mb-3">{item.org}</p>}
            <p className="text-sm text-muted leading-relaxed mb-4">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold"
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
