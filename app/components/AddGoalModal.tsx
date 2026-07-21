"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CircleDollarSign, Target } from "lucide-react";

import { Goal } from "../types/goal";
import { useGoals } from "../context/GoalsContext";

interface AddGoalModalProps {
  onClose: () => void;
}

const colors = [
  "#ec4899",
  "#8b5cf6",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function AddGoalModal({
  onClose,
}: AddGoalModalProps) {
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  function createGoal() {
    if (!title.trim()) return;
    if (!targetAmount || Number(targetAmount) <= 0) return;

    const newGoal: Goal = {
      id: Date.now(),
      title: title.trim(),
      emoji,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount) || 0,
      color: selectedColor,
    };

    addGoal(newGoal);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[34px] bg-white p-6"
      >
        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />

        <h2 className="text-center text-2xl font-bold">
          Новая цель
        </h2>

        <div className="mt-7 space-y-5">

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <Target className="text-pink-500" size={22} />

            <input
              type="text"
              placeholder="Название цели"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">

            <span className="text-2xl">
              {emoji}
            </span>

            <input
              type="text"
              maxLength={2}
              placeholder="🎯"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <CircleDollarSign
              className="text-pink-500"
              size={22}
            />

            <input
              type="number"
              placeholder="Сколько нужно накопить"
              value={targetAmount}
              onChange={(e) =>
                setTargetAmount(e.target.value)
              }
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <CircleDollarSign
              className="text-pink-500"
              size={22}
            />

            <input
              type="number"
              placeholder="Уже накоплено"
              value={currentAmount}
              onChange={(e) =>
                setCurrentAmount(e.target.value)
              }
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div>
            <p className="mb-3 font-semibold">
              Цвет карточки
            </p>

            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setSelectedColor(color)
                  }
                  className={`h-12 w-12 rounded-full border-4 transition ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={createGoal}
            className="gradient-card shadow-pink w-full rounded-2xl py-4 text-lg font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Создать цель
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