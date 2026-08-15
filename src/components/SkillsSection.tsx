import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-8">
        Skills
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personalInfo.skills.map((group) => (
          <motion.div
            key={group.domain}
            variants={itemVariants}
            className="bg-surface/50 border border-edge rounded-xl p-6"
          >
            <h3 className="text-sm font-semibold text-muted mb-4 font-mono uppercase tracking-wide">
              {group.domain}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-edge bg-canvas text-copy/80 text-sm"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                    alt=""
                    className="w-4 h-4 skill-icon-base"
                  />
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}