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
    console.log('✅ Container encontrado:', container.id);
    console.log('📏 Container - height:', container.clientHeight, 'scrollHeight:', container.scrollHeight);

    // Função para detectar qual seção está visível
    const detectVisibleSection = () => {
      const sections = Array.from(document.querySelectorAll("[data-section]"));
      console.log('🔍 Seções encontradas:', sections.length);

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

      // Debug visual
      const debugPanel = document.getElementById('scroll-sync-debug');
      if (debugPanel) {
        debugPanel.innerHTML = `
          <div>📍 Seção: ${visibleSectionId}</div>
          <div>📍 Última: ${lastSectionRef.current}</div>
          <div>🔍 Seções: ${sections.length}</div>
          <div>📏 Distance: ${minDistance.toFixed(0)}px</div>
        `;
      }

      // Atualizar apenas se mudou
      if (visibleSectionId !== lastSectionRef.current) {
        console.log('🎯 Seção mudada:', lastSectionRef.current, '→', visibleSectionId);
        lastSectionRef.current = visibleSectionId;
        setVisibleSection(visibleSectionId);
        onSectionChange?.(visibleSectionId);
        if (debugPanel) {
          debugPanel.style.background = 'rgba(0, 100, 0, 0.95)';
        }
      } else {
        console.log('📍 Seção atual:', visibleSectionId, '(sem mudança)');
        if (debugPanel) {
          debugPanel.style.background = 'rgba(0, 0, 0, 0.9)';
        }
      }
    };

    // Listener de scroll com debouncing
    const handleScroll = () => {
      console.log('📜 Scroll evento disparado');
      // Limpar timer anterior
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Executar após um pequeno delay (debounce)
      timerRef.current = setTimeout(() => {
        console.log('⏱️ Debounce terminado, detectando seção...');
        detectVisibleSection();
      }, 10);
    };

    // Debug visual - criar painel de debug
    const debugPanel = document.getElementById('scroll-sync-debug') || document.createElement('div');
    if (!debugPanel.id) {
      debugPanel.id = 'scroll-sync-debug';
      debugPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #0f0;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        max-width: 300px;
        word-break: break-all;
      `;
      document.body.appendChild(debugPanel);
    }
    debugPanel.innerHTML += '<div>✅ useScrollSync iniciado</div>';

    // Executar imediatamente no mount
    console.log('🚀 Executando detectVisibleSection inicial');
    setTimeout(detectVisibleSection, 0);

    // Adicionar listener de scroll
    console.log('🎧 Adicionando scroll listener');
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
