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
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
            active === option
              ? 'border-primary/40 bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
          )}
        >
          {getOptionLabel(option)}
        </button>
      ))}
    </div>
  )
}
