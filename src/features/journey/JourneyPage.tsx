import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, LayoutGroup } from 'framer-motion'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { TimelineItem } from '@/features/journey/components/TimelineItem'
import { ExperienceModal } from '@/features/journey/components/ExperienceModal'
import { getJourneySorted } from '@/data/journey'
import { cn } from '@/lib/utils'
import type { JourneyItem } from '@/types/journey'
import { useLanguage } from '@/hooks/useLanguage'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function JourneyPage() {
  const [filter, setFilter] = useState<JourneyItem['type'] | 'All'>('All')
  const [items, setItems] = useState<JourneyItem[]>([])
  const [selected, setSelected] = useState<JourneyItem | null>(null)
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { t } = useLanguage()

  const handleOpen = (item: JourneyItem) => {
    setSelected(item)
    setOpen(true)
  }

  const filters = useMemo<{ label: string; value: JourneyItem['type'] | 'All' }[]>(() => [
    { label: t('journeyPage.filterAll'), value: 'All' },
    { label: t('journeyPage.filterWork'), value: 'work' },
    { label: t('journeyPage.filterEducation'), value: 'education' },
    { label: t('journeyPage.filterMilestones'), value: 'achievement' },
  ], [t])

  useEffect(() => {
    getJourneySorted().then(setItems)
  }, [])

  const filteredItems = useMemo(() => {
    if (filter === 'All') return items
    return items.filter((item) => item.type === filter)
  }, [items, filter])

  return (
    <LayoutGroup>
      <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
        <FadeIn>
          <SectionHeading
            eyebrow={t('journeyPage.eyebrow')}
            title={t('journeyPage.title')}
            description={t('journeyPage.description')}
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter journey">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={filter === option.value}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  filter === option.value
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="max-w-3xl">
          {filteredItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              layoutId={prefersReducedMotion ? undefined : `exp-${item.id}`}
              onClick={() => handleOpen(item)}
              aria-label={`View details for ${item.organization} — ${item.title}`}
              className="group relative w-full rounded-xl border border-transparent p-1 text-left transition-colors hover:border-border/60 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ willChange: 'transform' }}
            >
              <span className="pointer-events-none absolute right-2 top-2 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground opacity-0 shadow-sm transition-all group-hover:opacity-100 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground" aria-hidden>
                <ArrowUpRight className="size-3.5" />
              </span>
              <TimelineItem item={item} />
            </motion.button>
          ))}
        </div>
        <ExperienceModal item={selected} open={open} onOpenChange={setOpen} layoutId={selected?.id} />
      </PageContainer>
    </LayoutGroup>
  )
}
