import { useEffect, useState } from 'react'
import { Download, Printer, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { PageContainer } from '@/components/layout/PageContainer'
import { getResume } from '@/lib/resume'
import { TechBadge } from '@/components/shared/TechBadge'
import type { Resume } from '@/types/resume'

function ContactLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ElementType
  label: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="size-3.5 shrink-0" />
      <span>{label}</span>
    </a>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-border pb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}

export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getResume()
      .then(setResume)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <PageContainer className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl animate-pulse space-y-4 rounded-xl border border-border bg-card px-8 py-10">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
      </PageContainer>
    )
  }

  if (!resume) {
    return (
      <PageContainer className="py-12 md:py-20">
        <p className="text-center text-muted-foreground">Resume not available.</p>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="py-12 md:py-20">
      {/* Action bar */}
      <div className="mb-8 flex items-center justify-end gap-2 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <Printer className="size-3.5" />
          Print
        </button>
        {resume.pdfUrl && (
          <a
            href={resume.pdfUrl}
            download
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="size-3.5" />
            Download PDF
          </a>
        )}
      </div>

      {/* CV content */}
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card px-8 py-10 shadow-sm print:rounded-none print:border-none print:px-0 print:shadow-none">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{resume.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{resume.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {resume.email && (
              <ContactLink href={`mailto:${resume.email}`} icon={Mail} label={resume.email} />
            )}
            {resume.phone && (
              <ContactLink href={`tel:${resume.phone}`} icon={Phone} label={resume.phone} />
            )}
            {resume.location && (
              <ContactLink href="#" icon={MapPin} label={resume.location} />
            )}
            {resume.website && (
              <ContactLink
                href={resume.website}
                icon={Globe}
                label={resume.website.replace(/^https?:\/\//, '')}
              />
            )}
            {resume.linkedin && (
              <ContactLink
                href={resume.linkedin}
                icon={LinkedinIcon}
                label={resume.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              />
            )}
            {resume.github && (
              <ContactLink
                href={resume.github}
                icon={GithubIcon}
                label={resume.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              />
            )}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <section className="mb-8">
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-muted-foreground">{resume.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-6">
              {resume.experience.map((exp, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-semibold">{exp.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {exp.organization}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="mt-1 flex flex-col gap-1">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="mt-0.5 shrink-0 text-primary">–</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-8">
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col gap-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="flex flex-wrap items-start justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-semibold">{edu.degree}</h3>
                    <p className="text-xs text-muted-foreground">{edu.institution}</p>
                    {edu.note && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{edu.note}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-col gap-3">
              {resume.skills.map((group, i) => (
                <div key={i} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
                  <span className="w-36 shrink-0 text-xs font-medium text-foreground">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.split(',').map((s) => s.trim()).filter(Boolean).map((skill) => (
                      <TechBadge key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  )
}
