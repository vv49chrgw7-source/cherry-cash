"use client";

import { motion } from "framer-motion";
import {
  Trash2,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import { Transaction } from "../types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

export default function TransactionCard({
  transaction,
  onDelete,
}: TransactionCardProps) {
  const income = transaction.type === "income";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="card-hover glass flex items-center justify-between rounded-3xl p-4 shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
            income
              ? "bg-gradient-to-br from-green-100 to-green-200"
              : "bg-gradient-to-br from-pink-100 to-pink-200"
          }`}
        >
          {transaction.emoji}
        </div>

        <div>
          <h3 className="text-[17px] font-semibold text-gray-900">
            {transaction.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div
            className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              income
                ? "bg-green-100 text-green-700"
                : "bg-pink-100 text-pink-700"
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
            className={`text-lg font-bold ${
              income
                ? "text-green-600"
                : "text-pink-600"
            }`}
          >
            {income ? "+" : "-"}
            {transaction.amount.toLocaleString("ru-RU")} ₴
          </p>
        </div>

        <button
          onClick={() => onDelete(transaction.id)}
          className="rounded-xl p-2 text-gray-400 transition-all hover:scale-110 hover:bg-red-50 hover:text-red-500"
          title="Удалить"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}