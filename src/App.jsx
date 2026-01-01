import { useRef } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import logo from './assets/profile.jpg'
import aiIcon from './assets/ai.png'
import Particles from './components/BG'
import CircularGallery from './components/CircularGallery';

function App() {
  const containerRef = useRef(null)
  const welcomeRef = useRef(null)
  const galleryRef = useRef(null)

  const handleAIClick = () => {
    // TODO: Implement AI chat feature in the future
    console.log('AI chat clicked - feature coming soon!');
  };

  return (
    <div 
      ref={containerRef}
      className="scroll-container"
      style={{ 
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden', 
        overflowY: 'scroll',
        scrollSnapType: 'y proximity',
        scrollBehavior: 'smooth',
      }}>
      <NavBar
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Me', href: '/contact' },
          { label: 'Terminal', href: 'https://prasanthp.me' },
          { label: 'sudo Hire me!', href: '/hire' },
        ]}
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
        className="fixed bottom-6 right-6 sm:top-6 sm:bottom-auto z-50 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
        aria-label="AI Chat">
        <img src={aiIcon} alt="AI Chat" className="w-6 h-6 sm:w-8 sm:h-8 object-contain invert" />
      </button>

      {/* First Page - Welcome */}
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
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 max-w-7xl mx-auto flex-1 flex items-center justify-center">
          <section id="home" className="text-center">
            <p className="ubuntu-bold text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] leading-tight mb-4 md:mb-6">
              Welcome!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
              This is the projects landing section.
            </p>
          </section>
        </main>
      </div>

      {/* Second Page - Gallery */}
      <div 
        ref={galleryRef}
        className="panel"
        style={{ 
          height: '100vh', 
          width: '100vw',
          position: 'relative',
          backgroundColor: '#000000ff',
          overflow: 'hidden',
          scrollSnapAlign: 'start',
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <CircularGallery
            bend={0}
            scrollSpeed={1}
          />
        </div>
      </div>

    </div>
  )
}

export default App
