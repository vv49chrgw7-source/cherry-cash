"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CircleDollarSign } from "lucide-react";

import { useGoals } from "../context/GoalsContext";

interface AddMoneyToGoalModalProps {
  goalId: number;
  onClose: () => void;
}

export default function AddMoneyToGoalModal({
  goalId,
  onClose,
}: AddMoneyToGoalModalProps) {
  const { goals, updateGoal } = useGoals();

  const goal = goals.find((g) => g.id === goalId);

  const [amount, setAmount] = useState("");

  if (!goal) return null;

  function addMoney() {
    const value = Number(amount);

    if (!value || value <= 0) return;

    updateGoal(goalId, value);

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-t-[34px] bg-white p-6"
      >
        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />

        <h2 className="text-center text-2xl font-bold">
          Пополнить цель
        </h2>

        <div className="mt-2 text-center text-gray-500">
          {goal.emoji} {goal.title}
        </div>

        <div className="mt-8 space-y-5">

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <CircleDollarSign
              className="text-pink-500"
              size={22}
            />

            <input
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            onClick={addMoney}
            className="gradient-card shadow-pink w-full rounded-2xl py-4 text-lg font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Пополнить
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-gray-200 py-4 font-medium transition hover:bg-gray-50"
          >
            Отмена
          </button>

          <div className="h-6" />

        </div>
      </motion.div>
    </div>
  );
}