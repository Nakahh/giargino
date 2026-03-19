import { useEffect, useState, useRef } from 'react';

interface ScrollPosition {
  top: number;
  left: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollPercentage: number;
}

interface UseScrollPositionOptions {
  element?: HTMLElement | null;
  debounceMs?: number;
  onScrollChange?: (position: ScrollPosition) => void;
}

/**
 * Hook que rastreia a posição atual do scroll
 * Útil para sincronização de scroll e criação de efeitos parallax
 */
export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const {
    element = null,
    debounceMs = 50,
    onScrollChange,
  } = options;

  const [position, setPosition] = useState<ScrollPosition>({
    top: 0,
    left: 0,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetElementRef = useRef<HTMLElement | null>(element);

  useEffect(() => {
    targetElementRef.current = element || document.getElementById("dashboard-content");
  }, [element]);

  useEffect(() => {
    const container = targetElementRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const scrollLeft = container.scrollLeft;
        const isAtTop = scrollTop === 0;
        const isAtBottom =
          scrollTop + container.clientHeight >= container.scrollHeight - 10;
        const scrollPercentage =
          (scrollTop / (container.scrollHeight - container.clientHeight)) * 100;

        const newPosition: ScrollPosition = {
          top: scrollTop,
          left: scrollLeft,
          isAtTop,
          isAtBottom,
          scrollPercentage: Math.min(scrollPercentage, 100),
        };

        setPosition(newPosition);
        onScrollChange?.(newPosition);
      }, debounceMs);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [debounceMs, onScrollChange]);

  return position;
}
