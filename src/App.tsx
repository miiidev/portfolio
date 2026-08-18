import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import FileExplorer from './components/FileExplorer';
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
        <div className="min-h-screen bg-canvas text-copy selection:bg-elevated">
          <Navbar />
          <FileExplorer />
          <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden pb-28 md:pb-12">
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
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
