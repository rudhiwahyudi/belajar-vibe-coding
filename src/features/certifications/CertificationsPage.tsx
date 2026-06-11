import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { CertCard } from '@/features/certifications/components/CertCard'
import { certifications } from '@/data/certifications'
import { cn } from '@/lib/utils'
import type { FocusArea } from '@/types/common'

export default function CertificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FocusArea | 'All'>('All')

  const focusAreas = useMemo(() => {
    const areas = new Set<FocusArea>()
    certifications.forEach((cert) => cert.focusAreas.forEach((area) => areas.add(area)))
    return Array.from(areas)
  }, [])

  const filteredCertifications = useMemo(() => {
    if (activeFilter === 'All') return certifications
    return certifications.filter((cert) => cert.focusAreas.includes(activeFilter))
  }, [activeFilter])

  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials & continuous learning"
        description="Certifications across cloud platforms, DevOps tooling, and AI — proof points for the skills behind the projects on this site."
      />

      <div className="flex flex-wrap gap-2">
        {(['All', ...focusAreas] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveFilter(option)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeFilter === option
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCertifications.map((cert) => (
          <StaggerItem key={cert.id}>
            <CertCard certification={cert} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageContainer>
  )
}
