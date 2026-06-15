import { ClipboardList, Workflow, Puzzle, BarChart3 } from 'lucide-react'
import type { FocusArea } from '@/types/common'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

interface FocusAreaCard {
  area: FocusArea
  icon: typeof ClipboardList
  description: string
}

const FOCUS_AREAS: FocusAreaCard[] = [
  {
    area: 'System Analysis',
    icon: ClipboardList,
    description:
      'Gathering requirements, mapping workflows, and translating business needs into clear specifications for development teams.',
  },
  {
    area: 'Business Process Analysis',
    icon: Workflow,
    description:
      'Analyzing and improving business processes through BPMN mapping, gap analysis, and close stakeholder collaboration.',
  },
  {
    area: 'Technology Solutions',
    icon: Puzzle,
    description:
      'Solving operational and system integration challenges with practical, well-documented technical solutions.',
  },
  {
    area: 'Data & Research',
    icon: BarChart3,
    description:
      'Using SQL and data analysis to support decisions, teaching, and academic research.',
  },
]

export function FocusAreasGrid() {
  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="What I do"
          title="Focus areas"
          description="A blend of analytical and technical disciplines that shape how I bridge business needs and technology."
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map(({ area, icon: Icon, description }) => (
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
