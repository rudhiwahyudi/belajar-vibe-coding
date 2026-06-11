import type { SiteConfig, SkillCategory } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Rudhi Wahyudi',
  initials: 'RW',
  role: 'Software & DevOps Engineer',
  tagline: 'Building reliable systems, automating the boring parts, and shipping with confidence.',
  shortBio:
    'Software & DevOps engineer focused on cloud infrastructure and AI-driven automation — currently preparing for the MEXT scholarship to deepen research in distributed systems.',
  bio: `I'm a software and DevOps engineer who enjoys the full lifecycle of building products — from designing APIs and frontends to wiring up the cloud infrastructure and CI/CD pipelines that keep them running.

Over the past few years I've worked across web application development, container orchestration, and cloud automation, with a growing focus on using AI to remove repetitive engineering work. I'm currently preparing an application for the MEXT scholarship to pursue graduate research in software systems in Japan.

When I'm not writing code, I'm usually documenting what I learned — you'll find notes on cloud architecture, DevOps practices, and my scholarship journey on the blog.`,
  location: 'Indonesia',
  email: 'rinnecentio@gmail.com',
  social: {
    github: 'https://github.com/rudhiwahyudi',
    linkedin: 'https://linkedin.com/in/rudhiwahyudi',
    x: 'https://x.com/rudhiwahyudi',
  },
  resumeUrl: '/resume-rudhi-wahyudi.pdf',
  availability: 'mext-applicant',
  focusAreas: ['Software Engineering', 'DevOps', 'Cloud Computing', 'AI Automation'],
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Java', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Redux'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'Spring Boot', 'REST', 'GraphQL'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
  },
  {
    category: 'Data & AI',
    items: ['PostgreSQL', 'Redis', 'OpenAI API', 'LangChain', 'Vector Databases'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Linux', 'Grafana', 'Prometheus', 'Figma'],
  },
]

export const techMarquee: string[] = [
  'React',
  'TypeScript',
  'Node.js',
  'Docker',
  'Kubernetes',
  'AWS',
  'Google Cloud',
  'Terraform',
  'Python',
  'PostgreSQL',
  'GitHub Actions',
  'OpenAI API',
]
