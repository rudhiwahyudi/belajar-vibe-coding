import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CertificateCard } from '@/features/certificates/components/CertificateCard'
import { getAllCertificates } from '@/lib/certificates'
import { cn } from '@/lib/utils'
import type { Certificate } from '@/types/certificate'

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    getAllCertificates().then(setCerts)
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    certs.forEach((c) => c.tags.forEach((t) => set.add(t)))
    return ['All', ...Array.from(set).sort()]
  }, [certs])

  const filtered = useMemo(() => {
    if (activeTag === 'All') return certs
    return certs.filter((c) => c.tags.includes(activeTag))
  }, [certs, activeTag])

  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Certificates"
        title="Credentials & certifications"
        description="Professional certifications and courses I've completed to sharpen my skills."
      />

      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                activeTag === tag
                  ? 'border-primary/40 bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          {certs.length === 0 ? 'No certificates yet.' : 'No certificates match this filter.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
