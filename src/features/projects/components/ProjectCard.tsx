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
      aria-label={`View project: ${project.title}`}
      className={cn(
        'card-hover group relative flex flex-col overflow-hidden rounded-[20px] border border-border/60 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        variant === 'featured' && 'lg:col-span-2',
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-secondary/50',
          variant === 'featured' ? 'aspect-[16/9]' : 'aspect-[4/3]',
        )}
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/50" />
            <span className="relative flex size-12 items-center justify-center rounded-2xl bg-background text-lg font-semibold tracking-tight shadow-sm ring-1 ring-border/50">
              {project.title.charAt(0)}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-[600] leading-snug tracking-tight">{project.title}</h3>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
          </span>
        </div>
        <p className="line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
    </Link>
  )
}
