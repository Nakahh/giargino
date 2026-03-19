import { useEffect, useRef, useState } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface UseScrollSyncOptions {
  onSectionChange?: (sectionId: SectionId) => void;
  scrollContainerId?: string;
  offset?: number;
  threshold?: number | number[]; // Backward compatibility
  rootMargin?: string; // Backward compatibility
}

/**
 * Hook que detecta qual seção está visível durante scroll
 * Usa scroll listener para detecção super confiável
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const {
    onSectionChange,
    scrollContainerId = "dashboard-content",
    offset = 100,
  } = options;

  const [visibleSection, setVisibleSection] = useState<SectionId>("overview");
  const lastSectionRef = useRef<SectionId>("overview");
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Encontrar o container scrollável
    let container = scrollContainerRef.current || document.getElementById(scrollContainerId);
    
    if (!container) {
      return;
    }

    scrollContainerRef.current = container;

    // Função para detectar qual seção está visível
    const detectVisibleSection = () => {
      const sections = Array.from(document.querySelectorAll("[data-section]"));
      
      if (sections.length === 0) return;

      // Encontrar a seção mais próxima do topo do container
      let visibleSectionId: SectionId = "overview";
      let minDistance = Infinity;

      const containerRect = container!.getBoundingClientRect();
      const referencePoint = containerRect.top + offset;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        // Verificar se seção está no viewport do container
        const isInViewport = 
          rect.bottom > containerRect.top && 
          rect.top < containerRect.bottom;

        if (isInViewport) {
          // Distância do topo da seção ao ponto de referência
          const distance = Math.abs(rect.top - referencePoint);

          if (distance < minDistance) {
            minDistance = distance;
            visibleSectionId = section.getAttribute("data-section") as SectionId;
          }
        }
      });

      // Se nenhuma seção está no viewport, usar a primeira que está abaixo
      if (minDistance === Infinity) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= containerRect.bottom) {
            visibleSectionId = section.getAttribute("data-section") as SectionId;
            break;
          }
        }
      }

      // Atualizar apenas se mudou
      if (visibleSectionId !== lastSectionRef.current) {
        lastSectionRef.current = visibleSectionId;
        setVisibleSection(visibleSectionId);
        onSectionChange?.(visibleSectionId);
      }
    };

    // Listener de scroll com debouncing
    const handleScroll = () => {
      // Limpar timer anterior
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Executar após um pequeno delay (debounce)
      timerRef.current = setTimeout(detectVisibleSection, 10);
    };

    // Executar imediatamente no mount
    setTimeout(detectVisibleSection, 0);

    // Adicionar listener de scroll
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (container && scrollContainerRef.current === container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [scrollContainerId, offset, onSectionChange]);

  return { visibleSection };
}
