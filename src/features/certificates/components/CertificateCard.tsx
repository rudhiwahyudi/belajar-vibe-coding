import { ExternalLink, Award } from 'lucide-react'
import type { Certificate } from '@/types/certificate'
import { TechBadge } from '@/components/shared/TechBadge'

function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
      {cert.coverImage ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={cert.coverImage}
            alt={cert.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-muted/50">
          <Award className="size-10 text-muted-foreground/40" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {cert.issuer}
            </p>
            <h3 className="mt-0.5 text-base font-semibold leading-snug tracking-tight">
              {cert.title}
            </h3>
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="View credential"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Issued {formatMonth(cert.issuedAt)}
          {cert.expiresAt ? ` · Expires ${formatMonth(cert.expiresAt)}` : ''}
        </p>

        {cert.credentialId && (
          <p className="text-xs text-muted-foreground">
            ID: <span className="font-mono">{cert.credentialId}</span>
          </p>
        )}

        {cert.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {cert.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
