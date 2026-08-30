import { cn } from '@/lib/utils'
import type { FocusArea } from '@/types/common'
import { useLanguage } from '@/hooks/useLanguage'

interface ProjectFilterBarProps {
  focusAreas: FocusArea[]
  active: FocusArea | 'All'
  onChange: (value: FocusArea | 'All') => void
}

export function ProjectFilterBar({ focusAreas, active, onChange }: ProjectFilterBarProps) {
  const { t } = useLanguage()
  const options: (FocusArea | 'All')[] = ['All', ...focusAreas]

  function getOptionLabel(option: string) {
    if (option === 'All') return t('projectsPage.filterAll')
    if (option === 'System Analysis') return t('focusAreas.items.systemAnalysis.title')
    if (option === 'Business Process Analysis') return t('focusAreas.items.businessAnalysis.title')
    if (option === 'Technology Solutions') return t('focusAreas.items.techSolutions.title')
    if (option === 'Data & Research') return t('focusAreas.items.dataResearch.title')
    return option
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={cn(
            'rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            active === option
              ? 'border-foreground bg-foreground text-background'
              : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground',
          )}
        >
          {getOptionLabel(option)}
        </button>
      ))}
    </div>
  )
}
