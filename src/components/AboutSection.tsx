import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="about.ts">About</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
        <motion.div variants={itemVariants} className="rounded-md border border-edge bg-surface overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
            <span className="text-xs text-muted">about.ts</span>
            <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <p className="text-code-comment">// I&apos;m a {personalInfo.role} based in {personalInfo.location}, building AI-powered and security-focused applications with machine learning, computer vision, and real-time systems.</p>
            <p className="text-code-comment">// I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.</p>
            <div className="pt-3 space-y-1.5">
              <p className="text-copy">
                <span className="text-code-keyword">const</span> <span className="text-code-function">location</span> = <span className="text-code-string">&apos;{personalInfo.location}&apos;</span>;
              </p>
              <p className="text-copy">
                <span className="text-code-keyword">const</span> <span className="text-code-function">status</span> = <span className="text-code-string">&apos;Open to opportunities&apos;</span>;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}