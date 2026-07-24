"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

import { useBudgets } from "../context/BudgetsContext";

interface Props {
  onClose: () => void;
}

const emojis = [
  "🍔",
  "⛽",
  "🛒",
  "☕",
  "🎮",
  "🎬",
  "🏠",
  "💊",
  "🎁",
  "✈️",
];

export default function AddBudgetModal({
  onClose,
}: Props) {
  const { addBudget, budgets } = useBudgets();

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [emoji, setEmoji] = useState("🍔");

  function handleSave() {
    if (!category.trim()) {
      toast.error("Введите название категории");
      return;
    }

    if (!limit || Number(limit) <= 0) {
      toast.error("Введите корректный лимит");
      return;
    }

    const exists = budgets.some(
      (b) =>
        b.category.toLowerCase() ===
        category.toLowerCase()
    );

    if (exists) {
      toast.error("Такой бюджет уже существует");
      return;
    }

    addBudget({
      id: Date.now(),
      category,
      emoji,
      color: "#EC4899",
      limit: Number(limit),
    });

    toast.success("Бюджет создан");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">
      <motion.div
        initial={{ scale: .9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: .9, opacity: 0 }}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Новый бюджет
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium">
          Категория
        </label>

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Например: Еда"
          className="mb-4 w-full rounded-2xl border p-3 outline-none focus:border-pink-500"
        />

        <label className="mb-2 block text-sm font-medium">
          Лимит
        </label>

        <input
          type="number"
          value={limit}
          onChange={(e) =>
            setLimit(e.target.value)
          }
          placeholder="5000"
          className="mb-4 w-full rounded-2xl border p-3 outline-none focus:border-pink-500"
        />

        <label className="mb-2 block text-sm font-medium">
          Иконка
        </label>

        <div className="mb-6 grid grid-cols-5 gap-2">
          {emojis.map((item) => (
            <button
              key={item}
              onClick={() => setEmoji(item)}
              className={`rounded-2xl p-3 text-2xl transition ${
                emoji === item
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white"
        >
          Создать бюджет
        </button>
      </motion.div>
    </div>
  );
}