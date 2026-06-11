import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { getFeaturedProjects } from '@/data/projects'

export function FeaturedProjects() {
  const projects = getFeaturedProjects()

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="A mix of full-stack products, DevOps tooling, and AI-powered automation."
          />
          <Button variant="outline" render={<Link to="/projects" />}>
            View all projects
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <StaggerItem key={project.slug} className={index === 0 ? 'lg:col-span-2' : undefined}>
              <ProjectCard project={project} variant={index === 0 ? 'featured' : 'default'} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
