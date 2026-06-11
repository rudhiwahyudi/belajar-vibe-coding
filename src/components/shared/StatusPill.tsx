import { cn } from '@/lib/utils'

interface StatusPillProps {
  label: string
  tone?: 'success' | 'warning' | 'neutral'
  className?: string
}

const toneClasses: Record<NonNullable<StatusPillProps['tone']>, string> = {
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  neutral: 'bg-secondary text-secondary-foreground border-border',
}

export function StatusPill({ label, tone = 'neutral', className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          tone === 'success' && 'bg-success',
          tone === 'warning' && 'bg-warning',
          tone === 'neutral' && 'bg-muted-foreground',
        )}
      />
      {label}
    </span>
  )
}
