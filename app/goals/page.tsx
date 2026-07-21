"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import BottomNavigation from "../components/BottomNavigation";
import AddMoneyToGoalModal from "../components/AddMoneyToGoalModal";
import { useGoals } from "../context/GoalsContext";

export default function GoalsPage() {
  const { goals, removeGoal } = useGoals();

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  function handleDelete(id: number, title: string) {
    const confirmed = window.confirm(
      `Удалить цель "${title}"?`
    );

    if (!confirmed) return;

    removeGoal(id);
  }

  return (
    <main className="page-padding min-h-screen pb-40">
      <h1 className="mb-8 text-4xl font-black">
        🎯 Цели накопления
      </h1>

      <div className="space-y-5">
        {goals.map((goal) => {
          const progress = Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100
          );

          return (
            <div
              key={goal.id}
              className="glass relative rounded-3xl p-6 shadow-lg"
            >
              <button
                onClick={() => handleDelete(goal.id, goal.title)}
                className="absolute right-4 top-4 rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl">
                  {goal.emoji}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {goal.title}
                  </h2>

                  <p className="text-gray-500">
                    {goal.currentAmount.toLocaleString("ru-RU")} ₴ /{" "}
                    {goal.targetAmount.toLocaleString("ru-RU")} ₴
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Прогресс</span>

                  <span>{progress.toFixed(0)}%</span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-pink-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: goal.color,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedGoalId(goal.id)}
                className="mt-6 w-full rounded-2xl bg-pink-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-pink-600 active:scale-[0.98]"
              >
                + Пополнить
              </button>
            </div>
          );
        })}
      </div>

      {selectedGoalId !== null && (
        <AddMoneyToGoalModal
          goalId={selectedGoalId}
          onClose={() => setSelectedGoalId(null)}
        />
      )}

      <BottomNavigation />
    </main>
  );
}