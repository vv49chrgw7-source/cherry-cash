"use client";

import Link from "next/link";
import { Check, ChevronLeft } from "lucide-react";

import {
  Currency,
  useCurrency,
} from "@/app/context/CurrencyContext";

const currencies = [
  {
    code: "UAH",
    symbol: "₴",
    flag: "🇺🇦",
    name: "Гривна",
  },
  {
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    name: "US Dollar",
  },
  {
    code: "EUR",
    symbol: "€",
    flag: "🇪🇺",
    name: "Euro",
  },
  {
    code: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    name: "Pound Sterling",
  },
] as const;

export default function CurrencyPage() {
  const { currency, setCurrency } = useCurrency();

  return (
    <main className="page-padding min-h-screen pb-40">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/settings"
          className="rounded-full bg-white p-2 shadow"
        >
          <ChevronLeft size={22} />
        </Link>

        <h1 className="text-4xl font-black">
          💱 Валюта
        </h1>
      </div>

      <div className="space-y-4">
        {currencies.map((item) => (
          <button
            key={item.code}
            onClick={() => setCurrency(item.code as Currency)}
            className="glass card-hover flex w-full items-center justify-between rounded-3xl p-5"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{item.flag}</span>

              <div className="text-left">
                <h3 className="font-bold">
                  {item.symbol} {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.code}
                </p>
              </div>
            </div>

            {currency.code === item.code && (
              <Check
                size={22}
                className="text-pink-500"
              />
            )}
          </button>
        ))}
      </div>
    </main>
  );
}