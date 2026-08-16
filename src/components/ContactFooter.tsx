import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import ContactForm from './ContactForm';
import LazyImage from './LazyImage';

const socialCircles = [
  {
    label: 'GitHub',
    href: personalInfo.socials.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: personalInfo.socials.whatsapp ?? '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${personalInfo.socials.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <path d="m22 7-10 5L2 7" />
      </svg>
    ),
  },
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
        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className="font-mono text-sm text-muted mb-3">
            <span aria-hidden="true">// </span>contact
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-copy tracking-tight">
            Let's build something
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            Currently open to software & AI roles. Reach out directly, or send a message below.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 w-full overflow-hidden rounded-xl border border-edge bg-surface"
          >
            <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#27c93f' }} />
              <span className="ml-2 text-xs font-mono text-muted">miii@portfolio: ~/contact</span>
            </div>
            <div className="p-4 sm:p-6">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex h-full flex-col justify-between gap-8 rounded-xl border border-edge bg-surface p-6"
          >
            <div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded-full border-2 border-edge">
                  <LazyImage
                    src="/portfolio/assets/profile-image.jpeg"
                    alt={personalInfo.name}
                    className="w-full h-full"
                    imgClassName="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-copy">{personalInfo.name}</p>
                  <p className="text-sm text-muted">{personalInfo.role}</p>
                </div>
              </div>

              <p className="mt-8 font-mono text-xs uppercase tracking-wide text-muted">Direct</p>
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="mt-1 block break-all text-lg text-copy hover:opacity-80 transition-opacity duration-200"
              >
                {personalInfo.socials.email}
              </a>

              <p className="mt-8 font-mono text-xs uppercase tracking-wide text-muted">Elsewhere</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialCircles.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    aria-label={social.label}
                    className="flex w-11 h-11 items-center justify-center rounded-full border border-edge text-muted hover:text-copy hover:border-edge-hover transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <p className="text-center font-mono text-xs text-dim">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-edge/50 pt-6"
        >
          <p className="font-mono text-xs text-dim">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialCircles.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                aria-label={social.label}
                className="flex w-10 h-10 items-center justify-center rounded-full border border-edge text-muted hover:text-copy hover:border-edge-hover transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}