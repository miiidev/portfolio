import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { skillsContainerVariants as containerVariants, skillsItemVariants as itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

const accentCycle = [
  'text-accent bg-accent/10',
  'text-accent-2 bg-accent-2/10',
  'text-accent-3 bg-accent-3/10',
  'text-accent-4 bg-accent-4/10',
];

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading>Skills</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {personalInfo.skills.map((group, gi) => {
          const color = accentCycle[gi % accentCycle.length];
          return (
            <motion.div
              key={group.domain}
              variants={itemVariants}
              className="rounded-2xl bg-surface border border-edge card-shadow p-6"
            >
              <h3 className="text-base font-extrabold text-copy mb-4">{group.domain}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${color}`}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt=""
                      className="w-4 h-4"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
