import { useEffect } from 'react';
import IntroOverlay from './components/IntroOverlay';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GithubActivity from './components/GithubActivity';
import Education from './components/Education';
import Contact from './components/Contact';
import VisitorCounter from './components/VisitorCounter';
import Footer from './components/Footer';
import { initPortfolioEffects } from './utils/portfolioEffects';

export default function App() {
  useEffect(() => initPortfolioEffects(), []);

  return (
    <>
      <IntroOverlay />
      <CustomCursor />
      <Navbar />

      <main id="main-content" style={{ opacity: 0 }}>
        <Hero />
        <hr className="divider" />
        <Projects />
        <hr className="divider" />
        <Skills />
        <hr className="divider" />
        <GithubActivity />
        <hr className="divider" />
        <Education />
        <hr className="divider" />
        <Contact />
      </main>

      <VisitorCounter />
      <Footer />
    </>
  );
}
