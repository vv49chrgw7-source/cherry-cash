"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type ModalType = "transaction" | "goal" | null;
type TransactionType = "income" | "expense";

interface ModalContextType {
  modal: ModalType;
  transactionType: TransactionType;

  openTransactionModal: (
    type?: TransactionType
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

  function openTransactionModal(
    type: TransactionType = "expense"
  ) {
    setTransactionType(type);
    setModal("transaction");
  }

  function openGoalModal() {
    setModal("goal");
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        transactionType,
        openTransactionModal,
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