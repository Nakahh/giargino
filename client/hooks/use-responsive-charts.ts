import { useEffect, useState } from 'react';

interface ChartDimensions {
  width: string;
  height: number;
  fontSize: number;
  labelFontSize: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface UseResponsiveChartsOptions {
  mobileHeight?: number;
  tabletHeight?: number;
  desktopHeight?: number;
}

/**
 * Hook para otimizar dimensões de gráficos Recharts para mobile/tablet/desktop
 * Retorna alturas dinâmicas e tamanhos de fonte responsivos
 */
export function useResponsiveCharts(options: UseResponsiveChartsOptions = {}) {
  const {
    mobileHeight = 240,
    tabletHeight = 300,
    desktopHeight = 400,
  } = options;

  const [dimensions, setDimensions] = useState<ChartDimensions>({
    width: '100%',
    height: mobileHeight,
    fontSize: 10,
    labelFontSize: 9,
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let height = mobileHeight;
      let fontSize = 10;
      let labelFontSize = 9;
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;

      if (width < 640) {
        // Mobile: < 640px
        height = mobileHeight;
        fontSize = 9;
        labelFontSize = 8;
        isMobile = true;
      } else if (width < 1024) {
        // Tablet: 640px - 1024px
        height = tabletHeight;
        fontSize = 11;
        labelFontSize = 10;
        isTablet = true;
      } else {
        // Desktop: >= 1024px
        height = desktopHeight;
        fontSize = 12;
        labelFontSize = 11;
        isDesktop = true;
      }

      setDimensions({
        width: '100%',
        height,
        fontSize,
        labelFontSize,
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [mobileHeight, tabletHeight, desktopHeight]);

  return dimensions;
}

/**
 * Hook para otimizar configurações de Tooltip para mobile
 */
export function useResponsiveTooltip() {
  const dimensions = useResponsiveCharts();

  return {
    contentStyle: {
      backgroundColor: '#fff',
      border: '2px solid #1F3B5E',
      borderRadius: '8px',
      padding: dimensions.isMobile ? '6px' : '8px',
      fontSize: dimensions.labelFontSize,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    labelStyle: {
      color: '#1F3B5E',
      fontWeight: 'bold',
      fontSize: dimensions.labelFontSize,
      marginBottom: dimensions.isMobile ? '2px' : '4px',
    },
    wrapperStyle: {
      maxWidth: dimensions.isMobile ? '120px' : '200px',
    },
  };
}

/**
 * Hook para otimizar Legend para mobile
 */
export function useResponsiveLegend() {
  const dimensions = useResponsiveCharts();

  return {
    wrapperStyle: {
      paddingTop: dimensions.isMobile ? '8px' : '12px',
      fontSize: dimensions.labelFontSize,
      display: 'flex',
      justifyContent: 'center',
      gap: dimensions.isMobile ? '12px' : '30px',
      flexWrap: 'wrap' as const,
    },
    height: dimensions.isMobile ? 30 : 50,
    iconType: dimensions.isMobile ? 'line' : 'square',
  };
}
