import type { DateRange, FocusArea } from './common'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectLinks {
  live?: string
  repo?: string
  demo?: string
}

export interface ProjectArchitecture {
  image?: string
  description?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string // markdown
  focusAreas: FocusArea[]
  status: 'completed' | 'in-progress' | 'archived'
  featured: boolean
  coverImage: string
  gallery: string[]
  techStack: string[]
  role: string
  timeline: DateRange
  links: ProjectLinks
  highlights: string[]
  metrics?: ProjectMetric[]
  architecture?: ProjectArchitecture
}
