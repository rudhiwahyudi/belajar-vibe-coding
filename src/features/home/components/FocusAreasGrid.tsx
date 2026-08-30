import { ClipboardList, Workflow, Puzzle, BarChart3 } from 'lucide-react'
import type { FocusArea } from '@/types/common'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { useLanguage } from '@/hooks/useLanguage'

interface FocusAreaCard {
  area: FocusArea | string
  icon: typeof ClipboardList
  description: string
}

export function FocusAreasGrid() {
  const { t } = useLanguage()

  const focusAreas: FocusAreaCard[] = [
    {
      area: t('focusAreas.items.systemAnalysis.title'),
      icon: ClipboardList,
      description: t('focusAreas.items.systemAnalysis.desc'),
    },
    {
      area: t('focusAreas.items.businessAnalysis.title'),
      icon: Workflow,
      description: t('focusAreas.items.businessAnalysis.desc'),
    },
    {
      area: t('focusAreas.items.techSolutions.title'),
      icon: Puzzle,
      description: t('focusAreas.items.techSolutions.desc'),
    },
    {
      area: t('focusAreas.items.dataResearch.title'),
      icon: BarChart3,
      description: t('focusAreas.items.dataResearch.desc'),
    },
  ]

  return (
    <section className="section-padding">
      <PageContainer className="flex flex-col gap-10">
        <FadeIn>
          <SectionHeading
            eyebrow={t('focusAreas.eyebrow')}
            title={t('focusAreas.title')}
            description={t('focusAreas.description')}
          />
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map(({ area, icon: Icon, description }) => (
            <StaggerItem
              key={area}
              className="card-hover flex flex-col gap-4 rounded-[20px] border border-border/60 bg-card p-6 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/60 text-foreground" aria-hidden>
                <Icon className="size-[18px] opacity-80" strokeWidth={1.75} />
              </span>
              <h3 className="text-[15px] font-[600] leading-[1.3] tracking-tight">{area}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted-foreground">{description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
