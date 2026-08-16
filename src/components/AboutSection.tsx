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
      className="flex flex-col justify-center py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-copy mb-8">
        About
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={itemVariants} className="rounded-xl border border-edge bg-surface overflow-hidden font-mono">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-edge">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#27c93f' }} />
            <span className="ml-2 text-xs text-muted">miii@portfolio: ~/about</span>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-sm text-copy/80">$ cat about.txt</p>
            <p className="text-sm text-muted leading-relaxed">
              I&apos;m a <span className="text-copy font-medium">{personalInfo.role}</span> based in {personalInfo.location}, building AI-powered and security-focused applications with machine learning, computer vision, and real-time systems.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.
            </p>
            <div className="pt-2 space-y-1">
              <p className="text-sm text-muted">
                <span className="text-copy/80">Location:</span> Malaysia
              </p>
              <p className="text-sm text-muted">
                <span className="text-copy/80">Status:</span> Open to opportunities
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <GitHubStats />
        </motion.div>
      </div>
    </motion.section>
  );
}