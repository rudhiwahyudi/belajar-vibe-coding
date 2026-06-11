import type { FocusArea } from './common'

export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image: string
  focusAreas: FocusArea[]
  skills: string[]
}
