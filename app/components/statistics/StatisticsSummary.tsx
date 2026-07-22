"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

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
    <div className="space-y-5">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-card shadow-pink relative overflow-hidden rounded-[32px] p-7 text-white"
      >
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/15 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">
              Общий баланс
            </p>

            <h2 className="mt-3 text-5xl font-black tracking-tight">
              {balance.toLocaleString("ru-RU")} ₴
            </h2>

            <p className="mt-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm">
              💰 Финансовое состояние
            </p>
          </div>

          <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">
            <Wallet size={34} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">

        <motion.div
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          className="glass rounded-[28px] border border-white/40 p-5"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <TrendingUp size={24} />
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Доход
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Всего получено
          </p>

          <h3 className="mt-1 text-3xl font-black text-emerald-600">
            +{income.toLocaleString("ru-RU")} ₴
          </h3>
        </motion.div>

        <motion.div
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          className="glass rounded-[28px] border border-white/40 p-5"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
              <TrendingDown size={24} />
            </div>

            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
              Расход
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Всего потрачено
          </p>

          <h3 className="mt-1 text-3xl font-black text-rose-600">
            -{expense.toLocaleString("ru-RU")} ₴
          </h3>
        </motion.div>

      </div>

    </div>
  );
}