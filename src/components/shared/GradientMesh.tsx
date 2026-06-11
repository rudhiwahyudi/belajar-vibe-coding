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
      <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--brand-accent-from)_0%,transparent_70%)] opacity-25 blur-3xl" />
      <div className="absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,var(--brand-accent-to)_0%,transparent_70%)] opacity-20 blur-3xl" />
    </div>
  )
}
