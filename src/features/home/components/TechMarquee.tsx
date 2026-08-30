import { techMarquee } from '@/data/site-config'

export function TechMarquee() {
  const items = [...techMarquee, ...techMarquee]

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-card py-3" aria-label="Expertise">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-card to-transparent md:w-20" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card to-transparent md:w-20" aria-hidden />
      {/* Differentiated: minimal text ticker with separators, not colorful icon pills like reference */}
      <div className="flex w-max animate-marquee items-center gap-0">
        {items.map((tech, index) => (
          <span key={`${tech}-${index}`} className="inline-flex items-center gap-3 px-4">
            <span className="text-[13px] font-[450] tracking-tight text-muted-foreground whitespace-nowrap">{tech}</span>
            <span className="text-border" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
