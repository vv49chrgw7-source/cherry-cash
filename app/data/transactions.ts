import { Transaction } from "../types/transaction";

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: "Капучино",
    category: "Кофе",
    emoji: "☕",
    amount: 145,
    type: "expense",
    date: "Сегодня",
  },
  {
    id: 2,
    title: "АЗС WOG",
    category: "Бензин",
    emoji: "⛽",
    amount: 1200,
    type: "expense",
    date: "Сегодня",
  },
  {
    id: 3,
    title: "Зарплата за июль",
    category: "Зарплата",
    emoji: "💼",
    amount: 40000,
    type: "income",
    date: "Вчера",
  },
];