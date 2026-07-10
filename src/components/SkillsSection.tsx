import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function SkillsSection() {
  return (
    <motion.section id="about" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1, margin: "-100px" }} className="min-h-screen flex flex-col justify-center py-12">
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-6 flex items-center gap-3">
        <span className="text-dim font-mono text-sm">01.</span> Tech Stacks
      </motion.h2>
      <motion.div variants={containerVariants} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
        {personalInfo.skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group bg-surface/50 border border-edge rounded-xl p-5 transition-all duration-200 hover:border-edge-hover hover:text-copy hover:shadow-glow-card hover:-translate-y-1 cursor-default"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                alt=""
                className="w-7 h-7 block group-hover:hidden shrink-0 skill-icon-base"
              />
              <img
                src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace('#', '')}`}
                alt=""
                className="w-7 h-7 hidden group-hover:block shrink-0"
              />
              <span className="text-base font-medium font-mono text-muted group-hover:text-copy transition-colors">
                {skill.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
