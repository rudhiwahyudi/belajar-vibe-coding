import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { ContactInfoCard } from '@/features/contact/components/ContactInfoCard'

export default function ContactPage() {
  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Whether it's a role, a project, a collaboration, or a question about my MEXT scholarship journey — I'd love to hear from you."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <FadeIn className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1}>
          <ContactInfoCard />
        </FadeIn>
      </div>
    </PageContainer>
  )
}
