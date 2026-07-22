import { Link } from 'react-router-dom'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { GradientMesh } from '@/components/shared/GradientMesh'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'
import { useLanguage } from '@/hooks/useLanguage'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <GradientMesh />

      <PageContainer className="flex flex-col items-center gap-6 text-center">
        {/* Primary Title */}
        <FadeIn delay={0.05}>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Hi, I&apos;m {siteConfig.name}{' '}
            <span className="text-gradient block mt-1 sm:inline sm:mt-0 font-extrabold">{t('hero.role')}</span>
          </h1>
        </FadeIn>

        {/* Description / Tagline */}
        <FadeIn delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            {t('hero.tagline')}
          </p>
        </FadeIn>

        {/* Actions Button Group */}
        <FadeIn delay={0.15} className="flex flex-wrap items-center justify-center gap-3">
          <Button 
            size="lg" 
            render={<Link to="/projects" />} 
            className="group/btn relative overflow-hidden transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-indigo-500/20"
          >
            {t('hero.viewProjects')}
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            render={<Link to="/contact" />} 
            className="transition-all hover:scale-105 active:scale-95 hover:bg-muted dark:border-zinc-800 dark:hover:bg-zinc-900/50"
          >
            {t('hero.getInTouch')}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer" />}
            className="transition-all hover:scale-105 active:scale-95 gap-2"
          >
            <Download className="size-4" />
            {t('hero.resume')}
          </Button>
        </FadeIn>

        {/* Location Badge */}
        <FadeIn delay={0.2} className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <MapPin className="size-4 text-rose-500" />
          {t('hero.location')}
        </FadeIn>
      </PageContainer>
    </section>
  )
}


