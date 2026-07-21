"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Calendar,
  CircleDollarSign,
  FileText,
} from "lucide-react";

import { Transaction } from "../types/transaction";
import { useTransactions } from "../context/TransactionsContext";

import {
  expenseCategories,
  incomeCategories,
} from "../data/categories";

interface AddTransactionModalProps {
  onClose: () =>void;
  defaultType?: "income" | "expense";
}

export default function AddTransactionModal({
  onClose,
  defaultType = "expense",
}: AddTransactionModalProps) {
  const { setTransactions } = useTransactions();

  const [type, setType] = useState<
    "income" | "expense"
  >(defaultType);

  const categories =
    type === "income"
      ? incomeCategories
      : expenseCategories;

  const [selectedCategory, setSelectedCategory] =
    useState(categories[0]);

  const [amount, setAmount] = useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [type]);

  function addTransaction() {
    if (!amount || Number(amount) <= 0) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      title:
        description.trim() ||
        selectedCategory.name,
      category: selectedCategory.name,
      emoji: selectedCategory.emoji,
      amount: Number(amount),
      type,
      date: "Сегодня",
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: .3 }}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[34px] bg-white p-6"
      >
        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300"/>

        <h2 className="text-center text-2xl font-bold">
          Новая операция
        </h2>

        <div className="mt-6 grid grid-cols-2 rounded-2xl bg-pink-100 p-1">
          <button
            onClick={() => setType("expense")}
            className={`rounded-xl py-3 font-semibold transition ${
              type === "expense"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            💸 Расход
          </button>

          <button
            onClick={() => setType("income")}
            className={`rounded-xl py-3 font-semibold transition ${
              type === "income"
                ? "bg-white shadow text-green-600"
                : "text-gray-500"
            }`}
          >
            💰 Доход
          </button>
        </div>

        <div className="mt-6 space-y-5">

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <CircleDollarSign
              className="text-pink-500"
              size={22}
            />

            <input
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div>

            <p className="mb-3 font-semibold">
              Категория
            </p>

            <div className="grid grid-cols-2 gap-3">

              {categories.map((category)=>(
                <button
                  key={category.name}
                  onClick={()=>setSelectedCategory(category)}
                  className={`rounded-2xl border p-4 transition ${
                    selectedCategory.name===category.name
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="text-3xl">
                    {category.emoji}
                  </div>

                  <div className="mt-2 font-medium">
                    {category.name}
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <FileText
              className="text-pink-500"
              size={22}
            />

            <input
              type="text"
              placeholder="Описание (необязательно)"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <Calendar
              className="text-pink-500"
              size={22}
            />

            <span className="text-gray-500">
              Сегодня
            </span>
          </div>

          <button
            onClick={addTransaction}
            className="gradient-card shadow-pink w-full rounded-2xl py-4 text-lg font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Добавить операцию
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-gray-200 py-4 font-medium transition hover:bg-gray-50"
          >
            Отмена
          </button>

          <div className="h-6"/>

        </div>

      </motion.div>
    </div>
  );
}