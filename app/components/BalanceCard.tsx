"use client";

import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export default function BalanceCard({
  balance,
  income,
  expense,
}: BalanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="gradient-card shadow-pink relative overflow-hidden rounded-[34px] p-7 text-white"
    >
      {/* Декоративные круги */}
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/10" />

      {/* Верхняя часть */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/80">
            Общий баланс
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            {balance.toLocaleString("ru-RU")} ₴
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
          <Wallet size={28} />
        </div>
      </div>

      {/* Доход / Расход */}
      <div className="relative z-10 mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-green-500 p-1.5">
              <ArrowUpRight size={15} />
            </div>

            <span className="text-sm text-white/80">
              Доход
            </span>
          </div>

          <p className="text-xl font-semibold">
            {income.toLocaleString("ru-RU")} ₴
          </p>
        </div>

        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-red-500 p-1.5">
              <ArrowDownRight size={15} />
            </div>

            <span className="text-sm text-white/80">
              Расход
            </span>
          </div>

          <p className="text-xl font-semibold">
            {expense.toLocaleString("ru-RU")} ₴
          </p>
        </div>
      </div>
    </motion.div>
  );
}