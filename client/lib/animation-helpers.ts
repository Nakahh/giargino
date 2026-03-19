import { Variants } from "framer-motion";

// Durations (em segundos para Framer Motion)
export const motionDurations = {
  micro: 0.15,
  quick: 0.2,
  standard: 0.3,
  slow: 0.6,
  epic: 1.2,
} as const;

// Easing functions
export const motionEasings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeBack: [0.34, 1.56, 0.64, 1] as const,
  easeElastic: [0.22, 1, 0.36, 1] as const,
} as const;

// Entrance presets
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

// Content stagger container
export const contentStaggerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Content stagger item
export const contentItemVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// Pulse animation for icons
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  },
};

// Helper functions
export function createStagger(
  delayChildren: number = 0.1,
  staggerChildren: number = 0.08
) {
  return { delayChildren, staggerChildren };
}

export function createDelay(delay: number) {
  return { delay };
}

// Motion presets object
export const motionPresets = {
  fadeInUp,
  fadeInRight,
  scaleIn,
  slideInLeft,
  slideInRight,
  fadeIn,
  contentStagger: contentStaggerVariants,
  contentItem: contentItemVariants,
  pulse: pulseVariants,
} as const;
