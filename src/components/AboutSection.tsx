import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import GitHubStats from './GitHubStats';

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-8">
        About
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-lg text-muted leading-relaxed max-w-prose">
            I'm a <span className="text-copy font-medium">{personalInfo.role}</span> based in {personalInfo.location}, building AI-powered and security-focused applications with machine learning, computer vision, and real-time systems.
          </p>
          <p className="text-lg text-muted leading-relaxed max-w-prose">
            I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.
          </p>
          <ul className="text-sm text-muted space-y-1.5">
            <li>
              <span className="text-copy font-medium">Currently:</span> {personalInfo.location}, tutoring Java, open to software &amp; AI roles
            </li>
            <li>
              <span className="text-copy font-medium">Focus:</span> machine learning, computer vision, real-time systems
            </li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <GitHubStats />
        </motion.div>
      </div>
    </motion.section>
  );
}