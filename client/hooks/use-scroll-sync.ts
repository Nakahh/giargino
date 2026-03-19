import { useEffect, useRef, useState } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseScrollSyncOptions {
  onSectionChange?: (sectionId: SectionId) => void;
  scrollContainerId?: string;
  offset?: number;
  threshold?: number | number[]; 
  rootMargin?: string;
}

/**
 * Hook que detecta qual seção está visível durante scroll
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const {
    onSectionChange,
    scrollContainerId = "dashboard-content",
  } = options;

  const [visibleSection, setVisibleSection] = useState<SectionId>("overview");
  const lastSectionRef = useRef<SectionId>("overview");

  useEffect(() => {
    const container = document.getElementById(scrollContainerId);

    if (!container) {
      console.error('Container not found:', scrollContainerId);
      return;
    }

    console.log('✅ Container found, starting scroll sync');

    const detectVisibleSection = () => {
      const sections = Array.from(document.querySelectorAll("[data-section]")) as HTMLElement[];

      if (sections.length === 0) {
        console.warn('No sections found with [data-section]');
        return;
      }

      console.log('📊 Sections found:', sections.length, sections.map(s => s.getAttribute("data-section")));

      // Usar o scroll position do container
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const triggerPoint = scrollTop + 100; // Ponto de referência (100px do topo)

      let nearestSection: SectionId = "overview";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        // Posição relativa ao container
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Verificar se a seção está visível
        const isInView = sectionBottom > scrollTop && sectionTop < scrollTop + containerHeight;

        if (isInView) {
          // Distância do ponto de referência ao início da seção
          const distance = Math.abs(sectionTop - triggerPoint);

          if (distance < closestDistance) {
            closestDistance = distance;
            nearestSection = section.getAttribute("data-section") as SectionId;
          }
        }
      });

      // Se nenhuma está visível, usar a primeira que está abaixo
      if (closestDistance === Infinity) {
        for (const section of sections) {
          if (section.offsetTop >= scrollTop + containerHeight) {
            nearestSection = section.getAttribute("data-section") as SectionId;
            break;
          }
        }
      }

      // Atualizar apenas se mudou
      if (nearestSection !== lastSectionRef.current) {
        console.log('🎯 Section changed:', lastSectionRef.current, '→', nearestSection);
        lastSectionRef.current = nearestSection;
        setVisibleSection(nearestSection);
        onSectionChange?.(nearestSection);
      } else {
        console.log('📍 Current section (no change):', nearestSection);
      }
    };

    // Executar imediatamente
    detectVisibleSection();

    // Listener de scroll
    const handleScroll = () => {
      requestAnimationFrame(detectVisibleSection);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerId, onSectionChange]);

  return { visibleSection };
}
