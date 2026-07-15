import { Link } from 'react-router-dom'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { GradientMesh } from '@/components/shared/GradientMesh'
import { StatusPill } from '@/components/shared/StatusPill'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'
import { useLanguage } from '@/hooks/useLanguage'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <GradientMesh />
      <PageContainer className="flex flex-col items-center gap-6 text-center">
        <FadeIn>
          <StatusPill label={t(`hero.availability.${siteConfig.availability}`)} tone="success" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Hi, I&apos;m {siteConfig.name} —{' '}
            <span className="text-gradient">{t('hero.role')}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t('hero.tagline')}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" render={<Link to="/projects" />}>
            {t('hero.viewProjects')}
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link to="/contact" />}>
            {t('hero.getInTouch')}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer" />}
          >
            <Download className="size-4" />
            {t('hero.resume')}
          </Button>
        </FadeIn>

        <FadeIn delay={0.2} className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {t('hero.location')}
        </FadeIn>
      </PageContainer>
    </section>
  )
}
