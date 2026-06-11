import { Link } from 'react-router-dom'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { GradientMesh } from '@/components/shared/GradientMesh'
import { StatusPill } from '@/components/shared/StatusPill'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'
import { AVAILABILITY_LABEL } from '@/lib/availability'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <GradientMesh />
      <PageContainer className="flex flex-col items-center gap-6 text-center">
        <FadeIn>
          <StatusPill label={AVAILABILITY_LABEL[siteConfig.availability]} tone="success" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Hi, I&apos;m {siteConfig.name} —{' '}
            <span className="text-gradient">{siteConfig.role}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            {siteConfig.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" render={<Link to="/projects" />}>
            View projects
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link to="/contact" />}>
            Get in touch
          </Button>
          <Button
            size="lg"
            variant="ghost"
            render={<a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer" />}
          >
            <Download className="size-4" />
            Résumé
          </Button>
        </FadeIn>

        <FadeIn delay={0.2} className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {siteConfig.location}
        </FadeIn>
      </PageContainer>
    </section>
  )
}
