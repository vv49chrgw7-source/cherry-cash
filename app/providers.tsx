"use client";

import { Toaster } from "sonner";
import { BudgetsProvider } from "./context/BudgetsContext";

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
    <BudgetsProvider>
      {children}

      <Toaster
        position="top-center"
        richColors
        closeButton
        duration={2500}
        toastOptions={{
          classNames: {
            toast:
              "rounded-3xl border border-white/30 bg-white/90 backdrop-blur-xl shadow-xl",
            title: "font-semibold",
            description: "text-gray-600",
          },
        }}
      />
    </BudgetsProvider>
  </GoalsProvider>
</TransactionsProvider>
  );
}