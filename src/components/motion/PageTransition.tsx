import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  )
}
