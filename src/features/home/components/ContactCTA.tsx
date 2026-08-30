import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'
import { useLanguage } from '@/hooks/useLanguage'

export function ContactCTA() {
  const { t } = useLanguage()

  return (
    <section className="section-padding border-t border-border/40">
      <PageContainer>
        <FadeIn className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] border border-border/60 bg-card px-6 py-14 text-center shadow-sm md:px-12 md:py-16">
          {/* subtle glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,color-mix(in_oklch,var(--brand-accent-solid)_6%,transparent),transparent_60%)]" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium tracking-tight text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Available for new opportunities
          </span>
          <h2 className="max-w-2xl text-balance text-[26px] font-[600] leading-tight tracking-[-0.02em] md:text-[34px]">
            {t('contactCTA.title')}{' '}
            <span className="font-normal text-muted-foreground">{t('contactCTA.subtitle')}</span>
          </h2>
          <p className="max-w-xl text-pretty text-[14.5px] leading-relaxed text-muted-foreground md:text-[15px]">
            {t('bio.shortBio')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Button size="lg" render={<Link to="/contact" />} className="h-10 rounded-full bg-foreground px-6 text-[14px] font-medium text-background hover:bg-foreground/90">
              {t('contactCTA.getInTouch')}
              <ArrowRight className="size-3.5" />
            </Button>
            <Button size="lg" variant="outline" render={<a href={`mailto:${siteConfig.email}`} />} className="h-10 rounded-full border-border/60 bg-background px-5 text-[13.5px] font-medium hover:bg-secondary">
              <Mail className="size-3.5" />
              {siteConfig.email}
            </Button>
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  )
}
