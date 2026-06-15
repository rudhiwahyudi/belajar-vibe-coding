import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'business-process-system-analysis',
    title: 'Business Process & System Analysis',
    tagline: 'Translating business requirements into system improvements at Astra Credit Companies',
    summary:
      'Ongoing work as a System Analyst — mapping business processes, gathering requirements from stakeholders, and coordinating with development teams to design and integrate system enhancements.',
    description: `As a System Analyst at Astra Credit Companies, I work closely with business units to understand how operational processes work today and where they can be improved.

This involves running requirement-gathering sessions with stakeholders, documenting current and proposed workflows using BPMN and use case diagrams, and translating those findings into specifications that development teams can build from.

**How I approach this work**

- Map existing business processes end-to-end before proposing changes, so improvements address root causes rather than symptoms.
- Write clear, structured requirements and use case documentation that both business stakeholders and engineers can use as a shared reference.
- Use SQL to explore and validate data when assessing the impact of a proposed process or system change.
- Coordinate between business stakeholders, IT, and vendors during system integration efforts to keep everyone aligned on scope and timeline.`,
    focusAreas: ['System Analysis', 'Business Process Analysis'],
    status: 'in-progress',
    featured: true,
    coverImage: '/images/projects/business-process-system-analysis/cover.jpg',
    gallery: [],
    techStack: ['SQL', 'BPMN', 'UML', 'Requirements Documentation', 'System Integration', 'Stakeholder Management'],
    role: 'System Analyst',
    timeline: { start: '2023-09' },
    links: {},
    highlights: [
      'Act as the bridge between business units and the development team, documenting requirements and processes',
      'Use BPMN and use case diagrams to map current and proposed workflows',
      'Support system integration efforts by validating data flows and business rules with SQL',
    ],
  },
  {
    slug: 'big-data-course-development',
    title: 'Big Data & Data Analytics Course Development',
    tagline: 'Designing lab materials and mentoring students as an Assistant Lecturer',
    summary:
      'As an Assistant Lecturer for Big Data and Data Analytics courses, I develop hands-on lab exercises and case studies, and mentor students through SQL-based data analysis projects.',
    description: `Alongside my work as a System Analyst, I serve as an Assistant Lecturer supporting Big Data and Data Analytics courses.

**What this involves**

- Designing hands-on lab exercises and case studies that give students practical experience with SQL and data analysis workflows.
- Mentoring students through course projects, from framing a problem and querying data to presenting findings.
- Reviewing student work and providing feedback aligned with the learning objectives set by the lead lecturer.`,
    focusAreas: ['Data & Research', 'Technology Solutions'],
    status: 'in-progress',
    featured: true,
    coverImage: '/images/projects/big-data-course-development/cover.jpg',
    gallery: [],
    techStack: ['SQL', 'Data Analysis', 'Big Data Concepts', 'Teaching', 'Curriculum Design'],
    role: 'Assistant Lecturer',
    timeline: { start: '2023-09' },
    links: {},
    highlights: [
      'Develop lab exercises and case studies for Big Data and Data Analytics courses',
      'Mentor students on SQL-based data analysis projects, from problem framing to presenting findings',
      'Provide feedback on student work aligned with course learning objectives',
    ],
  },
  {
    slug: 'pkm-research-project',
    title: 'PKM Research Project',
    tagline: 'Led a university research team from proposal to completion (Program Kreativitas Mahasiswa)',
    summary:
      'As Project Leader for a PKM-funded research initiative, I coordinated a small student research team through proposal development, data collection and analysis, and final reporting.',
    description: `Program Kreativitas Mahasiswa (PKM) is a nationally funded student research and innovation program in Indonesia. As Project Leader, I was responsible for coordinating the team through each stage of the research lifecycle.

**My responsibilities**

- Coordinated a small research team, setting milestones and keeping the project on track from proposal to final report.
- Led data collection and analysis, applying structured research methods to test the project's hypotheses.
- Compiled findings into a final report and presentation for the funding review.`,
    focusAreas: ['Data & Research', 'Technology Solutions'],
    status: 'completed',
    featured: false,
    coverImage: '/images/projects/pkm-research-project/cover.jpg',
    gallery: [],
    techStack: ['Research Methodology', 'Data Analysis', 'SQL', 'Project Coordination', 'Technical Writing'],
    role: 'Project Leader',
    timeline: { start: '2022-02', end: '2022-12' },
    links: {},
    highlights: [
      'Coordinated a student research team from initial proposal through to final reporting',
      'Applied structured research methods to collect and analyze project data',
      'Presented findings and outcomes to the program review committee',
    ],
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug)
  if (!current) return []

  return projects
    .filter((project) => project.slug !== slug)
    .filter((project) =>
      project.focusAreas.some((area) => current.focusAreas.includes(area)),
    )
    .slice(0, limit)
}

export function getAllFocusAreas(): string[] {
  const areas = new Set<string>()
  projects.forEach((project) => project.focusAreas.forEach((area) => areas.add(area)))
  return Array.from(areas)
}

export function getAllTechStacks(): string[] {
  const stacks = new Set<string>()
  projects.forEach((project) => project.techStack.forEach((tech) => stacks.add(tech)))
  return Array.from(stacks).sort()
}
