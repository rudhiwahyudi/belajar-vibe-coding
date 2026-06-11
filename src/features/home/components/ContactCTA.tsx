import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { GradientMesh } from '@/components/shared/GradientMesh'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <PageContainer>
        <FadeIn className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border px-6 py-16 text-center md:px-12">
          <GradientMesh />
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Have a role, project, or question in mind?{' '}
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            {siteConfig.shortBio}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/contact" />}>
              Get in touch
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<a href={`mailto:${siteConfig.email}`} />}>
              <Mail className="size-4" />
              {siteConfig.email}
            </Button>
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  )
}
