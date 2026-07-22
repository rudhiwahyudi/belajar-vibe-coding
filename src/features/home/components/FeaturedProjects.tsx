import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { getFeaturedProjects, getAllProjects } from '@/data/projects'
import type { Project } from '@/types/project'
import { useLanguage } from '@/hooks/useLanguage'

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    getFeaturedProjects().then((data) => {
      if (data.length > 0) {
        setProjects(data)
      } else {
        // Fallback to showing recent projects if no projects are marked as featured in database
        getAllProjects().then((all) => setProjects(all.slice(0, 3)))
      }
    })
  }, [])

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t('featuredProjects.eyebrow')}
            title={t('featuredProjects.title')}
            description={t('featuredProjects.description')}
          />
          <Button variant="outline" render={<Link to="/projects" />}>
            {t('featuredProjects.viewAll')}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
