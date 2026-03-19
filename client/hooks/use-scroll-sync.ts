import { useEffect, useRef, useState } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseScrollSyncOptions {
  threshold?: number;
  rootMargin?: string;
  onSectionChange?: (sectionId: SectionId) => void;
}

/**
 * Hook que detecta qual seção está visível durante scroll
 * Sincroniza automaticamente com o activeTab
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const {
    threshold = 0.3,
    rootMargin = "-50px 0px -50% 0px",
    onSectionChange,
  } = options;

  const [visibleSection, setVisibleSection] = useState<SectionId>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Limpar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Criar novo observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace("tab-", "") as SectionId;
            setVisibleSection(sectionId);
            onSectionChange?.(sectionId);
          }
        });
      },
      {
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
  }, [threshold, rootMargin, onSectionChange]);

  return { visibleSection };
}
