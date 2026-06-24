import type { SiteConfig, SkillCategory } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Rudhi Wahyudi',
  initials: 'RW',
  role: 'System Analyst',
  tagline: 'Business Process Analyst & Technology Problem Solver — turning business needs into practical system solutions.',
  shortBio:
    'System Analyst at Astra Credit Companies, focused on business process analysis, requirements gathering, and system integration — also an Assistant Lecturer in Big Data & Data Analytics.',
  bio: `I'm a System Analyst at Astra Credit Companies, where I work at the intersection of business operations and technology — analyzing processes, gathering requirements, and coordinating with stakeholders and development teams to design system improvements that fit how the business actually works.

I hold a degree in Informatics and also serve as an Assistant Lecturer for Big Data and Data Analytics courses, helping students build practical skills in SQL and data analysis. As a former PKM (Program Kreativitas Mahasiswa) Project Leader and co-author of two research publications, I bring a structured, research-driven approach to problem solving.

Whether it's mapping a business process, writing a requirements document, or untangling a system integration issue, I focus on practical solutions that work for both the business and the people using the system.`,
  location: 'Indonesia',
  email: 'wahyudirudhi@gmail.com',
  social: {
    github: 'https://github.com/rudhiwahyudi',
    linkedin: 'https://www.linkedin.com/in/rudi-265952386/',
  },
  resumeUrl: '/resume-rudhi-wahyudi.pdf',
  availability: 'open-to-collab',
  focusAreas: ['System Analysis', 'Business Process Analysis', 'Technology Solutions', 'Data & Research'],
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Business Analysis',
    items: [
      'Requirements Gathering',
      'Process Mapping (BPMN)',
      'Use Case & UML',
      'Gap Analysis',
      'Stakeholder Management',
      'SDLC',
    ],
  },
  {
    category: 'Systems & Data',
    items: ['SQL', 'System Integration', 'Database Design', 'Data Analysis', 'Big Data Fundamentals'],
  },
  {
    category: 'Project & Coordination',
    items: ['Project Coordination', 'Agile / Scrum', 'Technical Documentation', 'Cross-functional Communication'],
  },
  {
    category: 'Research & Teaching',
    items: ['Academic Research', 'Curriculum Development', 'Mentoring', 'Data-driven Reporting'],
  },
]

export const techMarquee: string[] = [
  'System Analysis',
  'Business Process Analysis',
  'Requirements Gathering',
  'UML',
  'BPMN',
  'Use Case Design',
  'SQL',
  'System Integration',
  'Data Analysis',
  'Agile Scrum',
  'Technical Documentation',
  'Stakeholder Management',
  'SDLC',
]
