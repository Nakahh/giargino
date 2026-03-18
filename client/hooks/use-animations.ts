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
