export type FocusArea =
  | 'Software Engineering'
  | 'DevOps'
  | 'Cloud Computing'
  | 'AI Automation'

export interface DateRange {
  start: string // ISO date, e.g. "2023-01"
  end?: string // ISO date, undefined = "Present"
}
