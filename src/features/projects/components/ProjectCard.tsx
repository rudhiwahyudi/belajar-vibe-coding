import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'
import { TechBadge } from '@/components/shared/TechBadge'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'featured'
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5',
        variant === 'featured' && 'lg:col-span-2',
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden border-b border-border bg-secondary',
          variant === 'featured' ? 'aspect-[16/9]' : 'aspect-[4/3]',
        )}
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="bg-gradient-accent absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20" />
            <span className="text-gradient text-4xl font-bold">{project.title.charAt(0)}</span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
    </Link>
  )
}
