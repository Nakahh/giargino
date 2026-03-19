import { useRef, useEffect } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

const SECTION_ORDER: SectionId[] = [
  "overview",
  "revenue",
  "costs",
  "hr",
  "viability",
  "project",
];

interface UseSwipeOptions {
  threshold?: number;
  onSwipeLeft?: (nextSection: SectionId) => void;
  onSwipeRight?: (prevSection: SectionId) => void;
  currentSection?: SectionId;
}

/**
 * Hook que detecta swipe left/right no mobile
 * Navega automaticamente para a seção anterior/próxima
 */
export function useMobileGestures(options: UseSwipeOptions = {}) {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    currentSection = "overview",
  } = options;

  const touchStartRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Detectar se é mobile
    isMobileRef.current = window.innerWidth < 768;

    if (!isMobileRef.current) return;

    const container = document.getElementById("dashboard-content");
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchStartRef.current.x - touchEnd.x;
      const deltaY = Math.abs(touchStartRef.current.y - touchEnd.y);

      // Validar se é um swipe horizontal (não vertical)
      if (Math.abs(deltaX) > threshold && deltaY < threshold) {
        const currentIndex = SECTION_ORDER.indexOf(currentSection);

        if (deltaX > 0) {
          // Swipe left - próxima seção
          if (currentIndex < SECTION_ORDER.length - 1) {
            const nextSection = SECTION_ORDER[currentIndex + 1];
            onSwipeLeft?.(nextSection);
          }
        } else {
          // Swipe right - seção anterior
          if (currentIndex > 0) {
            const prevSection = SECTION_ORDER[currentIndex - 1];
            onSwipeRight?.(prevSection);
          }
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, false);
    container.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [threshold, onSwipeLeft, onSwipeRight, currentSection]);

  return { touchStartRef, isMobileRef };
}
