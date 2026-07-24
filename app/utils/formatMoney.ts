import { Currency } from "../context/CurrencyContext";

type Rates = {
  UAH: number;
  USD: number;
  EUR: number;
  GBP: number;
};

const symbols: Record<Currency, string> = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function formatMoney(
  amount: number,
  currency: Currency,
  rates: Rates
) {
  const converted =
    currency === "UAH"
      ? amount
      : amount * rates[currency];

  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);

  return `${symbols[currency]} ${formatted}`;
}