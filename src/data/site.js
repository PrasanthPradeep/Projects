// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW PROJECT:
//   1. Copy one { ... } block inside `projects` below.
//   2. Fill in title, desc, tech, image, live, repo.
//   3. Save — it appears automatically in the grid AND the slide view.
//      (No other file needs to change.)
//
// Project shape:
//   {
//     id:    'unique-slug',            // unique key, e.g. 'prism-browser'
//     title: 'Project Name',           // card headline
//     desc:  'One-line description.',  // card subtext (keep under ~120 chars)
//     tech:  ['React', 'Vite'],        // skill pills
//     image: '/images/shot.png',       // card + slide artwork (B&W applied automatically)
//     live:  'https://…',              // Live button link (falls back to repo)
//     repo:  'https://…',              // GitHub icon link
//   }
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// LINKS — change any URL here ONCE, every usage across the site follows.
// ─────────────────────────────────────────────────────────────────────────────
//   links.portfolio  → nav "Terminal" item
//   links.github     → nav "GitHub" item, contact rows, grid footer
//   links.linkedin   → contact rows
//   links.email      → contact rows (mailto: built automatically)
//   links.resume     → resume download (Hire page contact list)
// Display labels (linkedinLabel, …) are derived from the URLs above,
// so they update themselves when a URL changes.
// ─────────────────────────────────────────────────────────────────────────────

export const links = {
  domain: 'prasanthp.tech',
  portfolio: 'https://prasanthp.tech',
  github: 'https://github.com/PrasanthPradeep',
  linkedin: 'https://linkedin.com/in/prasanthptech',
  email: 'programmerprasanth@proton.me',
  resume: '/src/assets/Prasanth_P.pdf',
};

// Subdomain helper — change `links.domain` once, every subdomain follows.
const sub = (name) => `https://${name}.${links.domain}`;

// Every live property under prasanthp.tech. Add a row here and it
// appears in the network strip automatically.
export const subdomains = [
  { label: 'Projects', href: sub('projects') },
  { label: 'Connect', href: sub('connect') },
  { label: 'Solarundo', href: sub('solarundo') },
  { label: 'Enteonam', href: sub('enteonam') },
];

export const profile = {
  name: 'Prasanth P',
  role: 'Full-stack developer',
  tagline: 'Projects that speak for themselves.',
  avatar: '/images/profile.jpg',
  resume: links.resume,
  portfolio: links.portfolio,
};

export const navItems = [
  { label: 'GitHub', href: links.github },
  { label: 'Contact Me', href: sub('connect') },
  { label: 'Terminal', href: links.portfolio },
  { label: 'sudo Hire me!', href: '/hire' },
];

export const contact = {
  email: links.email,
  emailHref: `mailto:${links.email}`,
  linkedinLabel: links.linkedin.replace(/^https?:\/\//, ''),
  linkedinUrl: links.linkedin,
  githubLabel: links.github.replace(/^https?:\/\//, ''),
  githubUrl: links.github,
};

export const stats = [
  ['3+', 'Years shipping'],
  ['10+', 'Apps in prod'],
  ['24h', 'Response time'],
];

export const highlights = [
  'Led teams of 3–5 developers to production',
  'Shipped 10+ full-stack apps end-to-end',
  'B.Tech in Computer Science, AI-native workflow',
  'Remote-ready, async-first communicator',
];

export const skills = [
  ['Frontend', 'React · Next.js · TypeScript'],
  ['Backend', 'Node.js · Python · PostgreSQL'],
  ['Infra', 'Docker · AWS · CI/CD'],
];

export const projects = [
  {
    id: 'prism-browser',
    title: 'Prism Browser Website',
    desc: 'An optimized official webpage of Prism AI Browser — fast, responsive, and conversion-focused.',
    tech: ['React', 'Vite', 'Tailwind'],
    image: '/images/prismbrowser_web.png',
    live: 'https://prismbrowser.tech',
    repo: 'https://github.com/PrasanthPradeep/prismbrowser',
  },
  {
    id: 'protego',
    title: 'Protego',
    desc: 'Real-time PPE detection system using YOLOv8 and computer vision for workplace safety.',
    tech: ['Python', 'YOLOv8', 'OpenCV'],
    image: 'https://picsum.photos/seed/2/800/600?grayscale',
    live: 'https://github.com/PrasanthPradeep/protego',
    repo: 'https://github.com/PrasanthPradeep/protego',
  },
  {
    id: 'chatbuddy',
    title: 'ChatBuddy',
    desc: 'AI companion powered by Llama 2 with streaming responses and memory.',
    tech: ['Python', 'Llama 2', 'FastAPI'],
    image: 'https://picsum.photos/seed/3/800/600?grayscale',
    live: 'https://github.com/PrasanthPradeep/saturday-hack-night-langchain',
    repo: 'https://github.com/PrasanthPradeep/saturday-hack-night-langchain',
  },
  {
    id: 'poinsettia',
    title: 'Poinsettia',
    desc: 'Secret Santa exchange app with automatic matching and scheduled reveals.',
    tech: ['FastAPI', 'React', 'SQLite'],
    image: 'https://picsum.photos/seed/4/800/600?grayscale',
    live: 'https://github.com/PrasanthPradeep/Poinsettia',
    repo: 'https://github.com/PrasanthPradeep/Poinsettia',
  },
  {
    id: 'ktugrade',
    title: 'KTUgrade',
    desc: 'Grade tracker for KTU B.Tech students to monitor progress and plan semesters.',
    tech: ['React', 'Node.js'],
    image: 'https://picsum.photos/seed/5/800/600?grayscale',
    live: 'https://github.com/PrasanthPradeep/ktugrade',
    repo: 'https://github.com/PrasanthPradeep/ktugrade',
  },
  {
    id: 'aura-ai-chat',
    title: 'Aura AI Chat',
    desc: 'AI chat experience built for AI Glance in Prism Browser.',
    tech: ['React', 'AI SDK'],
    image: 'https://picsum.photos/seed/16/800/600?grayscale',
    live: 'https://github.com/PrasanthPradeep/ai-chat',
    repo: 'https://github.com/PrasanthPradeep/ai-chat',
  },
];

// Slide-view shape expected by CircularGallery. BentoGrid uses this too,
// so both views always stay in sync with `projects`.
export const toGalleryItems = (list = projects) =>
  list.map((p) => ({
    image: p.image,
    text: p.title,
    description: p.desc,
    link: p.repo,
  }));
