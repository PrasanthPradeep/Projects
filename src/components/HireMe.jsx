import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Particles from './BG';

const HireMe = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    hrName: '',
    email: '',
    company: '',
    position: '',
    jobType: '',
    salaryRange: '',
    location: '',
    startDate: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Animate elements on mount
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.form-container', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });
      gsap.from('.info-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send to Web3Forms (get your access key from https://web3forms.com)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'e65894fd-d841-427c-81aa-5148ad0b236e',
          subject: `Job Opportunity: ${formData.position} at ${formData.company}`,
          from_name: formData.hrName,
          email: formData.email,
          ...formData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          hrName: '',
          email: '',
          company: '',
          position: '',
          jobType: '',
          salaryRange: '',
          location: '',
          startDate: '',
          requirements: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-black text-white relative overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Navigation */}
<nav className="relative z-20 px-4 sm:px-6 py-3 border-b border-white/20">
  <div className="flex items-center justify-between">
    
    {/* Logo / Title */}
    <Link
      to="/"
      className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
    >
      <img
        src="/images/profile.jpg"
        alt="Logo"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
      />
      <p className="text-white hero-title ubuntu-bold text-3xl">
        Hire Me
      </p>
    </Link>

    {/* Right Links */}
    <div className="flex items-center gap-2 sm:gap-3">
      
      <a
        href="/src/assets/Prasanth_P.pdf"
        download
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm !text-white ubuntu-bold
                   rounded-full border border-white
                   hover:bg-white hover:!text-black
                   transition-colors no-underline"
      >
        📄 Resume
      </a>

      <a
        href="https://prasanthp.me"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm !text-white ubuntu-bold
                   rounded-full border border-white
                   hover:bg-white hover:!text-black
                   transition-colors no-underline"
      >
        🌐 Portfolio
      </a>

      <Link
        to="/"
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm !text-white ubuntu-bold
                   rounded-full border border-white
                   hover:bg-white hover:!text-black
                   transition-colors no-underline"
      >
        ← Home
      </Link>

            </div>
        </div>
        </nav>


      {/* Main Content */}
      <div className="relative z-10 h-[calc(100vh-120px)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 h-full flex flex-col">
          <div className="grid lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
            {/* Contact Form */}
            <div className="form-container rounded-xl p-3 sm:p-4 h-full overflow-y-auto">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Job Opportunity Details</h2>
            
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label htmlFor="hrName" className="block text-sm sm:text-base font-medium mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="hrName"
                  name="hrName"
                  value={formData.hrName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Recruiter / HR name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium mb-1.5">
                  Company Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="hr@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm sm:text-base font-medium mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm sm:text-base font-medium mb-1.5">
                  Position / Role *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="e.g., Senior Full-Stack Developer"
                />
              </div>

              <div>
                <label htmlFor="jobType" className="block text-sm sm:text-base font-medium mb-1.5">
                  Job Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                >
                  <option value="">Select job type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm sm:text-base font-medium mb-1.5">
                  Work Location *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                >
                  <option value="">Select location type</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm sm:text-base font-medium mb-1.5">
                  Job Description & Requirements *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 text-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                  placeholder="Tell me about the role, tech stack, responsibilities, and what you're looking for..."
                />
              </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-black text-white border-2 border-white text-base sm:text-lg font-bold rounded-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Opportunity'}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center text-sm sm:text-base p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                    ✓ Thank you! I've received your opportunity and will respond within 24 hours.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center text-sm sm:text-base p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                    ✗ Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 h-full ">
              <div className="info-card p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">💼 Experience</h3>
                <ul className="space-y-1 text-sm sm:text-base text-gray-300">
                  <li>• 2+ years in Full-Stack Development</li>
                  <li>• Led teams of 3-5 developers</li>
                  <li>• Shipped 10+ production apps</li>
                  <li>• B.Tech. in Computer Science</li>
                </ul>
              </div>

              <div className="info-card p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">🚀 Technical Skills</h3>
                <div className="space-y-1 text-sm sm:text-base text-gray-300">
                  <div>
                    <span className="font-semibold text-white">Frontend: </span>
                    <span>React, Next.js, Vue, TypeScript</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Backend: </span>
                    <span>Node.js, Python, PostgreSQL</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">DevOps: </span>
                    <span>Docker, AWS, CI/CD</span>
                  </div>
                </div>
              </div>

              <div className="info-card p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">⚡ Availability</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-2">
                  Currently evaluating new full-time and contract opportunities.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm sm:text-base font-medium">Open to offers</span>
                </div>
              </div>

              <div className="info-card p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">📧 Contact</h3>
                <div className="space-y-1 text-sm sm:text-base">
                  <a 
                    href="mailto:programmerprasanth@proton.me" 
                    className="block text-white hover:text-gray-300 transition-colors no-underline"
                  >
                    → programmerprasanth@proton.me
                  </a>
                  <a 
                    href="https://linkedin.com/in/prasanth1010000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white hover:text-gray-300 transition-colors no-underline"
                  >
                    → LinkedIn Profile
                  </a>
                  <a 
                    href="https://github.com/PrasanthPradeepp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white hover:text-gray-300 transition-colors no-underline"
                  >
                    → GitHub Portfolio
                  </a>
                </div>
              </div>

              <div className="info-card p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">🎯 Looking For</h3>
                <ul className="space-y-1 text-sm sm:text-base text-gray-300">
                  <li>• Full-Time, Remote or hybrid positions</li>
                  <li>• Growth-oriented companies</li>
                  <li>• Modern tech stack</li>
                  <li>• Collaborative team culture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
