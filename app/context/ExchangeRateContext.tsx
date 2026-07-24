"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Rates = {
  UAH: number;
  USD: number;
  EUR: number;
  GBP: number;
};

type ExchangeRateContextType = {
  rates: Rates;
  loading: boolean;
  refreshRates: () => Promise<void>;
};

const CACHE_KEY = "exchange_rates";
const CACHE_TIME_KEY = "exchange_rates_updated";
const CACHE_DURATION = 12 * 60 * 60 * 1000;

const defaultRates: Rates = {
  UAH: 1,
  USD: 0.024,
  EUR: 0.021,
  GBP: 0.018,
};

const ExchangeRateContext =
  createContext<ExchangeRateContextType | null>(null);

export function ExchangeRateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rates, setRates] = useState(defaultRates);
  const [loading, setLoading] = useState(true);

  async function refreshRates() {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/UAH");
      const data = await res.json();

      if (data.result !== "success") return;

      const newRates: Rates = {
        UAH: 1,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
      };

      setRates(newRates);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(newRates)
      );

      localStorage.setItem(
        CACHE_TIME_KEY,
        Date.now().toString()
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cache = localStorage.getItem(CACHE_KEY);
    const time = localStorage.getItem(CACHE_TIME_KEY);

    if (cache && time) {
      if (Date.now() - Number(time) < CACHE_DURATION) {
        setRates(JSON.parse(cache));
        setLoading(false);
        return;
      }
    }

    refreshRates();
  }, []);

  return (
    <ExchangeRateContext.Provider
      value={{
        rates,
        loading,
        refreshRates,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRates() {
  const context = useContext(ExchangeRateContext);

  if (!context) {
    throw new Error(
      "useExchangeRates must be used inside ExchangeRateProvider"
    );
  }

  return context;
}