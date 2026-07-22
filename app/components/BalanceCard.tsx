"use client";

import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [animatedBalance, setAnimatedBalance] = useState(balance);
const [animatedIncome, setAnimatedIncome] = useState(income);
const [animatedExpense, setAnimatedExpense] = useState(expense);

function animateValue(
  start: number,
  end: number,
  setter: React.Dispatch<React.SetStateAction<number>>
) {
  const duration = 600;
  const startTime = performance.now();

  function update(currentTime: number) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const eased =
      1 - Math.pow(1 - progress, 3);

    setter(
      Math.round(
        start + (end - start) * eased
      )
    );

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

useEffect(() => {
  animateValue(animatedBalance, balance, setAnimatedBalance);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [balance]);

useEffect(() => {
  animateValue(animatedIncome, income, setAnimatedIncome);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [income]);

useEffect(() => {
  animateValue(animatedExpense, expense, setAnimatedExpense);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [expense]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="gradient-card shadow-pink relative overflow-hidden rounded-[36px] p-7 text-white"
    >
      {/* Декоративные блики */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-xl" />
      <div className="absolute right-10 top-8 h-24 w-24 rounded-full border border-white/15" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium tracking-wide text-white/75 uppercase">
              Общий баланс
            </p>

            <h2 className="mt-3 text-5xl font-black tracking-tight">
             {animatedBalance.toLocaleString("ru-RU")} ₴
            </h2>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs font-medium text-white/90">
                Баланс актуален
              </span>
            </div>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl border border-white/20">
            <Wallet size={30} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-3xl bg-white/15 p-4 backdrop-blur-xl border border-white/15"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-emerald-500 p-2 shadow-lg shadow-emerald-500/30">
                <ArrowUpRight size={16} />
              </div>

              <span className="text-sm text-white/80">
                Доход
              </span>
            </div>

            <p className="text-2xl font-bold">
             {animatedIncome.toLocaleString("ru-RU")} ₴
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-3xl bg-white/15 p-4 backdrop-blur-xl border border-white/15"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-rose-500 p-2 shadow-lg shadow-rose-500/30">
                <ArrowDownRight size={16} />
              </div>

              <span className="text-sm text-white/80">
                Расход
              </span>
            </div>

            <p className="text-2xl font-bold">
              {animatedExpense.toLocaleString("ru-RU")} ₴
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}