import type { FocusArea } from './common'

export interface SiteConfig {
  name: string
  initials: string
  role: string
  tagline: string
  bio: string
  shortBio: string
  location: string
  email: string
  social: {
    github?: string
    linkedin?: string
    x?: string
    instagram?: string
  }
  resumeUrl: string
  availability: 'open-to-work' | 'open-to-collab' | 'mext-applicant'
  focusAreas: FocusArea[]
}

export interface SkillCategory {
  category: string
  items: string[]
}
