import { useRef, useEffect } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseAutoScrollOptions {
  scrollBehavior?: ScrollBehavior;
  offset?: number;
}

/**
 * Hook que fornece função para fazer scroll automático entre seções
 * Usado quando o usuário clica em uma aba
 */
export function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const {
    scrollBehavior = "smooth",
    offset = 0,
  } = options;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById("dashboard-content") as HTMLDivElement;
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const section = document.getElementById(`tab-${sectionId}`);
    if (!section || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const sectionTop = section.offsetTop;
    const scrollTarget = sectionTop - offset;

    container.scrollTo({
      top: scrollTarget,
      behavior: scrollBehavior,
    });
  };

  const scrollToActiveTab = () => {
    const activeButton = document.querySelector(
      "[data-active-tab='true']"
    ) as HTMLButtonElement;
    
    if (!activeButton || !scrollContainerRef.current) return;

    activeButton.scrollIntoView({
      behavior: scrollBehavior,
      block: "nearest",
      inline: "center",
    });
  };

  return {
    scrollToSection,
    scrollToActiveTab,
    scrollContainerRef,
  };
}
