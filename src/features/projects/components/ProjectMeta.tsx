import { ExternalLink, Globe } from 'lucide-react'
import type { Project } from '@/types/project'
import { TechBadge } from '@/components/shared/TechBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GithubIcon } from '@/components/icons/BrandIcons'

function formatRange(start: string, end?: string): string {
  const format = (value: string) => {
    const [year, month] = value.split('-')
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return `${format(start)} – ${end ? format(end) : 'Present'}`
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
      <div>
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Role
        </h3>
        <p className="mt-1 text-sm">{project.role}</p>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Timeline
        </h3>
        <p className="mt-1 text-sm">{formatRange(project.timeline.start, project.timeline.end)}</p>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Status
        </h3>
        <p className="mt-1 text-sm capitalize">{project.status.replace('-', ' ')}</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Tech stack
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>

      {(project.links.live || project.links.repo || project.links.demo) && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            {project.links.live ? (
              <Button variant="outline" size="sm" render={<a href={project.links.live} target="_blank" rel="noreferrer" />}>
                <Globe className="size-3.5" />
                Live site
              </Button>
            ) : null}
            {project.links.demo ? (
              <Button variant="outline" size="sm" render={<a href={project.links.demo} target="_blank" rel="noreferrer" />}>
                <ExternalLink className="size-3.5" />
                Demo
              </Button>
            ) : null}
            {project.links.repo ? (
              <Button variant="outline" size="sm" render={<a href={project.links.repo} target="_blank" rel="noreferrer" />}>
                <GithubIcon className="size-3.5" />
                Source code
              </Button>
            ) : null}
          </div>
        </>
      )}
    </aside>
  )
}
