import { useTranslation } from 'react-i18next';

const BRL_TO_USD_RATE = 0.20; // Taxa de conversão aproximada (1 BRL = 0.20 USD)

export function useCurrency() {
  const { i18n } = useTranslation();
  
  const isEnglish = i18n.language === 'en-US';
  
  // Formata moeda com base no idioma ativo
  const formatCurrency = (value: number): string => {
    if (isEnglish) {
      // Converter para USD
      const usdValue = value * BRL_TO_USD_RATE;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(usdValue);
    } else {
      // Manter em BRL
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
  };
  
  const formatCurrencyWithDecimals = (value: number): string => {
    if (isEnglish) {
      // Converter para USD
      const usdValue = value * BRL_TO_USD_RATE;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(usdValue);
    } else {
      // Manter em BRL
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  };
  
  return {
    formatCurrency,
    formatCurrencyWithDecimals,
    isEnglish,
    currentLanguage: i18n.language,
  };
}
