"use client";

import { useState } from "react";
import { Transaction } from "../types/transaction";

interface AddTransactionModalProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  onClose: () => void;
}

export default function AddTransactionModal({
  transactions,
  setTransactions,
  onClose,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("🍔 Еда");
  const [description, setDescription] = useState("");

  function addTransaction() {
    if (!amount) return;

    const isIncome = category === "💼 Зарплата";

    const newTransaction: Transaction = {
      id: Date.now(),
      title: description || category,
      amount: Number(amount),
      type: isIncome ? "income" : "expense",
      date: "Сегодня",
    };

    setTransactions([newTransaction, ...transactions]);

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-md rounded-t-[32px] bg-white p-6 shadow-2xl">
        <h2 className="text-center text-2xl font-bold">
          Добавить операцию
        </h2>

        <div className="mt-6 space-y-4">
          <input
            type="number"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-pink-200 p-4 outline-none focus:border-pink-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-pink-200 p-4 outline-none focus:border-pink-500"
          >
            <option>🍔 Еда</option>
            <option>⛽ Бензин</option>
            <option>☕ Кофе</option>
            <option>🎉 Развлечения</option>
            <option>💼 Зарплата</option>
          </select>

          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-pink-200 p-4 outline-none focus:border-pink-500"
          />

          <button
            onClick={addTransaction}
            className="w-full rounded-xl bg-[#D81B60] py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            Добавить
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-xl border border-gray-300 py-4 text-lg"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}