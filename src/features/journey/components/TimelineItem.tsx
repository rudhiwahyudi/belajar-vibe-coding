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
    <FadeIn className="relative flex gap-6 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="bg-gradient-accent flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-white">
          {item.logo ? (
            <img src={item.logo} alt={item.organization} className="size-full object-cover" />
          ) : (
            <Icon className="size-4" />
          )}
        </span>
        <span className="mt-2 w-px flex-1 bg-border last:hidden" />
      </div>

      <div className="flex flex-1 flex-col gap-2 pb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span>{TYPE_LABEL[item.type]}</span>
          <span aria-hidden="true">·</span>
          <span>{formatRange(item.range.start, item.range.end)}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
        <p className="text-sm font-medium text-muted-foreground">
          {item.organization}
          {item.location ? ` · ${item.location}` : ''}
        </p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        {item.bullets.length > 0 ? (
          <ul className="mt-1 flex flex-col gap-1.5">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-gradient mt-1 font-bold">—</span>
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        {item.tags && item.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </FadeIn>
  )
}
