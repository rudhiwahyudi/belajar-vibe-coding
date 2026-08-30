import { cn } from '@/lib/utils'

interface TechBadgeProps {
  label: string
  className?: string
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-[11px] font-medium tracking-tight text-muted-foreground',
        className,
      )}
    >
      {label}
    </span>
  )
}
