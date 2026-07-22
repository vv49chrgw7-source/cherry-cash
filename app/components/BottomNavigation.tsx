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
import { motion } from "framer-motion";

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

  const navItem = (
    href: string,
    icon: React.ReactNode,
    label: string
  ) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className="relative flex flex-col items-center justify-center gap-1"
      >
        {active && (
          <motion.div
            layoutId="activeTab"
            className="absolute -top-2 h-14 w-14 rounded-2xl bg-pink-100"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          />
        )}

        <div
          className={`relative z-10 transition-all duration-300 ${
            active
              ? "scale-110 text-pink-600"
              : "text-gray-400 hover:scale-105 hover:text-pink-500"
          }`}
        >
          {icon}
        </div>

        <span
          className={`relative z-10 text-[11px] font-medium ${
            active
              ? "text-pink-600"
              : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed bottom-5 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2">
        <div className="glass shadow-pink flex h-20 items-center justify-between rounded-[32px] border border-white/40 px-6">

          {navItem("/", <House size={22} />, "Главная")}

          {navItem(
            "/statistics",
            <ChartPie size={22} />,
            "Статистика"
          )}

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{
              scale: 1.08,
              rotate: 90,
            }}
            onClick={() => {
              if (pathname === "/goals") {
                openGoalModal();
              } else {
                openTransactionModal("expense");
              }
            }}
            className="gradient-card shadow-pink -mt-12 flex h-18 w-18 items-center justify-center rounded-full border-4 border-white text-white"
          >
            <Plus size={32} strokeWidth={2.8} />
          </motion.button>

          {navItem(
            "/goals",
            <Target size={22} />,
            "Цели"
          )}

          {navItem(
            "/profile",
            <User size={22} />,
            "Профиль"
          )}
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