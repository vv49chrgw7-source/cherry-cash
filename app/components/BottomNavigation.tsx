"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ChartPie,
  Target,
  Plus,
  User,
} from "lucide-react";

import AddTransactionModal from "./AddTransactionModal";
import AddGoalModal from "./AddGoalModal";

import { useModal } from "../context/ModalContext";

export default function BottomNavigation() {
  const pathname = usePathname();

  const {
    modal,
    transactionType,
    openTransactionModal,
    openGoalModal,
    closeModal,
  } = useModal();

  return (
    <>
      <nav className="fixed bottom-5 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2">
        <div className="glass flex h-20 items-center justify-between rounded-[30px] px-5 shadow-pink">

          <Link
            href="/"
            className={`flex flex-col items-center gap-1 transition hover:scale-110 ${
              pathname === "/"
                ? "text-pink-600"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <House size={22} />
            <span className="text-[11px]">
              Главная
            </span>
          </Link>

          <Link
            href="/statistics"
            className={`flex flex-col items-center gap-1 transition hover:scale-110 ${
              pathname === "/statistics"
                ? "text-pink-600"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <ChartPie size={22} />
            <span className="text-[11px]">
              Статистика
            </span>
          </Link>

          <button
            onClick={() => {
              if (pathname === "/goals") {
                openGoalModal();
              } else {
                openTransactionModal("expense");
              }
            }}
            className="gradient-card shadow-pink -mt-12 flex h-18 w-18 items-center justify-center rounded-full text-white transition duration-200 hover:scale-105 active:scale-95"
          >
            <Plus size={32} strokeWidth={2.8} />
          </button>

          <Link
            href="/goals"
            className={`flex flex-col items-center gap-1 transition hover:scale-110 ${
              pathname === "/goals"
                ? "text-pink-600"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <Target size={22} />
            <span className="text-[11px]">
              Цели
            </span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 transition hover:scale-110 ${
              pathname === "/profile"
                ? "text-pink-600"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <User size={22} />
            <span className="text-[11px]">
              Профиль
            </span>
          </Link>

        </div>
      </nav>

      {modal === "transaction" && (
        <AddTransactionModal
          defaultType={transactionType}
          onClose={closeModal}
        />
      )}

      {modal === "goal" && (
        <AddGoalModal
          onClose={closeModal}
        />
      )}
    </>
  );
}