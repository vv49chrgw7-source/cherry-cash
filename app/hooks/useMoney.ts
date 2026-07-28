"use client";

import { useCurrency } from "../context/CurrencyContext";
import { useExchangeRates } from "../context/ExchangeRateContext";
import { formatMoney } from "../utils/formatMoney";

export function useMoney() {
  const { currency } = useCurrency();
  const { rates } = useExchangeRates();

  return {
    format: (amount: number) =>
      formatMoney(amount, currency.code, rates),
  };
}