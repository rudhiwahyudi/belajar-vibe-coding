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
    <div className="card-hover group flex flex-col gap-4 rounded-[20px] border border-border/60 bg-card p-5">
      {cert.coverImage ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-secondary/50">
          <img
            src={cert.coverImage}
            alt={cert.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-secondary/40">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-background ring-1 ring-border/50">
            <Award className="size-5 text-muted-foreground/60" />
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {cert.issuer}
            </p>
            <h3 className="mt-1 line-clamp-2 text-[14.5px] font-[600] leading-snug tracking-tight">
              {cert.title}
            </h3>
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-muted-foreground transition-colors hover:bg-foreground hover:text-background hover:border-foreground"
              aria-label="View credential"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Issued {formatMonth(cert.issuedAt)}
          {cert.expiresAt ? ` · Expires ${formatMonth(cert.expiresAt)}` : ''}
        </p>

        {cert.credentialId && (
          <p className="text-xs text-muted-foreground/70">
            ID: <span className="font-mono text-[11px]">{cert.credentialId}</span>
          </p>
        )}

        {cert.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cert.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
