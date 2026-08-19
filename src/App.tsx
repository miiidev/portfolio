import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactFooter from './components/ContactFooter';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-canvas text-copy selection:bg-elevated">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-4 focus:z-50 focus:inline-flex focus:items-center focus:min-h-11 focus:px-5 focus:rounded-full focus:bg-surface focus:border focus:border-edge focus:card-shadow focus:text-sm focus:font-bold focus:text-copy"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="main-content" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden pb-28 md:pb-12">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <AchievementsSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactFooter />
          </main>
          <BackToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
