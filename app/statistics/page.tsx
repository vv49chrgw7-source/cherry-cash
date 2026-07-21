"use client";

import StatisticsSummary from "../components/statistics/StatisticsSummary";
import ExpensePieChart from "../components/statistics/ExpensePieChart";
import BottomNavigation from "../components/BottomNavigation";
import { useTransactions } from "../context/TransactionsContext";

export default function StatisticsPage() {
  const {
    transactions,
    balance,
    income,
    expense,
  } = useTransactions();

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const groupedExpenses = expenseTransactions.reduce<
    Record<
      string,
      {
        name: string;
        emoji: string;
        value: number;
      }
    >
  >((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        name: transaction.category,
        emoji: transaction.emoji,
        value: 0,
      };
    }

    acc[transaction.category].value += transaction.amount;

    return acc;
  }, {});

  const chartData = Object.values(groupedExpenses).sort(
    (a, b) => b.value - a.value
  );

  return (
    <main className="page-padding min-h-screen pb-40">
      <h1 className="mb-8 text-4xl font-black">
        📊 Статистика
      </h1>

      <StatisticsSummary
        balance={balance}
        income={income}
        expense={expense}
      />

      <div className="mt-8">
        <ExpensePieChart data={chartData} />
      </div>

      <BottomNavigation />
    </main>
  );
}