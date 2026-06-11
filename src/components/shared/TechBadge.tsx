import { cn } from '@/lib/utils'

interface TechBadgeProps {
  label: string
  className?: string
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground',
        className,
      )}
    >
      {label}
    </span>
  )
}
