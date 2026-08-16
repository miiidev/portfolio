import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactFooter from './components/ContactFooter';
import StatusBar from './components/StatusBar';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main className="lg:pl-48 pb-6">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <AchievementsSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactFooter />
        </main>
        <StatusBar />
        <BackToTop />
      </MotionConfig>
    </ThemeProvider>
  );
}
