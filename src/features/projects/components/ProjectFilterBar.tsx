import { cn } from '@/lib/utils'
import type { FocusArea } from '@/types/common'

interface ProjectFilterBarProps {
  focusAreas: FocusArea[]
  active: FocusArea | 'All'
  onChange: (value: FocusArea | 'All') => void
}

export function ProjectFilterBar({ focusAreas, active, onChange }: ProjectFilterBarProps) {
  const options: (FocusArea | 'All')[] = ['All', ...focusAreas]

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
          {option}
        </button>
      ))}
    </div>
  )
}
