import type { JourneyItem } from '@/types/journey'

export const journeyItems: JourneyItem[] = [
  {
    id: 'system-analyst-astra',
    type: 'work',
    title: 'System Analyst',
    organization: 'Astra Credit Companies',
    location: 'Indonesia',
    range: { start: '2023-09' },
    description:
      'Analyze business processes, gather requirements, and coordinate with stakeholders and development teams to design and support system improvements and integrations.',
    bullets: [
      'Translate business requirements into clear specifications and documentation for development teams',
      'Map business processes using BPMN and use case diagrams to identify improvement opportunities',
      'Use SQL to explore data and validate the impact of proposed system changes',
      'Coordinate with stakeholders across business units, IT, and vendors during system integration projects',
    ],
    tags: ['System Analysis', 'Business Process Analysis', 'SQL', 'Stakeholder Management'],
  },
  {
    id: 'assistant-lecturer',
    type: 'work',
    title: 'Assistant Lecturer — Big Data & Data Analytics',
    organization: 'Informatics Department',
    range: { start: '2023-09' },
    description:
      'Support Big Data and Data Analytics courses by designing lab materials and case studies, and mentoring students through SQL-based data analysis projects.',
    bullets: [
      'Design hands-on lab exercises and case studies for Big Data and Data Analytics courses',
      'Mentor students through SQL-based data analysis projects, from framing questions to presenting findings',
      'Review student work and provide feedback aligned with course learning objectives',
    ],
    tags: ['Teaching', 'Big Data', 'SQL', 'Data Analysis'],
  },
  {
    id: 'informatics-degree',
    type: 'education',
    title: "Bachelor's Degree in Informatics",
    organization: 'Informatics Program',
    range: { start: '2019-08', end: '2023-06' },
    description:
      'Focused coursework in software development, databases, and information systems, with practical research experience through a PKM-funded project.',
    bullets: [
      'Completed a PKM-funded research project as Project Leader',
      'Co-authored two research publications during undergraduate studies',
      'Built a strong foundation in SQL, system analysis, and software development',
    ],
    tags: ['Informatics', 'SQL', 'Information Systems'],
  },
  {
    id: 'research-publications',
    type: 'achievement',
    title: 'Research Publications',
    organization: 'Academic Journals / Conferences',
    range: { start: '2022-11', end: '2023-04' },
    description:
      'Co-authored and published two research papers in the fields of information systems and data analytics.',
    bullets: [
      'Co-authored a research publication on information systems and data analytics',
      'Co-authored a second research publication on business process and system analysis',
    ],
    tags: ['Research', 'Publication', 'Data Analytics'],
  },
  {
    id: 'pkm-project-leader',
    type: 'achievement',
    title: 'PKM Project Leader',
    organization: 'Program Kreativitas Mahasiswa (PKM)',
    range: { start: '2022-02', end: '2022-12' },
    description:
      'Led a student research team through a nationally funded research and innovation program, from proposal through to final reporting.',
    bullets: [
      'Coordinated a small research team and managed project milestones',
      'Led data collection and analysis using structured research methods',
      'Presented findings in a final report to the program review committee',
    ],
    tags: ['Research', 'Project Coordination', 'Data Analysis'],
  },
]

export function getJourneySorted(): JourneyItem[] {
  return [...journeyItems].sort((a, b) => {
    const aEnd = a.range.end ?? '9999-12'
    const bEnd = b.range.end ?? '9999-12'
    return bEnd.localeCompare(aEnd) || b.range.start.localeCompare(a.range.start)
  })
}

export function getJourneyByType(type: JourneyItem['type']): JourneyItem[] {
  return getJourneySorted().filter((item) => item.type === type)
}
