import { Briefcase, GraduationCap, Sparkles } from 'lucide-react'
import type { JourneyItem } from '@/types/journey'
import { TechBadge } from '@/components/shared/TechBadge'
import { FadeIn } from '@/components/motion/FadeIn'

const TYPE_ICON: Record<JourneyItem['type'], typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Sparkles,
}

const TYPE_LABEL: Record<JourneyItem['type'], string> = {
  work: 'Work',
  education: 'Education',
  achievement: 'Milestone',
}

function formatRange(start: string, end?: string): string {
  const format = (value: string) => {
    const [year, month] = value.split('-')
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return `${format(start)} – ${end ? format(end) : 'Present'}`
}

export function TimelineItem({ item }: { item: JourneyItem }) {
  const Icon = TYPE_ICON[item.type]

  return (
    <FadeIn className="relative flex gap-5 pb-10 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-secondary/60 text-foreground shadow-sm">
          {item.logo ? (
            <img src={item.logo} alt={item.organization} className="size-full object-cover" />
          ) : (
            <Icon className="size-4 opacity-70" />
          )}
        </span>
        <span className="mt-3 w-px flex-1 bg-border/60 last:hidden" />
      </div>

      <div className="flex flex-1 flex-col gap-2 pb-1">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{TYPE_LABEL[item.type]}</span>
          <span aria-hidden="true" className="text-border">·</span>
          <span>{formatRange(item.range.start, item.range.end)}</span>
        </div>
        <h3 className="text-[15px] font-[600] leading-snug tracking-tight">{item.title}</h3>
        <p className="text-[13px] font-[450] tracking-tight text-muted-foreground">
          {item.organization}
          {item.location ? <span className="font-normal text-muted-foreground/70"> · {item.location}</span> : null}
        </p>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">{item.description}</p>
        {item.bullets.length > 0 ? (
          <ul className="mt-1 flex flex-col gap-1.5">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                <span className="mt-[9px] size-1 shrink-0 rounded-full bg-foreground/30" aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        {item.tags && item.tags.length > 0 ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </FadeIn>
  )
}
