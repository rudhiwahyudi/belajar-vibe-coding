import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function StaggerGroup({ children, ...props }: HTMLMotionProps<'div'>) {
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
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  )
}
