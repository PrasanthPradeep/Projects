export default function ProjectCard({ project, index = 0 }) {
  const techList = (Array.isArray(project.tech) ? project.tech : [project.tech]).filter(Boolean);

  const bgStyle = project.image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.8) 100%), url(${project.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'grayscale(1)',
      }
    : {};

  return (
    <article className="group flex h-full min-h-[300px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div
        className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10"
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

        <div className="relative z-10 w-full p-5 text-center sm:p-6">
          <h3 className="max-w-[12ch] text-balance text-center text-[clamp(1.9rem,2vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.05em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        {techList.length > 0 && (
          <div className="mb-3 flex min-h-[30px] flex-wrap items-center gap-1.5">
            {techList.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <p className="max-w-[26ch] text-[15px] leading-[1.42] text-zinc-200 sm:text-[17px]">
          {project.desc}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 text-[13px]">
          <a
            href={project.live || project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#ece9e2] px-4 py-2 font-semibold text-black transition-colors hover:bg-[#f5f3ee]"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-black">Live</span>
          </a>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repo"
              className="text-white transition-colors hover:text-zinc-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

