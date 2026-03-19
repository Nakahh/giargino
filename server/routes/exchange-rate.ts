import { RequestHandler } from "express";

interface ExchangeRateResponse {
  rate: number;
  timestamp: number;
  baseCurrency: string;
  targetCurrency: string;
}

// Cache para evitar requisições frequentes (5 minutos)
let cachedRate: {
  rate: number;
  timestamp: number;
} | null = null;

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos

export const handleExchangeRate: RequestHandler = async (_req, res) => {
  try {
    // Verificar se o cache ainda é válido
    const now = Date.now();
    if (
      cachedRate &&
      now - cachedRate.timestamp < CACHE_DURATION_MS
    ) {
      return res.json({
        rate: cachedRate.rate,
        timestamp: cachedRate.timestamp,
        baseCurrency: "BRL",
        targetCurrency: "USD",
      } as ExchangeRateResponse);
    }

    // Buscar taxa de câmbio de uma API gratuita
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/brl.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = await response.json();
    const rate = data.brl.usd;

    // Atualizar cache
    cachedRate = {
      rate,
      timestamp: now,
    };

    res.json({
      rate,
      timestamp: now,
      baseCurrency: "BRL",
      targetCurrency: "USD",
    } as ExchangeRateResponse);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);

    // Retornar taxa cached mesmo que expirada, ou uma taxa default
    if (cachedRate) {
      return res.json({
        rate: cachedRate.rate,
        timestamp: cachedRate.timestamp,
        baseCurrency: "BRL",
        targetCurrency: "USD",
      } as ExchangeRateResponse);
    }

    // Taxa default como fallback (aproximadamente 0.20)
    res.json({
      rate: 0.2,
      timestamp: now,
      baseCurrency: "BRL",
      targetCurrency: "USD",
    } as ExchangeRateResponse);
  }
};
