"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Transaction } from "../types/transaction";

type ModalType = "transaction" | "goal" | null;
type TransactionType = "income" | "expense";

interface ModalContextType {
  modal: ModalType;
  transactionType: TransactionType;

  editingTransaction: Transaction | null;

  openTransactionModal: (
    type?: TransactionType
  ) => void;

  openEditTransaction: (
    transaction: Transaction
  ) => void;

  openGoalModal: () => void;

  closeModal: () => void;
}

const ModalContext =
  createContext<ModalContextType | null>(null);

export function ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [modal, setModal] =
    useState<ModalType>(null);

  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  function openTransactionModal(
    type: TransactionType = "expense"
  ) {
    setEditingTransaction(null);
    setTransactionType(type);
    setModal("transaction");
  }

  function openEditTransaction(
    transaction: Transaction
  ) {
    setEditingTransaction(transaction);
    setTransactionType(transaction.type);
    setModal("transaction");
  }

  function openGoalModal() {
    setModal("goal");
  }

  function closeModal() {
    setModal(null);
    setEditingTransaction(null);
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        transactionType,
        editingTransaction,
        openTransactionModal,
        openEditTransaction,
        openGoalModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModal must be used inside ModalProvider"
    );
  }

  return context;
}