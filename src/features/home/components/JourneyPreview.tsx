import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { TimelineItem } from '@/features/journey/components/TimelineItem'
import { getJourneySorted } from '@/data/journey'
import type { JourneyItem } from '@/types/journey'
import { useLanguage } from '@/hooks/useLanguage'

export function JourneyPreview() {
  const [items, setItems] = useState<JourneyItem[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    getJourneySorted().then((all) => setItems(all.slice(0, 3)))
  }, [])

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t('journey.eyebrow')}
            title={t('journey.title')}
            description={t('journey.description')}
          />
          <Button variant="outline" render={<Link to="/journey" />}>
            {t('journey.viewFull')}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col">
          {items.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
