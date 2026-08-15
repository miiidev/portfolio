import { motion } from 'framer-motion';
import { timeline } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function TimelineSection() {
  return (
    <motion.section
      id="timeline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-10">
        Timeline
      </motion.h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-edge md:-translate-x-px" />
        <div className="space-y-10">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
            >
              <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-inverse" />
              <div className={`pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <p className="text-xs font-mono text-dim mb-1">{item.year}</p>
                <h3 className="text-lg font-bold text-copy mb-1">{item.title}</h3>
                {item.org && <p className="text-sm text-muted mb-1">{item.org}</p>}
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}