import type { Transition, Variants } from 'framer-motion'

export const premiumEase = [0.16, 1, 0.3, 1] as const
export const premiumEaseSoft = [0.22, 1, 0.36, 1] as const

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: premiumEaseSoft,
}

export const slowTransition: Transition = {
  duration: 0.8,
  ease: premiumEaseSoft,
}

export const hoverTransition: Transition = {
  duration: 0.35,
  ease: premiumEaseSoft,
}

export const revealViewport = {
  once: true,
  amount: 0.18,
  margin: '-5% 0px -5% 0px',
}

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) =>
  ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }) satisfies Variants

export const revealUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
} satisfies Variants

export const revealUpSoft = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: slowTransition,
  },
} satisfies Variants

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: slowTransition,
  },
} satisfies Variants
