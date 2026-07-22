"use client";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Calendar,
  CircleDollarSign,
  FileText,
} from "lucide-react";

import { Transaction } from "../types/transaction";
import { useTransactions } from "../context/TransactionsContext";
import { useModal } from "../context/ModalContext";

import {
  expenseCategories,
  incomeCategories,
} from "../data/categories";

interface AddTransactionModalProps {
  onClose: () => void;
  defaultType?: "income" | "expense";
}

export default function AddTransactionModal({
  onClose,
  defaultType = "expense",
}: AddTransactionModalProps) {
const {
  setTransactions,
  updateTransaction,
} = useTransactions();

const {
  editingTransaction,
} = useModal();

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

  useEffect(() => {
  if (!editingTransaction) return;

  setType(editingTransaction.type);
  setAmount(editingTransaction.amount.toString());
  setDescription(editingTransaction.title);

  const currentCategories =
    editingTransaction.type === "income"
      ? incomeCategories
      : expenseCategories;

  const foundCategory =
    currentCategories.find(
      (c) =>
        c.name === editingTransaction.category
    );

  if (foundCategory) {
    setSelectedCategory(foundCategory);
  }
}, [editingTransaction]);

function addTransaction() {
  if (!amount || Number(amount) <= 0) return;

  if (editingTransaction) {
    updateTransaction({
      ...editingTransaction,
      title:
        description.trim() ||
        selectedCategory.name,
      category: selectedCategory.name,
      emoji: selectedCategory.emoji,
      amount: Number(amount),
      type,
    });

    toast.success("🍒 Операция обновлена", {
      description: `${type === "income" ? "+" : "-"}${Number(amount).toLocaleString()} ₴`,
    });

    onClose();
    return;
  }

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

  toast.success("🍒 Операция добавлена", {
    description: `${type === "income" ? "+" : "-"}${Number(amount).toLocaleString()} ₴`,
  });

  onClose();
}

  return (
<div
  className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md"
  onClick={onClose}
>
        <motion.div
      drag="y"
dragConstraints={{ top: 0, bottom: 0 }}
dragElastic={0.2}
onDragEnd={(_, info) => {
  if (info.offset.y > 120) {
    onClose();
  }
}}
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 28,
        }}
        className="glass w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[38px] border border-white/40 p-7 shadow-2xl"
      >
<button
  onClick={onClose}
  className="mx-auto mb-6 block h-1.5 w-16 rounded-full bg-gray-300 transition-colors hover:bg-gray-400 active:bg-gray-500"
/>
        <div className="mb-8 text-center">
          <div className="gradient-card shadow-pink mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl text-3xl text-white">
            {type === "income" ? "💰" : "💸"}
          </div>

<h2 className="text-3xl font-black">
  {editingTransaction
    ? "Редактировать операцию"
    : "Новая операция"}
</h2>

<p className="mt-2 text-sm text-gray-500">
  {editingTransaction
    ? "Измените данные операции"
    : "Добавьте доход или расход"}
</p>
        </div>

        <div className="grid grid-cols-2 rounded-2xl bg-pink-100 p-1">
          <button
            onClick={() => setType("expense")}
            className={`rounded-xl py-3 font-semibold transition-all ${
              type === "expense"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            💸 Расход
          </button>

          <button
            onClick={() => setType("income")}
            className={`rounded-xl py-3 font-semibold transition-all ${
              type === "income"
                ? "bg-white shadow text-green-600"
                : "text-gray-500"
            }`}
          >
            💰 Доход
          </button>
        </div>

        <div className="mt-7 space-y-5">
          <div className="glass flex items-center gap-4 rounded-3xl border border-white/40 px-5 py-5 transition-all focus-within:scale-[1.01] focus-within:shadow-pink">
            <CircleDollarSign
              className="text-pink-500"
              size={24}
            />

            <input
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
            />
          </div>

          <div>
            <p className="mb-4 font-semibold">
              Категория
            </p>

            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`glass rounded-3xl border p-4 transition-all ${
                    selectedCategory.name ===
                    category.name
                      ? "scale-[1.03] border-pink-500 bg-pink-50 shadow-pink"
                      : "border-white/40 hover:scale-[1.02] hover:border-pink-300"
                  }`}
                >
                  <div className="text-4xl">
                    {category.emoji}
                  </div>

                  <div className="mt-3 font-semibold">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
                  <div className="glass flex items-center gap-4 rounded-3xl border border-white/40 px-5 py-5 transition-all focus-within:scale-[1.01] focus-within:shadow-pink">
            <FileText
              className="text-pink-500"
              size={24}
            />

            <input
              type="text"
              placeholder="Описание (необязательно)"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="glass flex items-center gap-4 rounded-3xl border border-white/40 px-5 py-5">
            <Calendar
              className="text-pink-500"
              size={24}
            />

            <span className="font-medium text-gray-500">
              Сегодня
            </span>
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={addTransaction}
            className="gradient-card shadow-pink w-full rounded-3xl py-4 text-lg font-bold text-white"
          >
{editingTransaction
  ? "Сохранить изменения"
  : "Добавить операцию"}
            </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onClose}
            className="glass w-full rounded-3xl border border-white/40 py-4 font-semibold transition-all hover:bg-white/70"
          >
            Отмена
          </motion.button>

          <div className="h-6" />
        </div>
      </motion.div>
      onClick={(e) => e.stopPropagation()}
    </div>
  );
}  