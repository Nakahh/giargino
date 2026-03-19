import { useEffect, useRef, useState, useCallback } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseScrollSyncOptions {
  threshold?: number;
  rootMargin?: string;
  onSectionChange?: (sectionId: SectionId) => void;
  scrollContainerId?: string;
}

/**
 * Hook que detecta qual seção está visível durante scroll
 * Sincroniza automaticamente com o activeTab
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const {
    threshold = 0.5,
    rootMargin = "0px",
    onSectionChange,
    scrollContainerId = "dashboard-content",
  } = options;

  const [visibleSection, setVisibleSection] = useState<SectionId>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    setVisibleSection(sectionId);
    onSectionChange?.(sectionId);
  }, [onSectionChange]);

  useEffect(() => {
    // Limpar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Encontrar o container scrollável
    const scrollContainer = document.getElementById(scrollContainerId);

    // Criar novo observer com a root correta
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Filtrar apenas as seções que estão intersetando
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Usar a primeira seção visível (a mais próxima do topo)
          const topMostEntry = visibleEntries[0];
          const sectionId = topMostEntry.target.getAttribute("data-section") as SectionId;
          handleSectionChange(sectionId);
        }
      },
      {
        root: scrollContainer,
        threshold,
        rootMargin,
      }
    );

    // Observar todas as seções
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, handleSectionChange, scrollContainerId]);

  return { visibleSection };
}
