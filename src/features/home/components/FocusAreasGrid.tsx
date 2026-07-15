import { ClipboardList, Workflow, Puzzle, BarChart3 } from 'lucide-react'
import type { FocusArea } from '@/types/common'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
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
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={t('focusAreas.eyebrow')}
          title={t('focusAreas.title')}
          description={t('focusAreas.description')}
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map(({ area, icon: Icon, description }) => (
            <StaggerItem
              key={area}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span className="bg-gradient-accent flex size-10 items-center justify-center rounded-xl text-white">
                <Icon className="size-5" />
              </span>
              <h3 className="text-base font-semibold tracking-tight">{area}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
