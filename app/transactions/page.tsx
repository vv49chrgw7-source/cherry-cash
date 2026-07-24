"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import TransactionCard from "../components/TransactionCard";
import BottomNavigation from "../components/BottomNavigation";

import { useTransactions } from "../context/TransactionsContext";
import { useCurrency } from "../context/CurrencyContext";
import { useExchangeRates } from "../context/ExchangeRateContext";
import { formatMoney } from "../utils/formatMoney";

export default function TransactionsPage() {
  const { transactions, setTransactions } = useTransactions();

  const { currency } = useCurrency();
const { rates } = useExchangeRates();

  const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<
  "all" | "income" | "expense"
>("all");

const [sortBy, setSortBy] = useState<
  "newest" | "oldest" | "amountAsc" | "amountDesc"
>("newest");

  function deleteTransaction(id: number) {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  }

const filteredTransactions = useMemo(() => {
  let list = transactions.filter((transaction) =>
    transaction.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (typeFilter !== "all") {
    list = list.filter(
      (transaction) => transaction.type === typeFilter
    );
  }

  switch (sortBy) {
    case "oldest":
      list = [...list].sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
      break;

    case "amountAsc":
      list = [...list].sort(
        (a, b) => a.amount - b.amount
      );
      break;

    case "amountDesc":
      list = [...list].sort(
        (a, b) => b.amount - a.amount
      );
      break;

    default:
      list = [...list].sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }

  return list;
}, [transactions, search, typeFilter, sortBy]);

const totalIncome = filteredTransactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = filteredTransactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="page-padding min-h-screen pb-40">
      <h1 className="text-4xl font-black">
        Все операции
      </h1>

      <p className="mt-2 text-gray-500">
        Полная история ваших транзакций
      </p>

      <div className="glass mt-8 flex items-center gap-3 rounded-2xl px-4 py-3">
        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Поиск операций..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>
<div className="mt-5 space-y-4">

  <div className="flex gap-2 overflow-x-auto pb-1">

    {[
      { value: "all", label: "Все" },
      { value: "income", label: "Доходы" },
      { value: "expense", label: "Расходы" },
    ].map((item) => (
      <button
        key={item.value}
        onClick={() =>
          setTypeFilter(
            item.value as
              | "all"
              | "income"
              | "expense"
          )
        }
        className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
          typeFilter === item.value
            ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
            : "glass text-gray-500 hover:bg-pink-50"
        }`}
      >
        {item.label}
      </button>
    ))}

  </div>

  <div className="flex gap-2 overflow-x-auto pb-1">

    {[
      {
        value: "newest",
        label: "Новые",
      },
      {
        value: "oldest",
        label: "Старые",
      },
      {
        value: "amountDesc",
        label: "Сумма ↓",
      },
      {
        value: "amountAsc",
        label: "Сумма ↑",
      },
    ].map((item) => (
      <button
        key={item.value}
        onClick={() =>
          setSortBy(
            item.value as
              | "newest"
              | "oldest"
              | "amountAsc"
              | "amountDesc"
          )
        }
        className={`whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
          sortBy === item.value
            ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
            : "glass text-gray-500 hover:bg-pink-50"
        }`}
      >
        {item.label}
      </button>
    ))}

  </div>

</div>
<div className="gradient-card mt-5 rounded-3xl p-6 text-white shadow-pink">

  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold">
      Итоги
    </h2>

    <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
      {filteredTransactions.length} операций
    </span>
  </div>

  <div className="mt-6 grid grid-cols-2 gap-4">

    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <p className="text-sm text-pink-100">
        Доходы
      </p>

<h3 className="mt-2 text-2xl font-black">
  {formatMoney(totalIncome, currency.code, rates)}
</h3>
    </div>

    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <p className="text-sm text-pink-100">
        Расходы
      </p>

<h3 className="mt-2 text-2xl font-black">
  {formatMoney(totalExpense, currency.code, rates)}
</h3>
    </div>

  </div>

</div>
      <div className="mt-8 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          ))}
        </AnimatePresence>
      </div>

      <BottomNavigation />
    </main>
  );
}