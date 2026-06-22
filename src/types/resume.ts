export interface ResumeExperience {
  title: string
  organization: string
  period: string
  location?: string
  bullets: string[]
}

export interface ResumeEducation {
  degree: string
  institution: string
  period: string
  note?: string
}

export interface ResumeSkillGroup {
  category: string
  items: string  // comma-separated string for easy editing
}

export interface Resume {
  id: string
  name: string
  tagline: string
  summary: string
  email?: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  skills: ResumeSkillGroup[]
  pdfUrl?: string
  updatedAt: string
}
