import { Hero } from '@/features/home/components/Hero'
import { TechMarquee } from '@/features/home/components/TechMarquee'
import { FeaturedProjects } from '@/features/home/components/FeaturedProjects'
import { JourneyPreview } from '@/features/home/components/JourneyPreview'
import { CertificatesPreview } from '@/features/home/components/CertificatesPreview'
import { BlogPreview } from '@/features/home/components/BlogPreview'
import { ContactCTA } from '@/features/home/components/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <FeaturedProjects />
      <JourneyPreview />
      <CertificatesPreview />
      <BlogPreview />
      <ContactCTA />
    </>
  )
}
