"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Currency = "UAH" | "USD" | "EUR" | "GBP";

type CurrencyInfo = {
  code: Currency;
  symbol: string;
  name: string;
};

const currencies: Record<Currency, CurrencyInfo> = {
  UAH: {
    code: "UAH",
    symbol: "₴",
    name: "Гривна",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "Pound Sterling",
  },
};

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext =
  createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currency, setCurrencyState] =
    useState<Currency>("UAH");

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null;

    if (saved) {
      setCurrencyState(saved);
    }
  }, []);

  function setCurrency(currency: Currency) {
    setCurrencyState(currency);
    localStorage.setItem("currency", currency);
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency: currencies[currency],
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrency must be used inside CurrencyProvider"
    );
  }

  return context;
}