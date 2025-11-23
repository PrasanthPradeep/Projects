import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import logo from './assets/profile.jpg'
import Particles from './components/BG';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: 'https://github.com/PrasanthPradeep?tab=repositories' },
          { label: 'Terminal', href: 'https://prasanthp.me' },
          { label: 'sudo Hire me!', href: '/contact' },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          /*pointerEvents: 'none',*/
          /*zIndex: 1,*/
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

      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 max-w-7xl mx-auto">
        <section id="home" className="mb-16 md:mb-24">
          <p className="ubuntu-bold text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] leading-tight mb-4 md:mb-6">
            Welcome
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl">
            This is the projects landing section.
          </p>
        </section>
      </main>

    </>
  )
}

export default App
