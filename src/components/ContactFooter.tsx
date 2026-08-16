import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';

const socialLinks = [
  { label: 'GitHub', href: personalInfo.socials.github },
  { label: 'WhatsApp', href: personalInfo.socials.whatsapp ?? '#' },
  { label: 'Email', href: `mailto:${personalInfo.socials.email}` },
];

export default function ContactFooter() {
  return (
    <motion.footer
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="min-h-screen flex flex-col justify-center py-12"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <SectionHeading file="contact.ts">Contact</SectionHeading>
          <p className="font-mono text-sm text-code-const -mt-4 mb-8">// TODO: hire me</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl rounded-md border border-edge bg-surface overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-edge bg-elevated/50 px-4 py-2">
            <span className="text-xs text-muted">contact.ts</span>
            <span className="text-xs text-dim" aria-hidden="true">&#10005;</span>
          </div>
          <div className="p-4 sm:p-6">
            <ContactForm />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-edge/50 pt-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-dim mb-2">Direct</p>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              className="block break-all text-lg text-copy hover:text-accent transition-colors duration-200"
            >
              {personalInfo.socials.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-copy transition-colors duration-200 min-h-11"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-center font-mono text-xs text-dim"
        >
          // &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
