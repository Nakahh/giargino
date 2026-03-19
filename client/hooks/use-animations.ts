import { Variants } from "framer-motion";

// Animações para entrada de elementos
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

// Animações para cards com efeito 3D
export const cardHoverVariants: Variants = {
  initial: { rotateY: 0, z: 0 },
  whileHover: {
    rotateY: 5,
    z: 10,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
  },
};

// Animação para seções ao entrar na viewport
export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

// Animação para container com stagger
export const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Animação para item individual em container
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

// Animação de pulse para elementos em destaque
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Animação de shimmer (carregamento)
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 0%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Hook para usar stagger automático
export function useStaggerAnimation(itemCount: number, delay = 0) {
  return {
    container: containerVariants,
    item: {
      ...itemVariants,
      transition: { ...itemVariants.animate?.transition, delay },
    },
  };
}

// ============================================
// NOVOS 13 VARIANTS - FASE 2 DESIGN PREMIUM
// ============================================

// 1. Page Transition - Blur + Scale + Fade para transição entre abas
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, backdropFilter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.23, 1, 0.320, 1] },
  },
  exit: { opacity: 0, scale: 0.95, backdropFilter: "blur(10px)", transition: { duration: 0.3 } },
};

// 2. Section Reveal - Parallax + Blur-in para revelação de seções
export const sectionRevealVariants: Variants = {
  initial: { opacity: 0, y: 60, backdropFilter: "blur(20px)" },
  animate: {
    opacity: 1,
    y: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// 3. Flip Card Animation - 3D flip para KPI cards
export const flipCardVariants: Variants = {
  initial: { rotateY: 0, opacity: 1 },
  whileHover: {
    rotateY: 180,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  whileTap: { rotateY: 180 },
};

// 4. Content Stagger - Stagger ordenado para listas/grids
export const contentStaggerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const contentItemVariants: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// 5. Tab Transition - Smooth tab switching com fade + slide
export const tabTransitionVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// 6. Tap Feedback - Scale feedback para elementos tappáveis
export const tapFeedbackVariants: Variants = {
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.15 },
  },
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

// 7. Pull to Refresh Animation
export const pullToRefreshVariants: Variants = {
  initial: { scale: 0, opacity: 0, rotate: 0 },
  animate: (custom) => ({
    scale: custom > 0.5 ? 1 : custom,
    opacity: custom > 0 ? 1 : 0,
    rotate: custom > 0 ? 360 : 0,
    transition: { duration: 0.5, ease: "easeOut" },
  }),
  release: {
    scale: 1,
    opacity: 1,
    rotate: 360,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// 8. Toast Notification Animation
export const toastVariants: Variants = {
  initial: { opacity: 0, y: 20, x: 20 },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    x: 20,
    transition: { duration: 0.2 },
  },
};

// 9. Skeleton Loading Shimmer
export const skeletonShimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["200% 0%", "-200% 0%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// 10. Success State Animation - Checkmark com bounce
export const successStateVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      times: [0, 0.6, 1],
    },
  },
};

// 11. Error State Animation - Shake com fade
export const errorStateVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      x: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
};

// 12. Glassmorphism Backdrop Fade
export const glassmorphismVariants: Variants = {
  initial: { backdropFilter: "blur(0px)", opacity: 0 },
  animate: {
    backdropFilter: "blur(10px)",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    backdropFilter: "blur(0px)",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// 13. Micro-interactions Hover - Glow + Lift combo
export const microInteractionVariants: Variants = {
  initial: { y: 0, boxShadow: "0 0 0px rgba(0,0,0,0)" },
  whileHover: {
    y: -4,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    y: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};
