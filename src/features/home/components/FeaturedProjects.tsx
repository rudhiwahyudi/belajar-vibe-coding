import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion/FadeIn'
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
    <section className="section-padding border-t border-border/40">
      <PageContainer className="flex flex-col gap-10">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t('featuredProjects.eyebrow')}
            title={t('featuredProjects.title')}
            description={t('featuredProjects.description')}
          />
          <Button variant="outline" render={<Link to="/projects" />} className="w-fit shrink-0 rounded-full border-border/60 bg-background px-5 text-[13.5px] font-medium hover:bg-secondary">
            {t('featuredProjects.viewAll')}
            <ArrowRight className="size-3.5" />
          </Button>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
