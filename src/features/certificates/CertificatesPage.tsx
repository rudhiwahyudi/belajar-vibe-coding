import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CertificateCard } from '@/features/certificates/components/CertificateCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { getAllCertificates } from '@/lib/certificates'
import { cn } from '@/lib/utils'
import type { Certificate } from '@/types/certificate'
import { useLanguage } from '@/hooks/useLanguage'

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [activeTag, setActiveTag] = useState('All')
  const { t } = useLanguage()

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
      <FadeIn>
        <SectionHeading
          eyebrow={t('certificatesPage.eyebrow')}
          title={t('certificatesPage.title')}
          description={t('certificatesPage.description')}
        />
      </FadeIn>

      {allTags.length > 1 && (
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  activeTag === tag
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground',
                )}
              >
                {tag === 'All' ? t('certificatesPage.filterAll') : tag}
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {filtered.length === 0 ? (
        <FadeIn>
          <p className="py-16 text-center text-muted-foreground">
            {certs.length === 0 ? t('certificatesPage.noCertificatesYet') : t('certificatesPage.noCertificatesMatch')}
          </p>
        </FadeIn>
      ) : (
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert) => (
            <StaggerItem key={cert.id}>
              <CertificateCard cert={cert} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </PageContainer>
  )
}
