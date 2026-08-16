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
        <SectionHeading file="experience.ts">Experience</SectionHeading>
      </motion.div>
      <div className="space-y-3">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-surface border border-edge rounded-md p-6"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="font-mono text-xs text-code-comment">// {item.period}</p>
              <span className="font-mono text-xs text-dim border border-edge rounded px-2 py-0.5">experience.ts</span>
            </div>
            <h3 className="text-lg font-bold text-copy mb-1">{item.title}</h3>
            {item.org && <p className="text-sm text-muted mb-2">{item.org}</p>}
            <p className="text-sm text-muted leading-relaxed mb-4">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs bg-canvas text-muted px-3 py-1.5 rounded-full border border-edge"
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