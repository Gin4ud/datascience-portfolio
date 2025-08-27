import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ContactSection from '@/components/portfolio/ContactSection';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        
        {/* Footer */}
        <footer className="bg-muted/30 py-8 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">
                © 2024 Alex Johnson. Built with React, TypeScript, and modern web technologies.
              </p>
              <p className="text-sm">
                Transforming data insights into production-ready applications.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
