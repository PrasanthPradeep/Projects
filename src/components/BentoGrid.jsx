import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CircularGallery from './CircularGallery';

// ── Icons ─────────────────────────────────────────────────────────────────────

const CircularIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="5" stroke={active ? '#ffffff' : '#525252'} strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="2" fill={active ? '#ffffff' : '#525252'}/>
  </svg>
);

const GridIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill={active ? '#ffffff' : '#525252'} />
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill={active ? '#ffffff' : '#525252'} />
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill={active ? '#ffffff' : '#525252'} />
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill={active ? '#ffffff' : '#525252'} />
  </svg>
);

// ── Default data ──────────────────────────────────────────────────────────────

const defaultProjects = [
  {
    image: '/images/prismbrowser_web.png',
    title: 'Prism Browser Website',
    desc: 'An optimized official webpage of Prism AI Browser — fast, responsive, and conversion-focused.',
    tech: ['React', 'Vite', 'Tailwind'],
    live: 'https://prismbrowser.tech',
    repo: 'https://github.com/PrasanthPradeep/prismbrowser',
  },
  {
    image: 'https://picsum.photos/seed/2/800/600?grayscale',
    title: 'Protego',
    desc: 'Real-time PPE detection system using YOLOv8 and computer vision for workplace safety.',
    tech: ['Python', 'YOLOv8', 'OpenCV'],
    live: 'https://github.com/PrasanthPradeep/protego',
    repo: 'https://github.com/PrasanthPradeep/protego',
  },
  {
    image: 'https://picsum.photos/seed/3/800/600?grayscale',
    title: 'ChatBuddy',
    desc: 'AI companion powered by Llama 2 with streaming responses and memory.',
    tech: ['Python', 'Llama 2', 'FastAPI'],
    live: 'https://github.com/PrasanthPradeep/saturday-hack-night-langchain',
    repo: 'https://github.com/PrasanthPradeep/saturday-hack-night-langchain',
  },
  {
    image: 'https://picsum.photos/seed/4/800/600?grayscale',
    title: 'Poinsettia',
    desc: 'Secret Santa exchange app with automatic matching and scheduled reveals.',
    tech: ['FastAPI', 'React', 'SQLite'],
    live: 'https://github.com/PrasanthPradeep/Poinsettia',
    repo: 'https://github.com/PrasanthPradeep/Poinsettia',
  },
  {
    image: 'https://picsum.photos/seed/5/800/600?grayscale',
    title: 'KTUgrade',
    desc: 'Grade tracker for KTU B.Tech students to monitor progress and plan semesters.',
    tech: ['React', 'Node.js'],
    live: 'https://github.com/PrasanthPradeep/ktugrade',
    repo: 'https://github.com/PrasanthPradeep/ktugrade',
  },
  {
    image: 'https://picsum.photos/seed/16/800/600?grayscale',
    title: 'Aura AI Chat',
    desc: 'AI chat experience built for AI Glance in Prism Browser.',
    tech: ['React', 'AI SDK'],
    live: 'https://github.com/PrasanthPradeep/ai-chat',
    repo: 'https://github.com/PrasanthPradeep/ai-chat',
  },
];

// ── Toggle (dark minimal) ─────────────────────────────────────────────────────

function ViewToggle({ view, onChange }) {
  const btn = (isActive) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-tight transition-all duration-200 ${
      isActive
        ? 'bg-white text-black shadow-sm'
        : 'text-zinc-500 hover:text-zinc-200'
    }`;
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-[#0d0d0d] p-1">
      <button onClick={() => onChange('grid')} aria-pressed={view === 'grid'} className={btn(view === 'grid')}>
        <GridIcon active={view === 'grid'} />
        Grid
      </button>
      <button onClick={() => onChange('circular')} aria-pressed={view === 'circular'} className={btn(view === 'circular')}>
        <CircularIcon active={view === 'circular'} />
        Slide
      </button>
    </div>
  );
}

// ── Main (dark minimal, matches galaxy hero) ──────────────────────────────────

export default function BentoGrid({ projects = defaultProjects, className = '' }) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <section
      className={`relative h-full w-full overflow-hidden bg-black font-[Inter,system-ui,sans-serif] text-zinc-100 antialiased ${className}`}
    >
      <div
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-10 pt-10 sm:px-8 sm:pt-14"
        style={{ overflowY: viewMode === 'grid' ? 'auto' : 'hidden', scrollbarWidth: 'none' }}
      >
        {/* ── Header ── */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Portfolio · {projects.length} projects
              </span>
            </div>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Work that ships.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-400">
              A focused set of builds across web, AI, and vision — designed,
              engineered, and maintained end-to-end.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-[12px] text-zinc-600 sm:block">
              {viewMode === 'grid' ? '01 — GRID' : '02 — SLIDE'}
            </p>
            <ViewToggle view={viewMode} onChange={setViewMode} />
          </div>
        </header>

        {/* ── Divider ── */}
        {viewMode === 'grid' && <div className="mb-6 h-px w-full bg-white/10" />}

        {/* ── Grid ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.title + i} project={project} index={i} />
            ))}
          </div>
        )}

        {/* ── Footer note ── */}
        {viewMode === 'grid' && (
          <p className="mt-auto pt-2 text-center text-[13px] text-zinc-500">
            Want the full story behind each build?{' '}
            <a
              href="https://github.com/PrasanthPradeep"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white"
            >
              Browse GitHub →
            </a>
          </p>
        )}
      </div>

      {/* ── Slide view (original dark gallery) ── */}
      {viewMode === 'circular' && (
        <div className="absolute inset-0 top-[210px] z-0 overflow-hidden sm:top-[230px]">
          <CircularGallery
            items={projects.map((p) => ({
              image: p.image,
              text: p.title,
              description: p.desc,
              link: p.repo,
            }))}
            bend={0}
            scrollSpeed={1}
            textColor="#ffffff"
          />
        </div>
      )}
    </section>
  );
}
