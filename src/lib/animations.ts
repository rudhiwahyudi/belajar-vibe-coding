import type { Variants, Transition } from 'framer-motion'

// Motion language — reference video: smooth, continuous, origin-aware
// Easing: easeOut [0.22, 1, 0.36, 1] — soft deceleration, no bounce
// Durations: micro 200-300ms, entrance 400-500ms, exit 200ms, stagger 60-80ms
export const easeOut: Transition['ease'] = [0.22, 1, 0.36, 1]
export const easeInOut: Transition['ease'] = [0.4, 0, 0.2, 1]
export const easeEmphasized: Transition['ease'] = [0.2, 0, 0, 1]

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2, ease: easeOut },
  },
}

// Modal — origin-aware FLIP + backdrop blur
export const modalOverlay: Variants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: { duration: 0.32, ease: easeOut },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.24, ease: easeOut },
  },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 12,
    transition: { duration: 0.26, ease: easeOut },
  },
}

export const modalStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.12,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
}

export const modalStaggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.18, ease: easeOut },
  },
}
