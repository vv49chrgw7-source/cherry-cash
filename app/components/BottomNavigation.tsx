"use client";

import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { Transaction } from "../types/transaction";

interface BottomNavigationProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function BottomNavigation({
  transactions,
  setTransactions,
}: BottomNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 border-t border-pink-100 bg-white shadow-xl">
        <div className="mx-auto flex max-w-md items-center justify-around py-4">

          <button className="text-2xl">
            🏠
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="-mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#D81B60] text-4xl text-white shadow-2xl transition hover:scale-105"
          >
            +
          </button>

          <button className="text-2xl">
            👤
          </button>

        </div>
      </nav>

      {isOpen && (
        <AddTransactionModal
          transactions={transactions}
          setTransactions={setTransactions}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}