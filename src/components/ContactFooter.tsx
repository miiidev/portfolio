import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import ContactForm from './ContactForm';

export default function ContactFooter() {
  return (
    <motion.footer id="contact" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2, margin: "-100px" }} className="min-h-screen flex flex-col justify-center py-12 border-t border-edge">
      <div className="w-full py-6 text-center">
        <motion.h3 variants={itemVariants} className="text-xl font-bold text-copy mb-2">Let's Connect</motion.h3>
        <motion.p variants={itemVariants} className="text-sm text-muted max-w-sm mx-auto mb-8">
          Whether you want to collaborate on a project or just want to say hi, my inbox is always open.
        </motion.p>
        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
        <motion.p variants={itemVariants} className="text-xs text-dim pt-12 font-mono border-t border-edge/50 mt-12">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React, TS, and Tailwind.
        </motion.p>
      </div>
    </motion.footer>
  );
}
