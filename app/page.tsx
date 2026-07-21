"use client";

import { useEffect, useMemo, useState } from "react";

import BalanceCard from "./components/BalanceCard";
import BottomNavigation from "./components/BottomNavigation";
import TransactionCard from "./components/TransactionCard";

import { initialTransactions } from "./data/transactions";
import { Transaction } from "./types/transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window === "undefined") {
      return initialTransactions;
    }

    const saved = localStorage.getItem("transactions");

    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const income = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const expense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const balance = income - expense;

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-pink-50 p-6 pb-32">
      <h1 className="mt-1 text-3xl font-bold text-gray-900">
        Анастасия
      </h1>

      <BalanceCard
        balance={balance}
        income={income}
        expense={expense}
      />

      <h2 className="mt-10 mb-4 text-2xl font-bold">
        Последние операции
      </h2>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </div>

      <BottomNavigation
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </main>
  );
}