"use client";

import { TransactionsProvider } from "./context/TransactionsContext";
import { GoalsProvider } from "./context/GoalsContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <GoalsProvider>
        {children}
      </GoalsProvider>
    </TransactionsProvider>
  );
}