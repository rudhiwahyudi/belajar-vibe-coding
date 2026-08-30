import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { CertificateCard } from '@/features/certificates/components/CertificateCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { getAllCertificates } from '@/lib/certificates'
import type { Certificate } from '@/types/certificate'
import { useLanguage } from '@/hooks/useLanguage'

export function CertificatesPreview() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    getAllCertificates().then((all) => setCerts(all.slice(0, 3)))
  }, [])

  if (certs.length === 0) return null

  return (
    <section className="section-padding border-t border-border/40">
      <PageContainer className="flex flex-col gap-10">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t('certificates.eyebrow')}
            title={t('certificates.title')}
            description={t('certificates.description')}
          />
          <Button variant="outline" render={<Link to="/certificates" />} className="w-fit shrink-0 rounded-full border-border/60 bg-background px-5 text-[13.5px] font-medium hover:bg-secondary">
            {t('certificates.viewAll')}
            <ArrowRight className="size-3.5" />
          </Button>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <StaggerItem key={cert.id}>
              <CertificateCard cert={cert} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
