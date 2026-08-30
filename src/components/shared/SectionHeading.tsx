import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground" aria-hidden={false}>
          <span className="hidden h-px w-6 bg-border sm:block" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-2xl text-balance text-[26px] font-[600] leading-[1.2] tracking-[-0.02em] md:text-[32px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[560px] text-pretty text-[14.5px] leading-[1.6] text-muted-foreground md:text-[15.5px]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
