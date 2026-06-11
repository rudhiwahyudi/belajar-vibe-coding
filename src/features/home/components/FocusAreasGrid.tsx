import { Bot, Cloud, Code2, Workflow } from 'lucide-react'
import type { FocusArea } from '@/types/common'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

interface FocusAreaCard {
  area: FocusArea
  icon: typeof Code2
  description: string
}

const FOCUS_AREAS: FocusAreaCard[] = [
  {
    area: 'Software Engineering',
    icon: Code2,
    description:
      'Designing and shipping full-stack products — from APIs and data models to polished, accessible frontends.',
  },
  {
    area: 'DevOps',
    icon: Workflow,
    description:
      'Building CI/CD pipelines, container workflows, and GitOps practices that make shipping safe and routine.',
  },
  {
    area: 'Cloud Computing',
    icon: Cloud,
    description:
      'Architecting scalable, cost-aware infrastructure on AWS and Google Cloud with infrastructure as code.',
  },
  {
    area: 'AI Automation',
    icon: Bot,
    description:
      'Applying LLMs and automation pipelines to remove repetitive engineering work and unlock new workflows.',
  },
]

export function FocusAreasGrid() {
  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="What I do"
          title="Focus areas"
          description="A blend of engineering disciplines that shape how I build, ship, and operate software."
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
