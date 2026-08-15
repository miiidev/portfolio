import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';

export default function ContactFooter() {
  const openContact = () => window.dispatchEvent(new CustomEvent('portfolio:contact'));

  return (
    <motion.footer
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12 border-t border-edge"
    >
      <div className="w-full py-6 text-center">
        <motion.h3 variants={itemVariants} className="text-xl font-bold text-copy mb-2">
          Let's Connect
        </motion.h3>
        <motion.p variants={itemVariants} className="text-sm text-muted max-w-sm mx-auto mb-8">
          Currently open to software & AI roles. Whether you want to collaborate or just say hi, my inbox is always open.
        </motion.p>
        <motion.div variants={itemVariants} className="mb-10">
          <button
            onClick={openContact}
            className="px-5 py-3 bg-inverse text-inverse-copy font-semibold rounded-lg text-sm transition-all border border-edge hover:border-edge-hover min-h-11"
          >
            Get In Touch
          </button>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 text-sm mb-12">
          <a href={`mailto:${personalInfo.socials.email}`} className="text-muted hover:text-copy transition-colors duration-200 min-h-11 inline-flex items-center px-2">
            Email
          </a>
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-copy transition-colors duration-200 min-h-11 inline-flex items-center px-2">
            GitHub
          </a>
          <a href={personalInfo.socials.whatsapp} target="_blank" rel="noreferrer" className="text-muted hover:text-copy transition-colors duration-200 min-h-11 inline-flex items-center px-2">
            WhatsApp
          </a>
        </motion.div>
        <motion.p variants={itemVariants} className="text-xs text-dim pt-12 font-mono border-t border-edge/50 mt-12">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React, TypeScript, and Tailwind.
        </motion.p>
      </div>
    </motion.footer>
  );
}