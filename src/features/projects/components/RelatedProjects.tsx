import type { Project } from '@/types/project'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProjectCard } from '@/features/projects/components/ProjectCard'

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading title="Related projects" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
