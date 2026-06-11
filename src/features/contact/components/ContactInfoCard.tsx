import { MapPin, Mail, GraduationCap } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { StatusPill } from '@/components/shared/StatusPill'
import { SocialLinks } from '@/features/contact/components/SocialLinks'
import { AVAILABILITY_LABEL } from '@/lib/availability'

export function ContactInfoCard() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
      <StatusPill label={AVAILABILITY_LABEL[siteConfig.availability]} tone="success" />

      <p className="text-sm text-muted-foreground">{siteConfig.shortBio}</p>

      <div className="flex flex-col gap-3 text-sm">
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail className="size-4" />
          {siteConfig.email}
        </a>
        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="size-4" />
          {siteConfig.location}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <GraduationCap className="size-4" />
          Preparing for MEXT Scholarship
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Find me online
        </h3>
        <SocialLinks />
      </div>
    </div>
  )
}
