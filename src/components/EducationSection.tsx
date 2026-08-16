import { motion } from 'framer-motion';
import { education } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function EducationSection() {
  return (
    <motion.section
      id="education"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-1">
        Education
      </motion.h2>
      <motion.p variants={itemVariants} className="text-sm text-muted mb-8">
        Where I studied
      </motion.p>
      <div className="space-y-6">
        {education.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-surface border border-edge rounded-xl p-6"
          >
            <p className="text-xs font-mono text-dim mb-1">{item.period}</p>
            <h3 className="text-lg font-bold text-copy mb-1">{item.title}</h3>
            <p className="text-sm text-muted">{item.org}</p>
            {item.description && (
              <p className="text-sm text-muted leading-relaxed mt-2">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}