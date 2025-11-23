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

      <main className="relative">
        <section id="home" className="mb-24">
          <p className="ubuntu-bold text-3xl md:text-6xl lg:text-[8rem]">Welcome</p>
          <p className="text-2xl md:text-3xl lg:text-[1rem] leading-relaxed">
            This is the projects landing section.
          </p>
        </section>
      </main>

    </>
  )
}

export default App
