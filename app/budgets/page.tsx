"use client";

import { motion } from "framer-motion";
import { PiggyBank, Plus } from "lucide-react";

import BottomNavigation from "../components/BottomNavigation";
import { useBudgets } from "../context/BudgetsContext";
import { useTransactions } from "../context/TransactionsContext";

export default function BudgetsPage() {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  return (
    <main className="mx-auto max-w-md pb-28">
      <div className="sticky top-0 z-10 border-b border-white/40 bg-white/70 px-5 py-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Cherry Cash</p>

            <h1 className="text-3xl font-bold">
              Бюджеты 💰
            </h1>
          </div>

          <button
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-pink-500
              to-rose-500
              text-white
              shadow-lg
            "
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {budgets.map((budget, index) => {
          const spent = transactions
            .filter(
              (t) =>
                t.type === "expense" &&
                t.category === budget.category
            )
            .reduce((sum, t) => sum + t.amount, 0);

          const percent = Math.min(
            (spent / budget.limit) * 100,
            100
          );

          const remaining = budget.limit - spent;

          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="
                rounded-3xl
                border
                border-white/50
                bg-white/80
                p-5
                shadow-xl
                backdrop-blur-xl
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                    {budget.emoji}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      {budget.category}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {spent.toLocaleString()} ₴ из{" "}
                      {budget.limit.toLocaleString()} ₴
                    </p>
                  </div>
                </div>

                <PiggyBank
                  className="text-pink-500"
                  size={28}
                />
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-pink-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
                />
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="font-semibold text-pink-600">
                  {percent.toFixed(0)}%
                </span>

                <span
                  className={
                    remaining >= 0
                      ? "text-green-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {remaining >= 0
                    ? `Осталось ${remaining.toLocaleString()} ₴`
                    : `Перерасход ${Math.abs(
                        remaining
                      ).toLocaleString()} ₴`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNavigation />
    </main>
  );
}