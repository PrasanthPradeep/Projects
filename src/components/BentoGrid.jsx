import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CircularGallery from './CircularGallery';
import { projects as siteProjects, toGalleryItems, contact, subdomains } from '../data/site.js';

// ── Icons ─────────────────────────────────────────────────────────────────────

const CircularIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="5" stroke={active ? '#0a0a0a' : '#525252'} strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="2" fill={active ? '#0a0a0a' : '#525252'}/>
  </svg>
);

const GridIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill={active ? '#0a0a0a' : '#525252'} />
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill={active ? '#0a0a0a' : '#525252'} />
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill={active ? '#0a0a0a' : '#525252'} />
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill={active ? '#0a0a0a' : '#525252'} />
  </svg>
);

// ── Data lives in src/data/site.js — add projects there, they render here automatically ──

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

export default function BentoGrid({ projects = siteProjects, className = '' }) {
  const [viewMode, setViewMode] = useState('grid');
  const connectLink = subdomains.find((s) => s.label === 'Connect')?.href || contact.githubUrl;
  // Slide mode compacts the header so canvas + info card fit one screen, no scroll.
  const isSlide = viewMode === 'circular';

  return (
    <section
      className={`relative h-full w-full overflow-hidden bg-black font-[Inter,system-ui,sans-serif] text-zinc-100 antialiased ${className}`}
    >
      <div
        className={`relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 pt-20 sm:px-8 sm:pt-24 ${
          isSlide ? 'pb-4' : 'pb-10'
        }`}
        style={{ overflowY: viewMode === 'grid' ? 'auto' : 'hidden', scrollbarWidth: 'none' }}
      >
        {/* ── Header ── */}
        <header className={`flex flex-wrap items-end justify-between gap-4 sm:gap-5 ${isSlide ? 'mb-3 sm:mb-5' : 'mb-8'}`}>
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Portfolio · {projects.length} projects
              </span>
            </div>
            <h2 className={`font-semibold leading-[1.02] tracking-[-0.04em] text-white ${
              isSlide ? 'text-[clamp(24px,3.5vw,38px)]' : 'text-[clamp(32px,4.5vw,52px)]'
            }`}>
              Work that ships.
            </h2>
            {!isSlide && (
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-400">
                A focused set of builds across web, AI, and vision — designed,
                engineered, and maintained end-to-end.
              </p>
            )}
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
              <ProjectCard key={project.id || project.title + i} project={project} index={i} />
            ))}
          </div>
        )}

        {/* ── Footer note + network ── */}
        {viewMode === 'grid' && (
          <div className="mt-auto pt-2 text-center">
            <div className="h-5" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ── Slide view: responsive offset so header + canvas + card fit one screen ── */}
      {viewMode === 'circular' && (
        <div className="absolute inset-0 top-[160px] z-0 overflow-hidden sm:top-[200px] lg:top-[208px]">
          <CircularGallery
            items={toGalleryItems(projects)}
            bend={0}
            scrollSpeed={1}
            textColor="#ffffff"
          />
        </div>
      )}
    </section>
  );
}
