import { techMarquee } from '@/data/site-config'
import { TechBadge } from '@/components/shared/TechBadge'

export function TechMarquee() {
  const items = [...techMarquee, ...techMarquee]

  return (
    <section className="overflow-hidden border-y border-border/60 py-6">
      <div className="flex w-max animate-marquee gap-3">
        {items.map((tech, index) => (
          <TechBadge key={`${tech}-${index}`} label={tech} className="px-4 py-2 text-sm" />
        ))}
      </div>
    </section>
  )
}
