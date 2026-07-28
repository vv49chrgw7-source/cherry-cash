"use client";

import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import ProgressBar from "../components/ui/ProgressBar";
import { useModal } from "../context/ModalContext";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  PiggyBank,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { useMoney } from "../hooks/useMoney";

import BottomNavigation from "../components/BottomNavigation";
import { useBudgets } from "../context/BudgetsContext";
import { useTransactions } from "../context/TransactionsContext";

export default function BudgetsPage() {
const { budgets, deleteBudget } = useBudgets();
  const { transactions } = useTransactions();
const money = useMoney();
  const { openBudgetModal } = useModal();
  const [openedMenu, setOpenedMenu] =
  useState<number | null>(null);

return (
  <main className="mx-auto max-w-md pb-28">
    <PageHeader
      subtitle="Cherry Cash"
      title="Бюджеты 💰"
      action={
        <button
          onClick={openBudgetModal}
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
      }
    />

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
>
  <GlassCard className="p-5">
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
{money.format(spent)} из{" "}
{money.format(budget.limit)}
</p>
                  </div>
                </div>

<div className="relative">
  <button
    onClick={() =>
      setOpenedMenu(
        openedMenu === budget.id
          ? null
          : budget.id
      )
    }
    className="rounded-xl p-2 transition hover:bg-pink-100"
  >
    <MoreVertical
      size={22}
      className="text-gray-500"
    />
  </button>

  {openedMenu === budget.id && (
    <motion.div
      initial={{ opacity: 0, scale: .95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        absolute
        right-0
        top-12
        z-20
        w-44
        rounded-2xl
        border
        border-pink-100
        bg-white
        p-2
        shadow-xl
      "
    >
      <button
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-sm
          hover:bg-pink-50
        "
      >
        <Pencil size={18} />
        Изменить
      </button>

      <button
        onClick={() => {
          deleteBudget(budget.id);
          setOpenedMenu(null);
        }}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-sm
          text-red-500
          hover:bg-red-50
        "
      >
        <Trash2 size={18} />
        Удалить
      </button>
    </motion.div>
  )}
</div>
              </div>

<div className="mt-5">
  <ProgressBar
    value={percent}
    color={
      percent >= 100
        ? "red"
        : percent >= 70
        ? "yellow"
        : "green"
    }
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
  ? `Осталось ${money.format(remaining)}`
  : `Перерасход ${money.format(Math.abs(remaining))}`}
                      </span>
              </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <BottomNavigation />
    </main>
  );
}