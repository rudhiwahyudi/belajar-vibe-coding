import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TimelineItem } from '@/features/journey/components/TimelineItem'
import { getJourneySorted } from '@/data/journey'
import { cn } from '@/lib/utils'
import type { JourneyItem } from '@/types/journey'

const FILTERS: { label: string; value: JourneyItem['type'] | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Work', value: 'work' },
  { label: 'Education', value: 'education' },
  { label: 'Milestones', value: 'achievement' },
]

export default function JourneyPage() {
  const [filter, setFilter] = useState<JourneyItem['type'] | 'All'>('All')
  const [items, setItems] = useState<JourneyItem[]>([])

  useEffect(() => {
    getJourneySorted().then(setItems)
  }, [])

  const filteredItems = useMemo(() => {
    if (filter === 'All') return items
    return items.filter((item) => item.type === filter)
  }, [items, filter])

  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Journey"
        title="Where I've been, and where I'm headed"
        description="A timeline of my work experience, education, and the milestones along the way."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === option.value
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">
        {filteredItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </PageContainer>
  )
}
