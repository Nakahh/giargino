import { useEffect } from 'react';

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

const SECTION_ORDER: SectionId[] = [
  "overview",
  "revenue",
  "costs",
  "hr",
  "viability",
  "project",
];

interface UseKeyboardNavigationOptions {
  currentSection: SectionId;
  onNavigate?: (sectionId: SectionId) => void;
}

/**
 * Hook que detecta navegação por teclado
 * - Seta para cima/esquerda: seção anterior
 * - Seta para baixo/direita: próxima seção
 * - Home: primeira seção
 * - End: última seção
 * - 1-6: navega direto para a seção
 */
export function useKeyboardNavigation(options: UseKeyboardNavigationOptions) {
  const { currentSection, onNavigate } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = SECTION_ORDER.indexOf(currentSection);
      let nextSection: SectionId | null = null;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) {
            nextSection = SECTION_ORDER[currentIndex - 1];
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < SECTION_ORDER.length - 1) {
            nextSection = SECTION_ORDER[currentIndex + 1];
          }
          break;

        case 'Home':
          e.preventDefault();
          nextSection = SECTION_ORDER[0];
          break;

        case 'End':
          e.preventDefault();
          nextSection = SECTION_ORDER[SECTION_ORDER.length - 1];
          break;

        // Números 1-6 para navegação rápida
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          const index = parseInt(e.key) - 1;
          if (index < SECTION_ORDER.length) {
            e.preventDefault();
            nextSection = SECTION_ORDER[index];
          }
          break;
      }

      if (nextSection && nextSection !== currentSection) {
        onNavigate?.(nextSection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, onNavigate]);
}
