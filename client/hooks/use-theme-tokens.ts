import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Tokens semânticos para temas light/dark
 * Podem ser usados em componentes para ter cores responsivas ao tema
 */
export interface ThemeTokens {
  // Cores primárias
  primary: string;
  primaryForeground: string;

  // Cores secundárias
  secondary: string;
  secondaryForeground: string;

  // Cores de acento
  accent: string;
  accentForeground: string;

  // Cores neutras
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;

  // Cores funcionais
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;

  // Borders e dividers
  border: string;
  borderLight: string;
  borderDark: string;

  // Shadows
  shadow: string;
  shadowLg: string;

  // Glass morphism
  glassBackground: string;
  glassBackgroundStrong: string;
}

const lightTokens: ThemeTokens = {
  // Primary - Azul Marinho GIARDINO
  primary: '#1F3B5E',
  primaryForeground: '#FFFFFF',

  // Secondary - Verde GIARDINO
  secondary: '#2D5016',
  secondaryForeground: '#FFFFFF',

  // Accent - Amarelo Ouro GIARDINO
  accent: '#F4C430',
  accentForeground: '#1F3B5E',

  // Neutrals
  background: '#FFFFFF',
  foreground: '#1F3B5E',
  muted: '#E5E7EB',
  mutedForeground: '#6B7280',

  // Functional
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  success: '#10B981',
  successForeground: '#FFFFFF',
  warning: '#F59E0B',
  warningForeground: '#1F3B5E',
  info: '#3B82F6',
  infoForeground: '#FFFFFF',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Shadows
  shadow: '0 1px 2px 0 rgba(31, 59, 94, 0.05)',
  shadowLg: '0 10px 40px rgba(31, 59, 94, 0.12)',

  // Glass morphism
  glassBackground: 'rgba(255, 255, 255, 0.8)',
  glassBackgroundStrong: 'rgba(255, 255, 255, 0.95)',
};

const darkTokens: ThemeTokens = {
  // Primary - Azul Claro (inverso)
  primary: '#60A5FA',
  primaryForeground: '#0F172A',

  // Secondary - Verde Claro
  secondary: '#86EFAC',
  secondaryForeground: '#0F172A',

  // Accent - Amarelo (mantém similaridade)
  accent: '#F4C430',
  accentForeground: '#1F3B5E',

  // Neutrals
  background: '#0F172A',
  foreground: '#F3F4F6',
  muted: '#374151',
  mutedForeground: '#D1D5DB',

  // Functional
  destructive: '#FCA5A5',
  destructiveForeground: '#7F1D1D',
  success: '#86EFAC',
  successForeground: '#0F172A',
  warning: '#FCD34D',
  warningForeground: '#0F172A',
  info: '#93C5FD',
  infoForeground: '#0F172A',

  // Borders
  border: '#374151',
  borderLight: '#4B5563',
  borderDark: '#1F2937',

  // Shadows
  shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  shadowLg: '0 10px 40px rgba(0, 0, 0, 0.4)',

  // Glass morphism
  glassBackground: 'rgba(15, 23, 42, 0.8)',
  glassBackgroundStrong: 'rgba(15, 23, 42, 0.95)',
};

/**
 * Hook para acessar tokens semânticos do tema atual
 * Integra com next-themes para dar suporte a dark/light mode
 */
export function useThemeTokens(): ThemeTokens {
  const { theme } = useTheme();
  const [tokens, setTokens] = useState<ThemeTokens>(lightTokens);

  useEffect(() => {
    // Aplicar tema correto baseado na preferência do usuário
    if (theme === 'dark') {
      setTokens(darkTokens);
    } else {
      setTokens(lightTokens);
    }
  }, [theme]);

  return tokens;
}

/**
 * Hook para smooth color transitions ao trocar tema
 * Retorna CSS para transição suave
 */
export function useThemeTransition(duration: number = 250) {
  return {
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionDuration: `${duration}ms`,
  };
}

/**
 * Função auxiliar para converter tokens em variáveis CSS
 */
export function generateThemeCSSVariables(tokens: ThemeTokens, prefix = '--theme'): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const cssVarName = key
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
      return `${prefix}-${cssVarName}: ${value};`;
    })
    .join('\n');
}

/**
 * Provider component para aplicar tokens como variáveis CSS
 */
export function useApplyThemeTokens() {
  const tokens = useThemeTokens();

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      const cssVarName = key
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
      root.style.setProperty(`--theme-${cssVarName}`, value);
    });
  }, [tokens]);

  return null;
}
