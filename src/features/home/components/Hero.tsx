import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/data/site-config'
import { useLanguage } from '@/hooks/useLanguage'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import fotoProfile from '@/assets/foto_profile.jpg'

const TYPEWRITER_ROLES = ['System Analyst', 'Business Analyst', 'Quality Control'] as const

function RoleTypewriterBadge() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [display, setDisplay] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    const currentRole = TYPEWRITER_ROLES[roleIndex]
    let timeoutId: number

    if (!isDeleting && display === currentRole) {
      // Pause after completing role: 1500–1800ms (use 1600ms)
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1600)
    } else if (isDeleting && display === '') {
      // Pause when only "|" remains before next role: 400–600ms (use 500ms)
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % TYPEWRITER_ROLES.length)
      }, 500)
    } else {
      const nextDisplay = isDeleting
        ? currentRole.slice(0, display.length - 1)
        : currentRole.slice(0, display.length + 1)
      // Slower, natural: typing 120–150ms, deleting 80–110ms with subtle variation
      const delay = isDeleting ? 80 + Math.random() * 30 : 120 + Math.random() * 30
      timeoutId = window.setTimeout(() => setDisplay(nextDisplay), delay)
    }

    return () => window.clearTimeout(timeoutId)
  }, [display, roleIndex, isDeleting, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <span
        className="mt-3 block h-[28px] w-[200px] max-w-full shrink-0 self-start relative overflow-hidden whitespace-nowrap md:h-[30px] md:w-[210px]"
        aria-label={TYPEWRITER_ROLES[0]}
      >
        {/* Fixed outer layout box — reserves space permanently */}
        <span className="absolute inset-0 flex items-center justify-start whitespace-nowrap text-[15px] font-[600] leading-none tracking-tight text-foreground md:text-[16px]">
          {TYPEWRITER_ROLES[0]}
        </span>
        {/* Invisible sizer — guarantees width for longest role, never visible */}
        <span aria-hidden className="invisible block whitespace-nowrap text-[15px] font-[600] leading-none md:text-[16px]">
          Business Analyst|
        </span>
      </span>
    )
  }

  const currentRole = TYPEWRITER_ROLES[roleIndex]
  const isPaused = (!isDeleting && display === currentRole) || (isDeleting && display === '')

  return (
    <span
      className="mt-3 block h-[28px] w-[200px] max-w-full shrink-0 self-start relative overflow-hidden whitespace-nowrap md:h-[30px] md:w-[210px]"
      aria-live="polite"
      aria-label={display || currentRole}
    >
      {/* Invisible sizer — reserves fixed width/height for longest role, out of visual flow but keeps layout stable */}
      <span aria-hidden className="invisible flex h-full w-full items-center whitespace-nowrap text-[15px] font-[600] leading-none tracking-tight md:text-[16px]">
        Business Analyst|
      </span>
      {/* Fixed badge — absolute, does not affect parent dimensions */}
      <span className="absolute inset-0 flex items-center justify-start overflow-hidden whitespace-nowrap text-[15px] font-[600] leading-none tracking-tight text-foreground md:text-[16px]">
        {/* Animated text — absolutely positioned inside fixed badge, never controls layout */}
        <span className="inline-flex items-center whitespace-nowrap leading-none">
          <span className="whitespace-nowrap leading-none">{display}</span>
          <motion.span
            aria-hidden
            className="ml-[1px] inline-block font-normal leading-none text-foreground/80"
            animate={isPaused ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
            transition={
              isPaused
                ? { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'stepEnd' }
                : { duration: 0.15 }
            }
          >
            |
          </motion.span>
        </span>
      </span>
    </span>
  )
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      {/* Differentiated background: subtle dotted grid + soft radial — not same as reference grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,color-mix(in_oklch,var(--brand-accent-solid)_6%,transparent),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <PageContainer className="flex flex-col gap-8 py-10 md:flex-row md:items-stretch md:gap-12 md:py-12 lg:gap-12 lg:py-14">
        {/* Left: content — compact hierarchy: Name → Role → Value prop → CTA */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4 text-left">
          <FadeIn delay={0.06} className="flex flex-col gap-2">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Welcome, I Am</p>
            <h1 className="max-w-[560px] text-balance text-[32px] font-[700] leading-[0.95] tracking-[-0.03em] md:text-[44px] lg:text-[48px]">
              <span className="block">{siteConfig.name}</span>
              <RoleTypewriterBadge />
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="max-w-[480px] text-pretty text-[14.5px] leading-[1.6] text-muted-foreground md:text-[15px]">
              I bridge business requirements and technical solutions to build effective digital systems.
            </p>
          </FadeIn>

          <FadeIn delay={0.14} className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              size="lg"
              render={<Link to="/projects" />}
              className="h-11 min-h-[44px] rounded-full bg-foreground px-7 text-[14px] font-medium text-background hover:bg-foreground/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore My Work
              <ArrowRight className="size-3.5" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link to="/contact" />}
              className="h-11 min-h-[44px] rounded-full border-border/60 bg-card px-7 text-[14px] font-medium hover:bg-secondary active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Contact Me
            </Button>

          </FadeIn>

          <FadeIn delay={0.18} className="flex items-center gap-1.5 pt-0.5 text-xs text-muted-foreground/70" aria-label="Yogyakarta - Indonesia">
            <MapPin className="size-3.5" aria-hidden />
            Yogyakarta - Indonesia
          </FadeIn>
        </div>

        {/* Right: photo — height matches left column: top aligns with Welcome, bottom with location */}
        <FadeIn delay={0.12} className="relative mx-auto flex w-full max-w-[200px] shrink-0 sm:max-w-[220px] md:mx-0 md:ml-auto md:max-w-[300px] md:self-stretch lg:max-w-[340px]">
          <div className="relative flex h-full w-full overflow-hidden rounded-[16px] border border-border/60 bg-card shadow-sm">
            <img
              src={fotoProfile}
              alt={siteConfig.name}
              className="aspect-[4/5] w-full object-cover object-top md:aspect-auto md:h-full md:w-full"
              loading="eager"
            />
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  )
}


