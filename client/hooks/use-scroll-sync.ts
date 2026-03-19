import { useEffect, useRef, useState, useCallback } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseScrollSyncOptions {
  threshold?: number | number[];
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
    threshold = [0.1, 0.5],
    rootMargin = "-50px 0px -50% 0px",
    onSectionChange,
    scrollContainerId = "dashboard-content",
  } = options;

  const [visibleSection, setVisibleSection] = useState<SectionId>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleSectionsRef = useRef<Set<string>>(new Set());

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    if (visibleSection !== sectionId) {
      setVisibleSection(sectionId);
      onSectionChange?.(sectionId);
    }
  }, [visibleSection, onSectionChange]);

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
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section") as SectionId;

          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(sectionId);
          } else {
            visibleSectionsRef.current.delete(sectionId);
          }
        });

        // Encontrar a seção mais visível (primeira na lista de visíveis)
        if (visibleSectionsRef.current.size > 0) {
          // Pegar a primeira seção visível na ordem de renderização
          const allSections = document.querySelectorAll("[data-section]");
          for (const section of allSections) {
            const sectionId = section.getAttribute("data-section") as SectionId;
            if (visibleSectionsRef.current.has(sectionId)) {
              handleSectionChange(sectionId);
              break;
            }
          }
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
      visibleSectionsRef.current.clear();
    };
  }, [threshold, rootMargin, handleSectionChange, scrollContainerId]);

  return { visibleSection };
}
