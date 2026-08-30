import { cn } from '@/lib/utils'

interface GradientMeshProps {
  className?: string
}

/**
 * Large, blurred radial gradient blobs used behind hero/CTA sections.
 * Purely decorative — hidden from assistive tech.
 */
export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div className="absolute left-1/2 top-[-8%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--brand-accent-from)_0%,transparent_70%)] opacity-[0.07] blur-3xl" />
      <div className="absolute right-[-8%] top-1/4 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,var(--brand-accent-to)_0%,transparent_70%)] opacity-[0.06] blur-3xl" />
    </div>
  )
}
