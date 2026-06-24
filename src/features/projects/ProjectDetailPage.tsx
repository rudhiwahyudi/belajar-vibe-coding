import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { FadeIn } from '@/components/motion/FadeIn'
import { Prose } from '@/components/shared/Prose'
import { StatusPill } from '@/components/shared/StatusPill'
import { ProjectGallery } from '@/features/projects/components/ProjectGallery'
import { ProjectMeta } from '@/features/projects/components/ProjectMeta'
import { RelatedProjects } from '@/features/projects/components/RelatedProjects'
import { getProjectBySlug, getRelatedProjects } from '@/data/projects'
import type { Project } from '@/types/project'

const STATUS_TONE = {
  completed: 'success',
  'in-progress': 'warning',
  archived: 'neutral',
} as const

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null | undefined>(undefined)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    if (!slug) { setProject(null); return }
    getProjectBySlug(slug).then((p) => {
      setProject(p ?? null)
      if (p) getRelatedProjects(p.slug).then(setRelatedProjects)
    })
  }, [slug])

  if (project === undefined) return null
  if (!project) return <Navigate to="/projects" replace />

  return (
    <PageContainer className="flex flex-col gap-12 py-16 md:py-24">
      <FadeIn className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill
            label={project.status.replace('-', ' ')}
            tone={STATUS_TONE[project.status]}
          />
          {project.focusAreas.map((area) => (
            <span key={area} className="text-sm text-muted-foreground">
              {area}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>
      </FadeIn>

      <FadeIn className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl border border-border bg-secondary">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="text-gradient text-6xl font-bold">{project.title.charAt(0)}</span>
        )}
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <FadeIn className="flex flex-col gap-10">
          <Prose content={project.description} />

          {project.highlights.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight">Highlights</h2>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-gradient mt-1 font-bold">—</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.metrics && project.metrics.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <p className="text-gradient text-2xl font-bold">{metric.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          {project.architecture?.description ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight">Architecture</h2>
              <p className="text-sm text-muted-foreground">
                {project.architecture.description}
              </p>
            </div>
          ) : null}

          <ProjectGallery images={project.gallery} title={project.title} />
        </FadeIn>

        <ProjectMeta project={project} />
      </div>

      <RelatedProjects projects={relatedProjects} />
    </PageContainer>
  )
}
