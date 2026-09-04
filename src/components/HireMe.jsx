import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Particles from './BG';
import NavBar from './NavBar';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.07] [&>option]:bg-zinc-900';

const labelCls =
  'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400';

const HireMe = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const stageRef = useRef(null);
  const fitRef = useRef(null);
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
  // Scale-to-fit: shrink content to viewport height so the whole
  // page is visible without scrolling. Never scales up.
  const [fit, setFit] = useState({ s: 1, h: 0 });

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

  useEffect(() => {
    const stage = stageRef.current;
    const el = fitRef.current;
    if (!stage || !el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const need = el.offsetHeight;
        const avail = stage.clientHeight;
        if (!need || !avail) return;
        setFit({ s: Math.min(1, avail / need), h: need });
      });
    };
    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    if (document.fonts?.ready) document.fonts.ready.then(update).catch(() => {});
    const t = setTimeout(update, 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (ro) ro.disconnect();
    };
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
      className="relative flex h-dvh w-full flex-col overflow-hidden bg-black font-[Inter,system-ui,sans-serif] text-white antialiased"
    >
      {/* Subtle galaxy backdrop */}
      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={220}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={60}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* ── Nav (same pill nav as index) ─────────────────── */}
      <NavBar
        logo="/images/profile.jpg"
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Me', href: '/contact' },
          { label: 'Terminal', href: 'https://prasanthp.me' },
          { label: 'sudo Hire me!', href: '/hire' },
        ]}
        activeHref="/hire"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* ── Stage: fixed viewport area with responsive margins ── */}
      <div
        ref={stageRef}
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 pb-5 pt-20 sm:px-8 sm:pb-7 sm:pt-24 lg:px-12"
      >
        <div className="w-full" style={fit.h ? { height: fit.h * fit.s } : undefined}>
          <div
            ref={fitRef}
            className="w-full"
            style={{
              transform: `scale(${fit.s})`,
              transformOrigin: 'top left',
              width: `${100 / fit.s}%`,
            }}
          >
            {/* Hero */}
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  Open to new roles
                </span>
              </div>
              <h1 className="hero-title text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.0] tracking-[-0.05em]">
                Let&apos;s build what&apos;s next.
              </h1>
              <p className="hero-subtitle mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                Full-stack developer working across React, Node, and AI.
                Tell me about the role — I reply within 24 hours.
              </p>

              {/* Stats */}
              <div className="mt-5 flex divide-x divide-white/10">
                {[
                  ['2+', 'Years shipping'],
                  ['10+', 'Apps in prod'],
                  ['24h', 'Response time'],
                ].map(([n, l]) => (
                  <div key={l} className="pr-5 pl-5 first:pl-0 last:pr-0">
                    <p className="text-lg font-bold tracking-tight sm:text-xl">{n}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
              {/* ── Pitch column ─────────────────────────── */}
              <div className="space-y-5">
                <section className="info-card">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Why work with me
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                    {[
                      'Led teams of 3–5 developers to production',
                      'Shipped 10+ full-stack apps end-to-end',
                      'B.Tech in Computer Science, AI-native workflow',
                      'Remote-ready, async-first communicator',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="info-card rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Stack
                  </h2>
                  <div className="mt-3 space-y-2 text-[13px]">
                    {[
                      ['Frontend', 'React · Next.js · TypeScript'],
                      ['Backend', 'Node.js · Python · PostgreSQL'],
                      ['Infra', 'Docker · AWS · CI/CD'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-3">
                        <span className="w-20 shrink-0 font-semibold text-white">{k}</span>
                        <span className="text-zinc-400">{v}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="info-card">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Contact
                  </h2>
                  <div className="mt-3 divide-y divide-white/10 border-y border-white/10">
                    {[
                      ['Email', 'programmerprasanth@proton.me', 'mailto:programmerprasanth@proton.me', false],
                      ['LinkedIn', 'linkedin.com/in/prasanth1010000', 'https://linkedin.com/in/prasanth1010000', true],
                      ['GitHub', 'github.com/PrasanthPradeepp', 'https://github.com/PrasanthPradeepp', true],
                    ].map(([k, v, href, ext]) => (
                      <a
                        key={k}
                        href={href}
                        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center justify-between py-2.5 text-[13px] transition-colors"
                      >
                        <span className="text-zinc-500">{k}</span>
                        <span className="font-medium text-white group-hover:text-zinc-300">
                          {v} <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                        </span>
                      </a>
                    ))}
                    <a
                      href="/src/assets/Prasanth_P.pdf"
                      download
                      className="group flex items-center justify-between py-2.5 text-[13px] transition-colors"
                    >
                      <span className="text-zinc-500">Resume</span>
                      <span className="font-medium text-white group-hover:text-zinc-300">
                        Download PDF <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </a>
                  </div>
                </section>
              </div>

              {/* ── Form card ────────────────────────────── */}
              <div className="form-container h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <h2 className="text-lg font-bold tracking-tight sm:text-xl">Tell me about the role</h2>
                <p className="mt-1 text-[13px] text-zinc-500">
                  Two minutes for you, a reply within a day from me.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="hrName" className={labelCls}>Your name *</label>
                      <input
                        type="text" id="hrName" name="hrName"
                        value={formData.hrName} onChange={handleChange} required
                        className={inputCls} placeholder="Jane Recruiter"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>Work email *</label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange} required
                        className={inputCls} placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className={labelCls}>Company *</label>
                      <input
                        type="text" id="company" name="company"
                        value={formData.company} onChange={handleChange} required
                        className={inputCls} placeholder="Acme Inc."
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className={labelCls}>Role *</label>
                      <input
                        type="text" id="position" name="position"
                        value={formData.position} onChange={handleChange} required
                        className={inputCls} placeholder="Senior Full-Stack Dev"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="jobType" className={labelCls}>Type *</label>
                      <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required className={inputCls}>
                        <option value="">Select…</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className={labelCls}>Location *</label>
                      <select id="location" name="location" value={formData.location} onChange={handleChange} required className={inputCls}>
                        <option value="">Select…</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="onsite">On-site</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="requirements" className={labelCls}>Role details *</label>
                    <textarea
                      id="requirements" name="requirements"
                      value={formData.requirements} onChange={handleChange} required
                      rows="3" className={`${inputCls} resize-none`}
                      placeholder="Stack, responsibilities, timeline, compensation band…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-[#ece9e2] py-3 text-sm font-semibold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Send opportunity →'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-center text-[13px] text-green-400">
                      ✓ Received — I&apos;ll respond within 24 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-[13px] text-red-400">
                      ✗ Something went wrong — try again or email me directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
