"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Target,
  Trophy,
} from "lucide-react";

import BottomNavigation from "../components/BottomNavigation";
import AddMoneyToGoalModal from "../components/AddMoneyToGoalModal";
import { useGoals } from "../context/GoalsContext";

export default function GoalsPage() {
  const { goals, removeGoal } = useGoals();

  const [selectedGoalId, setSelectedGoalId] =
    useState<number | null>(null);

  function handleDelete(id: number, title: string) {
    const confirmed = window.confirm(
      `Удалить цель "${title}"?`
    );

    if (!confirmed) return;

    removeGoal(id);
  }

  return (
    <main className="page-padding min-h-screen pb-40">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Копи постепенно
            </p>

            <h1 className="mt-1 text-4xl font-black tracking-tight">
              🎯 Цели
            </h1>
          </div>

          <div className="gradient-card shadow-pink flex h-14 w-14 items-center justify-center rounded-2xl text-white">
            <Target size={28} />
          </div>

        </div>
      </motion.div>

      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass mt-10 rounded-[32px] py-14 text-center"
        >
          <div className="text-6xl">🎯</div>

          <h2 className="mt-5 text-2xl font-bold">
            Пока нет целей
          </h2>

          <p className="mt-2 text-gray-500">
            Добавь первую цель через кнопку +
          </p>
        </motion.div>
      )}

      <div className="mt-8 space-y-6">

        {goals.map((goal) => {
          const progress = Math.min(
            (goal.currentAmount /
              goal.targetAmount) *
              100,
            100
          );

          const left =
            goal.targetAmount -
            goal.currentAmount;

          return (
            <motion.div
              key={goal.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -4,
              }}
              className="glass relative overflow-hidden rounded-[32px] border border-white/40 p-6"
            >

              <div
                className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl opacity-20"
                style={{
                  backgroundColor: goal.color,
                }}
              />

              <button
                onClick={() =>
                  handleDelete(
                    goal.id,
                    goal.title
                  )
                }
                className="absolute right-5 top-5 rounded-2xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>

              <div className="relative z-10 flex items-center gap-4">

                <div
                  className="flex h-20 w-20 items-center justify-center rounded-3xl text-5xl shadow-lg"
                  style={{
                    backgroundColor:
                      `${goal.color}20`,
                  }}
                >
                  {goal.emoji}
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    {goal.title}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {goal.currentAmount.toLocaleString(
                      "ru-RU"
                    )}{" "}
                    ₴ из{" "}
                    {goal.targetAmount.toLocaleString(
                      "ru-RU"
                    )}{" "}
                    ₴
                  </p>
                </div>

              </div>

              <div className="mt-7">

                <div className="mb-2 flex justify-between text-sm font-medium">

                  <span>
                    Прогресс
                  </span>

                  <span>
                    {progress.toFixed(0)}%
                  </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-gray-200">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: .8,
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        goal.color,
                    }}
                  />

                </div>

              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/50 p-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Осталось накопить
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    {Math.max(
                      left,
                      0
                    ).toLocaleString(
                      "ru-RU"
                    )}{" "}
                    ₴
                  </h3>

                </div>

                {progress >= 100 ? (
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
                    <Trophy size={18} />
                    Готово
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setSelectedGoalId(
                        goal.id
                      )
                    }
                    className="gradient-card rounded-2xl px-6 py-3 font-semibold text-white transition hover:scale-105 active:scale-95"
                  >
                    Пополнить
                  </button>
                )}

              </div>

            </motion.div>
          );
        })}

      </div>

      {selectedGoalId !== null && (
        <AddMoneyToGoalModal
          goalId={selectedGoalId}
          onClose={() =>
            setSelectedGoalId(null)
          }
        />
      )}

      <BottomNavigation />

    </main>
  );
}