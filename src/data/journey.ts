import type { JourneyItem } from '@/types/journey'

export const journeyItems: JourneyItem[] = [
  {
    id: 'mext-application',
    type: 'achievement',
    title: 'MEXT Scholarship Applicant',
    organization: 'Ministry of Education, Culture, Sports, Science and Technology (Japan)',
    range: { start: '2026-04' },
    description:
      'Preparing a research proposal in distributed systems and cloud infrastructure for the MEXT graduate scholarship.',
    bullets: [
      'Drafting a research proposal on resilient multi-cloud orchestration',
      'Studying Japanese (JLPT N4 in progress)',
      'Connecting with prospective supervisors at partner universities',
    ],
    tags: ['Research', 'Distributed Systems', 'Scholarship'],
  },
  {
    id: 'devops-engineer',
    type: 'work',
    title: 'DevOps Engineer',
    organization: 'PT Teknologi Maju Bersama',
    location: 'Jakarta, Indonesia (Remote)',
    range: { start: '2024-07' },
    description:
      'Own the CI/CD pipelines and cloud infrastructure for a portfolio of internal and client-facing applications.',
    bullets: [
      'Migrated legacy deployments to a Kubernetes-based platform on AWS, cutting deploy time from 30 to 4 minutes',
      'Introduced Terraform across all environments, eliminating manual infrastructure changes',
      'Set up centralized observability with Prometheus and Grafana, reducing mean-time-to-resolution by 60%',
    ],
    tags: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
  },
  {
    id: 'fullstack-engineer',
    type: 'work',
    title: 'Full-Stack Software Engineer',
    organization: 'Startup Digital Nusantara',
    location: 'Bandung, Indonesia',
    range: { start: '2022-08', end: '2024-06' },
    description:
      'Built and maintained customer-facing web applications and internal tools for an early-stage startup.',
    bullets: [
      'Shipped the v1 customer dashboard used by 5,000+ monthly active users',
      'Designed and implemented the core REST API serving web and mobile clients',
      'Set up the team\'s first CI pipeline with automated testing and preview deployments',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
  },
  {
    id: 'software-engineering-internship',
    type: 'work',
    title: 'Software Engineering Intern',
    organization: 'PT Solusi Cloud Indonesia',
    location: 'Jakarta, Indonesia',
    range: { start: '2022-01', end: '2022-07' },
    description:
      'Contributed to internal tooling and learned production engineering practices on a small platform team.',
    bullets: [
      'Built internal admin tools using React and Express',
      'Wrote unit and integration tests, raising coverage on a key service from 40% to 75%',
      'Shadowed on-call rotations to learn incident response practices',
    ],
    tags: ['React', 'Express', 'Testing'],
  },
  {
    id: 'university-degree',
    type: 'education',
    title: 'B.Sc. in Informatics Engineering',
    organization: 'Universitas Telkom',
    location: 'Bandung, Indonesia',
    range: { start: '2018-08', end: '2022-07' },
    description:
      'Focused coursework on software engineering, distributed systems, and cloud computing.',
    bullets: [
      'Final project: a microservices-based learning management system deployed on Kubernetes',
      'Active member of the campus DevOps and cloud computing student community',
      'Graduated with GPA 3.7/4.0',
    ],
    tags: ['Distributed Systems', 'Cloud Computing', 'Software Engineering'],
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
