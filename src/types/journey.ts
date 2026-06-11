import type { DateRange } from './common'

export type JourneyType = 'work' | 'education' | 'achievement'

export interface JourneyItem {
  id: string
  type: JourneyType
  title: string // role or degree
  organization: string
  location?: string
  range: DateRange
  description: string
  bullets: string[]
  logo?: string
  tags?: string[]
  link?: string
}
