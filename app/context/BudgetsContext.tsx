"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Budget } from "../types/budget";
import { initialBudgets } from "../data/budgets";

interface BudgetsContextType {
  budgets: Budget[];

  setBudgets: React.Dispatch<
    React.SetStateAction<Budget[]>
  >;

  addBudget: (budget: Budget) => void;

  updateBudget: (budget: Budget) => void;

  deleteBudget: (id: number) => void;
}

const BudgetsContext =
  createContext<BudgetsContextType | null>(null);

export function BudgetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [budgets, setBudgets] =
    useState<Budget[]>(() => {
      if (typeof window === "undefined") {
        return initialBudgets;
      }

      const saved =
        localStorage.getItem("budgets");

      return saved
        ? JSON.parse(saved)
        : initialBudgets;
    });

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  function addBudget(budget: Budget) {
    setBudgets((prev) => [...prev, budget]);
  }

  function updateBudget(updated: Budget) {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === updated.id
          ? updated
          : budget
      )
    );
  }

  function deleteBudget(id: number) {
    setBudgets((prev) =>
      prev.filter((budget) => budget.id !== id)
    );
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        setBudgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}

export function useBudgets() {
  const context = useContext(BudgetsContext);

  if (!context) {
    throw new Error(
      "useBudgets must be used inside BudgetsProvider"
    );
  }

  return context;
}