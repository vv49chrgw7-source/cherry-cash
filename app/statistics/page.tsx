"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
} from "lucide-react";

import StatisticsSummary from "../components/statistics/StatisticsSummary";
import ExpensePieChart from "../components/statistics/ExpensePieChart";
import BottomNavigation from "../components/BottomNavigation";
import { useTransactions } from "../context/TransactionsContext";

export default function StatisticsPage() {
  const {
    transactions,
    balance,
    income,
    expense,
  } = useTransactions();

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const groupedExpenses = expenseTransactions.reduce<
    Record<
      string,
      {
        name: string;
        emoji: string;
        value: number;
      }
    >
  >((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        name: transaction.category,
        emoji: transaction.emoji,
        value: 0,
      };
    }

    acc[transaction.category].value += transaction.amount;

    return acc;
  }, {});

  const chartData = Object.values(groupedExpenses).sort(
    (a, b) => b.value - a.value
  );

  return (
    <main className="page-padding min-h-screen pb-40">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Аналитика расходов
            </p>

            <h1 className="mt-1 text-4xl font-black tracking-tight">
              📊 Статистика
            </h1>
          </div>

          <div className="gradient-card shadow-pink flex h-14 w-14 items-center justify-center rounded-2xl text-white">
            <TrendingUp size={28} />
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .05 }}
        className="glass mt-8 flex items-center justify-between rounded-3xl p-5"
      >
        <div>
          <p className="text-sm text-gray-500">
            Текущий период
          </p>

          <h3 className="mt-1 text-xl font-bold">
            Этот месяц
          </h3>
        </div>

        <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
          <Calendar size={24} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .1 }}
        className="mt-8"
      >
        <StatisticsSummary
          balance={balance}
          income={income}
          expense={expense}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .15 }}
        className="mt-8"
      >
        <ExpensePieChart data={chartData} />
      </motion.div>

      <BottomNavigation />

    </main>
  );
}