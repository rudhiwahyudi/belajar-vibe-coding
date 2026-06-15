export type FocusArea =
  | 'System Analysis'
  | 'Business Process Analysis'
  | 'Technology Solutions'
  | 'Data & Research'

export interface DateRange {
  start: string // ISO date, e.g. "2023-01"
  end?: string // ISO date, undefined = "Present"
}
