import { ExternalLink, ShieldCheck } from 'lucide-react'
import type { Certification } from '@/types/certification'
import { isCertificationActive } from '@/data/certifications'
import { StatusPill } from '@/components/shared/StatusPill'
import { TechBadge } from '@/components/shared/TechBadge'

function formatDate(value: string): string {
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function CertCard({ certification }: { certification: Certification }) {
  const active = isCertificationActive(certification)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-gradient-accent flex size-10 shrink-0 items-center justify-center rounded-xl text-white">
          <ShieldCheck className="size-5" />
        </span>
        <StatusPill
          label={active ? 'Active' : 'Expired'}
          tone={active ? 'success' : 'neutral'}
        />
      </div>

      <div>
        <h3 className="text-base font-semibold tracking-tight">{certification.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Issued {formatDate(certification.issueDate)}
          {certification.expiryDate ? ` · Expires ${formatDate(certification.expiryDate)}` : ''}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {certification.skills.map((skill) => (
          <TechBadge key={skill} label={skill} />
        ))}
      </div>

      {certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Verify credential
          <ExternalLink className="size-3.5" />
        </a>
      ) : null}
    </div>
  )
}
