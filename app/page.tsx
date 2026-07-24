"use client";

import Link from "next/link";
import SectionHeader from "./components/ui/SectionHeader";
import AnimatedCard from "./components/ui/AnimatedCard";
import ProgressBar from "./components/ui/ProgressBar";
import { Heart } from "lucide-react";
import StatCard from "./components/ui/StatCard";
import {
  Wallet,
  FileText,
  TrendingDown,
} from "lucide-react";

import { useBudgets } from "./context/BudgetsContext";
import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  Target,
  ArrowDownLeft,
  ArrowUpRight,
  PlusCircle,
  Settings,
  UserCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import BalanceCard from "./components/BalanceCard";
import BottomNavigation from "./components/BottomNavigation";
import TransactionCard from "./components/TransactionCard";

import { useTransactions } from "./context/TransactionsContext";
import { useGoals } from "./context/GoalsContext";
import { useModal } from "./context/ModalContext";

export default function Home() {
  const {
    transactions,
    setTransactions,
    income,
    expense,
    balance,
  } = useTransactions();

  const { goals } = useGoals();
  const { budgets } = useBudgets();

const expensePercent =
  income === 0
    ? 0
    : Math.round((expense / income) * 100);

    const health =
  income === 0
    ? 100
    : Math.max(0, 100 - expensePercent);

let healthText = "Отлично";
let progressColor: "green" | "yellow" | "red" = "green";

if (health < 80) {
  healthText = "Хорошо";
  progressColor = "yellow";
}

if (health < 50) {
  healthText = "Стоит экономить";
  progressColor = "red";
}

  const {
    openTransactionModal,
    openGoalModal,
  } = useModal();

  const nearestGoal = goals.find(
    (goal) => goal.currentAmount < goal.targetAmount
  );

  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [transactions, search]);

  function deleteTransaction(id: number) {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  }

  const hour = new Date().getHours();

  let greeting = "Добрый вечер 🌙";

  if (hour >= 5 && hour < 12) {
    greeting = "Доброе утро ☀️";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Добрый день 🌸";
  }

  return (
    <main className="page-padding min-h-screen pb-40">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm text-gray-500">
          {greeting}
        </p>

<div className="mt-2 flex items-start justify-between">
  <div>
    <h1 className="text-4xl font-black tracking-tight">
      Анастасия
    </h1>

    <p className="mt-1 text-gray-500">
      Добро пожаловать в Cherry Cash 🍒
    </p>
  </div>

  <div className="flex gap-3">
    <Link
      href="/profile"
      className="glass card-hover flex h-12 w-12 items-center justify-center rounded-2xl"
    >
      <UserCircle2 size={22} />
    </Link>

    <Link
      href="/settings"
      className="glass card-hover flex h-12 w-12 items-center justify-center rounded-2xl"
    >
      <Settings size={22} />
    </Link>
  </div>
</div>
      </motion.div>

      <div className="mt-8">
        <BalanceCard
          balance={balance}
          income={income}
          expense={expense}
        />
      </div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.05 }}
  className="mt-6 grid grid-cols-2 gap-4"
>
  <StatCard
    title="Операций"
    value={transactions.length.toString()}
    icon={<FileText size={20} className="text-pink-600" />}
  />

  <StatCard
    title="Бюджетов"
    value={budgets.length.toString()}
    icon={<Wallet size={20} className="text-pink-600" />}
  />

  <StatCard
    title="Целей"
    value={goals.length.toString()}
    icon={<Target size={20} className="text-pink-600" />}
  />

  <StatCard
    title="Расходы"
    value={`${expensePercent}%`}
    valueColor={
      expensePercent >= 90
        ? "text-red-500"
        : expensePercent >= 70
        ? "text-yellow-500"
        : "text-green-600"
    }
    icon={
      <TrendingDown
        size={20}
        className="text-pink-600"
      />
    }
  />
</motion.div>

<AnimatedCard className="mt-6 p-5" delay={0.08}>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">
        Финансовое здоровье
      </p>

      <h2 className="mt-1 text-2xl font-bold">
        {health}%
      </h2>
    </div>

    <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
      <Heart size={24} />
    </div>
  </div>

  <div className="mt-5">
    <ProgressBar
      value={health}
      color={progressColor}
    />

    <p className="mt-3 text-sm font-medium text-gray-500">
      {healthText}
    </p>
  </div>
</AnimatedCard>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        <button
          onClick={() =>
            openTransactionModal("income")
          }
          className="glass card-hover rounded-3xl p-4"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <ArrowDownLeft size={22} />
          </div>

          <p className="mt-3 text-sm font-semibold">
            Доход
          </p>
        </button>

        <button
          onClick={() =>
            openTransactionModal("expense")
          }
          className="glass card-hover rounded-3xl p-4"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <ArrowUpRight size={22} />
          </div>

          <p className="mt-3 text-sm font-semibold">
            Расход
          </p>
        </button>

        <button
          onClick={openGoalModal}
          className="glass card-hover rounded-3xl p-4"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <PlusCircle size={22} />
          </div>

          <p className="mt-3 text-sm font-semibold">
            Цель
          </p>
        </button>
      </motion.div>

      {nearestGoal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass mt-6 rounded-3xl p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Ближайшая цель
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {nearestGoal.emoji}{" "}
                {nearestGoal.title}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
              <Target size={24} />
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span>
                {nearestGoal.currentAmount.toLocaleString(
                  "ru-RU"
                )}{" "}
                ₴
              </span>

              <span>
                {nearestGoal.targetAmount.toLocaleString(
                  "ru-RU"
                )}{" "}
                ₴
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-pink-100">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    (nearestGoal.currentAmount /
                      nearestGoal.targetAmount) *
                      100,
                    100
                  )}%`,
                  backgroundColor:
                    nearestGoal.color,
                }}
              />
            </div>

            <p className="mt-3 text-right text-sm font-medium text-gray-500">
              {Math.min(
                (nearestGoal.currentAmount /
                  nearestGoal.targetAmount) *
                  100,
                100
              ).toFixed(0)}
              %
            </p>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass mt-8 flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Поиск операций..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
        />
      </motion.div>

<SectionHeader
  title="Последние операции"
  subtitle="Последние добавленные транзакции"
  right={
    <Link
      href="/transactions"
      className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-600 transition hover:bg-pink-200"
    >
      Все →
    </Link>
  }
/>

<div className="mt-5 space-y-4">
  {filteredTransactions.length > 0 ? (
    <AnimatePresence mode="popLayout">
      {filteredTransactions.slice(0, 5).map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onDelete={deleteTransaction}
        />
      ))}
    </AnimatePresence>
  ) : (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="glass rounded-3xl py-12 text-center"
    >
      <div className="text-5xl">
        🍒
      </div>

            <h3 className="mt-4 text-xl font-bold">
              Пока нет операций
            </h3>

            <p className="mt-2 text-gray-500">
              Добавь первую операцию с помощью
              кнопки ниже.
            </p>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </main>
  );
}      