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
      className="flex flex-col justify-center py-12"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.div variants={itemVariants}>
          <SectionHeading>Contact</SectionHeading>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-surface border border-edge card-shadow p-6 sm:p-8"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-edge pt-6"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-dim mb-2">Direct</p>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              className="block break-all text-lg font-bold text-copy hover:text-accent transition-colors duration-200"
            >
              {personalInfo.socials.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="inline-flex items-center min-h-11 px-4 rounded-full bg-accent/10 text-accent text-sm font-bold transition-colors hover:bg-accent hover:text-canvas"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-center text-xs text-dim"
        >
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
