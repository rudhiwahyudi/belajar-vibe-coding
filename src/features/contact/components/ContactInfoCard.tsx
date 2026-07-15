import { MapPin, Mail, Briefcase } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { StatusPill } from '@/components/shared/StatusPill'
import { SocialLinks } from '@/features/contact/components/SocialLinks'
import { useLanguage } from '@/hooks/useLanguage'

export function ContactInfoCard() {
  const { t } = useLanguage()
  const isEn = t('nav.search') === 'Search'

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
      <StatusPill label={t(`hero.availability.${siteConfig.availability}`)} tone="success" />

      <p className="text-sm text-muted-foreground">{t('bio.shortBio')}</p>

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
          {t('hero.location')}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Briefcase className="size-4" />
          {isEn ? 'System Analyst at Astra Credit Companies' : 'System Analyst di Astra Credit Companies'}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {isEn ? 'Find me online' : 'Temukan saya di internet'}
        </h3>
        <SocialLinks />
      </div>
    </div>
  )
}
