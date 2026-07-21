"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Goal } from "../types/goal";
import { initialGoals } from "../data/goals";

interface GoalsContextType {
  goals: Goal[];

  addGoal: (goal: Goal) => void;
  removeGoal: (id: number) => void;
  updateGoal: (id: number, amount: number) => void;
}

const GoalsContext =
  createContext<GoalsContextType | null>(null);

export function GoalsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window === "undefined") {
      return initialGoals;
    }

    const saved = localStorage.getItem("goals");

    return saved ? JSON.parse(saved) : initialGoals;
  });

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const removeGoal = (id: number) => {
    setGoals((prev) =>
      prev.filter((goal) => goal.id !== id)
    );
  };

  const updateGoal = (
    id: number,
    amount: number
  ) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== id) {
          return goal;
        }

        return {
          ...goal,
          currentAmount: Math.min(
            goal.currentAmount + amount,
            goal.targetAmount
          ),
        };
      })
    );
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        removeGoal,
        updateGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);

  if (!context) {
    throw new Error(
      "useGoals must be used inside GoalsProvider"
    );
  }

  return context;
}