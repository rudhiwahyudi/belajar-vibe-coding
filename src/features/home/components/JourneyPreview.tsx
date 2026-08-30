import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, LayoutGroup } from 'framer-motion'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { ExperienceModal } from '@/features/journey/components/ExperienceModal'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { getJourneySorted } from '@/data/journey'
import type { JourneyItem } from '@/types/journey'
import { useLanguage } from '@/hooks/useLanguage'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function formatRange(start: string, end?: string): string {
  const fmt = (v: string) => {
    const [y, m] = v.split('-')
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`
}

export function JourneyPreview() {
  const [items, setItems] = useState<JourneyItem[]>([])
  const [selected, setSelected] = useState<JourneyItem | null>(null)
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { t } = useLanguage()

  useEffect(() => {
    getJourneySorted().then((all) => setItems(all.slice(0, 3)))
  }, [])

  const handleOpen = (item: JourneyItem) => {
    setSelected(item)
    setOpen(true)
  }

  return (
    <LayoutGroup>
      <section className="section-padding border-t border-border/40">
        <PageContainer className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-12">
          {/* Left — sticky intro */}
          <FadeIn className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow={t('journey.eyebrow')}
              title="My Journey"
              description="My professional journey transforming businesses through technology. From System Analysis to data-driven solutions."
            />
            <Button variant="outline" render={<Link to="/journey" />} className="hidden w-fit shrink-0 rounded-full border-border/60 bg-card px-5 text-[13.5px] font-medium hover:bg-secondary lg:inline-flex">
              {t('journey.viewFull')}
              <ArrowRight className="size-3.5" aria-hidden />
            </Button>
          </FadeIn>

          {/* Right — cards with stagger + shared layout */}
          <StaggerGroup className="flex flex-col gap-4">
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <motion.button
                  type="button"
                  layoutId={prefersReducedMotion ? undefined : `exp-${item.id}`}
                  onClick={() => handleOpen(item)}
                  aria-label={`View details for ${item.organization} — ${item.title}`}
                  className="group relative flex w-full flex-col gap-3 rounded-[20px] border border-border/60 bg-card p-6 text-left transition-colors hover:border-border hover:bg-secondary/20 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{ willChange: 'transform' }}
                >
                  <span className="pointer-events-none absolute right-4 top-4 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground" aria-hidden>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
                  </span>
                  {/* Visual hierarchy: date (muted) → role (primary) → company (secondary) → short summary → detail indicator */}
                  <p className="pr-8 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/60">
                    {formatRange(item.range.start, item.range.end)}
                  </p>
                  <div className="flex flex-col gap-0.5 pr-8">
                    <h3 className="text-[15px] font-[700] uppercase tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-[13.5px] font-[450] tracking-tight text-muted-foreground">{item.organization}</p>
                  </div>
                  <p className="line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.description}</p>
                  <span className="inline-flex items-center gap-1 pt-1 text-[13px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    View Details
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </motion.button>
              </StaggerItem>
            ))}
            <FadeIn className="w-fit lg:hidden">
              <Button variant="outline" render={<Link to="/journey" />} className="w-fit rounded-full border-border/60 bg-card px-5 text-[13.5px] font-medium hover:bg-secondary">
                {t('journey.viewFull')}
                <ArrowRight className="size-3.5" aria-hidden />
              </Button>
            </FadeIn>
          </StaggerGroup>
        </PageContainer>
        <ExperienceModal item={selected} open={open} onOpenChange={setOpen} layoutId={selected?.id} />
      </section>
    </LayoutGroup>
  )
}
