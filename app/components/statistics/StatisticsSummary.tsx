"use client";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

interface StatisticsSummaryProps {
  balance: number;
  income: number;
  expense: number;
}

export default function StatisticsSummary({
  balance,
  income,
  expense,
}: StatisticsSummaryProps) {
  return (
    <div className="space-y-4">

      <div className="gradient-card rounded-3xl p-6 text-white shadow-pink">
        <div className="flex items-center gap-3">
          <Wallet size={26} />
          <p className="text-lg opacity-90">
            Общий баланс
          </p>
        </div>

        <h2 className="mt-4 text-4xl font-black">
          {balance.toLocaleString()} ₴
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-green-500">
            <TrendingUp size={22} />

            <span className="font-semibold">
              Доходы
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold">
            {income.toLocaleString()} ₴
          </p>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-red-500">
            <TrendingDown size={22} />

            <span className="font-semibold">
              Расходы
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold">
            {expense.toLocaleString()} ₴
          </p>
        </div>

      </div>
    </div>
  );
}