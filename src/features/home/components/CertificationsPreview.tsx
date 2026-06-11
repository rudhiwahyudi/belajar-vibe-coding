import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { CertCard } from '@/features/certifications/components/CertCard'
import { getActiveCertifications } from '@/data/certifications'

export function CertificationsPreview() {
  const certifications = getActiveCertifications().slice(0, 3)

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials & continuous learning"
            description="Cloud, DevOps, and AI certifications that back up the skills behind these projects."
          />
          <Button variant="outline" render={<Link to="/certifications" />}>
            View all certifications
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem key={cert.id}>
              <CertCard certification={cert} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}
