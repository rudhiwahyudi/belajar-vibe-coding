import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { CertificateCard } from '@/features/certificates/components/CertificateCard'
import { getAllCertificates } from '@/lib/certificates'
import type { Certificate } from '@/types/certificate'

export function CertificatesPreview() {
  const [certs, setCerts] = useState<Certificate[]>([])

  useEffect(() => {
    getAllCertificates().then((all) => setCerts(all.slice(0, 3)))
  }, [])

  if (certs.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Certificates"
            title="Credentials & certifications"
            description="A selection of professional certifications and courses I've completed."
          />
          <Button variant="outline" render={<Link to="/certificates" />}>
            View all
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
