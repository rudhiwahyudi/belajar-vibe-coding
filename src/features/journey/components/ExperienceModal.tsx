import { Calendar, ChevronRight, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { modalStaggerContainer, modalStaggerItem } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { JourneyItem } from '@/types/journey'

function formatRange(start: string, end?: string): string {
  const fmt = (v: string) => {
    const [y, m] = v.split('-')
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`
}

interface ExperienceModalProps {
  item: JourneyItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  layoutId?: string
}

export function ExperienceModal({ item, open, onOpenChange, layoutId }: ExperienceModalProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  if (!item) return null

  // Shared layout: card → modal continuity via layoutId
  const contentId = layoutId ? `exp-${layoutId}` : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[85vh] w-full max-w-[560px] overflow-hidden rounded-[16px] border-0 bg-white p-0 shadow-2xl gap-0 sm:max-w-[560px] dark:bg-card"
        aria-describedby={undefined}
      >
        <motion.div
          layoutId={prefersReducedMotion ? undefined : contentId}
          transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.8 }}
          className="relative flex max-h-[85vh] flex-col overflow-y-auto"
          style={{ willChange: 'transform' }}
        >
          {/* Header — date pill */}
          <motion.div
            variants={prefersReducedMotion ? undefined : modalStaggerItem}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'visible'}
            className="flex items-start justify-between gap-4 px-6 pt-6"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Calendar className="size-3" aria-hidden />
              {formatRange(item.range.start, item.range.end)}
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? undefined : modalStaggerContainer}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'visible'}
            exit={prefersReducedMotion ? undefined : 'hidden'}
            className="flex flex-col gap-4 px-6 pb-6 pt-4"
          >
            <DialogTitle className="sr-only">{item.organization} — {item.title}</DialogTitle>

            <motion.div variants={prefersReducedMotion ? undefined : modalStaggerItem} className="flex flex-col gap-1">
              <h3 className="text-[20px] font-[700] tracking-tight text-blue-600 dark:text-blue-400">{item.organization}</h3>
              <p className="text-[13.5px] font-[450] leading-snug text-muted-foreground">{item.title}{item.location ? ` · ${item.location}` : ''}</p>
            </motion.div>

            {item.tags && item.tags.length > 0 ? (
              <motion.div variants={prefersReducedMotion ? undefined : modalStaggerItem} className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </motion.div>
            ) : null}

            <motion.p variants={prefersReducedMotion ? undefined : modalStaggerItem} className="text-[13.5px] font-[600] leading-relaxed text-foreground">{item.description}</motion.p>

            {item.bullets.length > 0 ? (
              <motion.ul variants={prefersReducedMotion ? undefined : modalStaggerContainer} className="flex flex-col gap-3">
                {item.bullets.map((bullet) => (
                  <motion.li key={bullet} variants={prefersReducedMotion ? undefined : modalStaggerItem} className="flex gap-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    <ChevronRight className="mt-[3px] size-3.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
