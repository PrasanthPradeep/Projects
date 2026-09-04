import { useRef, useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Particles from './components/BG'
import BentoGrid from './components/BentoGrid';
import { profile, navItems } from './data/site.js';

function App() {
  const containerRef = useRef(null)
  const welcomeRef = useRef(null)
  const galleryRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [projectsActive, setProjectsActive] = useState(false)

  const handleAIClick = () => {
    // TODO: Implement AI chat feature in the future
    console.log('AI chat clicked - feature coming soon!');
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && welcomeRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const welcomeHeight = welcomeRef.current.offsetHeight;
        // Show indicator only when at the top (within first section)
        setShowScrollIndicator(scrollPosition < welcomeHeight * 0.00010);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Minimal enter transition for the project section (content always stays visible).
  // IntersectionObserver is independent of scroll-event timing, so the section
  // can never get stuck hidden.
  useEffect(() => {
    const container = containerRef.current;
    const target = galleryRef.current;
    if (!container || !target) return;
    if (typeof IntersectionObserver === 'undefined') {
      setProjectsActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setProjectsActive(entry.isIntersecting),
      { root: container, threshold: 0.35 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="scroll-container"
      style={{ 
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden', 
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        backgroundColor: '#000000',
      }}>
      <NavBar
        logo={profile.avatar}
        logoAlt={`${profile.name} Logo`}
        items={navItems}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
      <button
        onClick={handleAIClick}
        className="fixed top-20 right-4 sm:top-[1em] sm:right-6 z-50 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
        aria-label="AI Chat">
        <img src="/images/ai.png" alt="AI Chat" className="w-6 h-6 sm:w-8 sm:h-8 object-contain invert" />
      </button>

      {/* First Page - Welcome (original galaxy bubble bg) */}
      <div 
        ref={welcomeRef}
        className="panel"
        style={{ 
          height: '100vh',
          width: '100vw',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000ff'
          }}
        >
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 max-w-7xl mx-auto flex-1 flex items-center justify-center">
          <section id="home" className="text-center">
            <p className="ubuntu-bold text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] leading-tight mb-4 md:mb-6">
              Welcome!
            </p>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
              This is my projects landing section.<br /><p className="text-base sm:text-sm mx-auto"> &#123; /* Note: Here you can understand why AI can't replace me! */ &#125;</p><br /> &#123; Built late at night with equal parts of code and caffeine &#125;
            </div>
          </section>
        </main>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToGallery}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white hover:opacity-80 transition-all duration-500 group ${
            showScrollIndicator ? 'opacity-100 animate-bounce' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll to projects"
        >
          <span className="text-sm font-medium tracking-wide">SCROLL</span>
          <svg 
            className="w-6 h-6 stroke-white stroke-2" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Second Page - Projects (full-bleed black snap, content clears navbar) */}
      <div 
        ref={galleryRef}
        className="panel"
        style={{ 
          height: '100vh', 
          width: '100vw',
          position: 'relative',
          backgroundColor: '#000000',
          overflow: 'hidden',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
      >
        <div
          className={projectsActive ? 'section-enter' : undefined}
          style={{ width: '100%', height: '100%' }}
        >
          <BentoGrid />
        </div>
      </div>

    </div>
  )
}

export default App
