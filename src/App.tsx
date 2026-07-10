import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactFooter from './components/ContactFooter';
import SideStepper from './components/SideStepper';
import BackToTop from './components/BackToTop';
import Particles from './components/Particles';

export default function App() {
  return (
    <ThemeProvider>
    <div className="min-h-screen bg-canvas text-copy selection:bg-elevated">
      <Particles />
      <Navbar />
      <SideStepper />
      <BackToTop />
      <HeroSection />
      <main className="px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
        <SkillsSection />
        <ProjectsSection />
        <ContactFooter />
      </main>
    </div>
    </ThemeProvider>
  );
}
