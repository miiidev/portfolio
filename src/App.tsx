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
import SideStepper from './components/SideStepper';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-canvas text-copy selection:bg-elevated">
          <Navbar />
          <SideStepper />
          <BackToTop />
          <HeroSection />
          <main className="px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <AchievementsSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactFooter />
          </main>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
