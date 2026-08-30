import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
}

export function FadeIn({ delay = 0, transition, children, ...props }: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px', amount: 0.2 }}
      variants={fadeInUp}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1], ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
