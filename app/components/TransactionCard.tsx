"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DeleteTransactionModal from "./DeleteTransactionModal";

import {
  Trash2,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import { Transaction } from "../types/transaction";
import { useModal } from "../context/ModalContext";

function formatDate(date: string) {
  const transactionDate = new Date(date);
  const today = new Date();

  const isToday =
    transactionDate.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    transactionDate.toDateString() === yesterday.toDateString();

  if (isToday) return "Сегодня";
  if (isYesterday) return "Вчера";

  return transactionDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

export default function TransactionCard({
  transaction,
  onDelete,
}: TransactionCardProps) {
  const income = transaction.type === "income";
  const { openEditTransaction } = useModal();
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

return (
  <>
    <motion.div
      layout
  onClick={() => openEditTransaction(transaction)}
  initial={{ opacity: 0, y: 25, scale: 0.97 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{
    opacity: 0,
    scale: 0.9,
    x: 80,
    transition: {
      duration: 0.25,
    },
  }}
whileHover={{
  y: -6,
  scale: 1.02,
}}
  transition={{
    layout: {
      duration: 0.3,
    },
    duration: 0.25,
  }}
        className="glass card-hover group relative overflow-hidden rounded-[30px] border border-white/40 p-5"
    >
      {/* декоративный блик */}
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/20 blur-2xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
className={`flex h-[72px] w-[72px] items-center justify-center rounded-3xl text-4xl shadow-lg ${
  income
    ? "bg-gradient-to-br from-emerald-300 to-green-500 shadow-green-300/40"
    : "bg-gradient-to-br from-pink-300 to-rose-500 shadow-pink-300/40"
}`}
          >
            {transaction.emoji}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {transaction.title}
            </h3>

<div className="mt-2 flex items-center gap-2">
  <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
    {transaction.category}
  </span>

  <span className="text-xs text-gray-400">
    {formatDate(transaction.date)}
  </span>
</div>

          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div
              className={`mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                income
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {income ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowDownRight size={13} />
              )}

              {income ? "Доход" : "Расход"}
            </div>

            <p
className={`text-2xl font-black leading-none tracking-tight ${
  income
    ? "text-emerald-600"
    : "text-rose-600"
}`}
            >
              {income ? "+" : "-"}
              {transaction.amount.toLocaleString("ru-RU")} ₴
            </p>
          </div>

<button
onClick={(e) => {
  e.stopPropagation();
  setShowDeleteModal(true);
}}
className="rounded-2xl p-2 text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-red-50 hover:text-red-500 active:scale-95"
            title="Удалить"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>

    <DeleteTransactionModal
      open={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={() => {
        onDelete(transaction.id);
        setShowDeleteModal(false);
      }}
    />
  </>
);
}