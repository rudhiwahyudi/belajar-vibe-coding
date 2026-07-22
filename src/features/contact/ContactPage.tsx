import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { ContactInfoCard } from '@/features/contact/components/ContactInfoCard'
import { useLanguage } from '@/hooks/useLanguage'
import { GradientMesh } from '@/components/shared/GradientMesh'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <GradientMesh className="opacity-30 dark:opacity-40" />
      <PageContainer className="relative z-10 flex flex-col gap-10">
        <SectionHeading
          eyebrow={t('nav.contact')}
          title={t('contact.title')}
          description={t('contact.description')}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <FadeIn className="rounded-2xl border border-white/[0.12] dark:border-white/[0.06] bg-white/[0.03] dark:bg-black/[0.15] backdrop-blur-xl shadow-2xl shadow-black/5 p-6 md:p-8">
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactInfoCard />
          </FadeIn>
        </div>
      </PageContainer>
    </section>
  )
}
