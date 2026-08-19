import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { fadeUpConfig } from '../utils/animations';
import SectionHeading from './SectionHeading';

const socials = [
  { label: 'GitHub', href: personalInfo.socials.github },
  { label: 'WhatsApp', href: personalInfo.socials.whatsapp ?? '#' },
  { label: 'Email', href: `mailto:${personalInfo.socials.email}` },
];

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      {...fadeUpConfig}
      className="flex flex-col justify-center py-12"
    >
      <SectionHeading>About</SectionHeading>
      <div className="rounded-2xl bg-surface border border-edge card-shadow p-6 sm:p-8 max-w-3xl">
        <p className="text-base sm:text-lg text-copy leading-relaxed mb-4">
          I&apos;m a {personalInfo.role} based in {personalInfo.location}. I build with machine learning, computer vision, and real-time systems, and I care about the boring parts too: security, readable code, and apps that stay fast.
        </p>
        <p className="text-base text-muted leading-relaxed mb-6">
          I currently tutor Java to beginners. Teaching forces me to keep my fundamentals sharp and to explain complex ideas clearly, which carries into how I build and document software.
        </p>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="inline-flex items-center min-h-11 px-5 rounded-full bg-accent/10 text-accent text-sm font-bold transition-colors hover:bg-accent hover:text-canvas"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}