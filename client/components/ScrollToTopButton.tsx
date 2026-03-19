import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollToTopButtonProps {
  showThreshold?: number;
  className?: string;
}

/**
 * Botão scroll-to-top animado
 * Aparece quando scroll > threshold
 */
export function ScrollToTopButton({
  showThreshold = 300,
  className = "",
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("dashboard-content");
    if (!container) return;

    const handleScroll = () => {
      setIsVisible(container.scrollTop > showThreshold);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [showThreshold]);

  const scrollToTop = () => {
    const container = document.getElementById("dashboard-content");
    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const variants = {
    initial: { opacity: 0, scale: 0, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, scale: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={scrollToTop}
          className={`
            fixed bottom-32 md:bottom-8 right-4 md:right-8
            w-12 h-12 md:w-14 md:h-14
            rounded-full
            bg-gradient-to-br from-amber-400 to-amber-600
            text-white
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            z-40
            ${className}
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
