export default function ProjectCard({project}) {
  return (
    <article className="rounded-xl overflow-hidden shadow">
      <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm text-slate-600 mt-2">{project.desc}</p>
        <div className="mt-3 flex gap-2">
          <a href={project.live} className="text-xs px-3 py-1 border rounded">Live</a>
          <a href={project.repo} className="text-xs px-3 py-1 border rounded">Repo</a>
        </div>
      </div>
    </article>
  );
}
