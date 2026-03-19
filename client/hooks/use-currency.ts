import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

export function useCurrency() {
  const { i18n } = useTranslation();
  const [exchangeRate, setExchangeRate] = useState<number>(0.2);
  const [isLoading, setIsLoading] = useState(true);

  const isEnglish = i18n.language === "en-US";

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("/api/exchange-rate");
        if (response.ok) {
          const data: ExchangeRateData = await response.json();
          setExchangeRate(data.rate);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        // Use default rate if fetch fails
        setExchangeRate(0.2);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
    // Refetch every 10 minutes
    const interval = setInterval(fetchExchangeRate, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Formata moeda com base no idioma ativo
  const formatCurrency = (value: number): string => {
    if (isEnglish) {
      // Converter para USD
      const usdValue = value * exchangeRate;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(usdValue);
    } else {
      // Manter em BRL
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
  };

  const formatCurrencyWithDecimals = (value: number): string => {
    if (isEnglish) {
      // Converter para USD
      const usdValue = value * exchangeRate;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(usdValue);
    } else {
      // Manter em BRL
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
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
    exchangeRate,
    isLoadingRate: isLoading,
  };
}
