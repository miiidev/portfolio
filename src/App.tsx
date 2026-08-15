import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import TimelineSection from './components/TimelineSection';
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
            <SkillsSection />
            <TimelineSection />
            <ProjectsSection />
            <ContactFooter />
          </main>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
