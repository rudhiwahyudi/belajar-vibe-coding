import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { ProjectFilterBar } from '@/features/projects/components/ProjectFilterBar'
import { projects, getAllFocusAreas } from '@/data/projects'
import type { FocusArea } from '@/types/common'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FocusArea | 'All'>('All')
  const focusAreas = useMemo(() => getAllFocusAreas() as FocusArea[], [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.focusAreas.includes(activeFilter))
  }, [activeFilter])

  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've worked on"
        description="A selection of business process analysis, system analysis, and research-driven work — from my current role to academic projects."
      />

      <ProjectFilterBar focusAreas={focusAreas} active={activeFilter} onChange={setActiveFilter} />

      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {filteredProjects.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No projects match this filter yet.
        </p>
      ) : null}
    </PageContainer>
  )
}
