import { Transaction } from "../types/transaction";

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: "Кофе",
    amount: 145,
    type: "expense",
    date: "Сегодня",
  },
  {
    id: 2,
    title: "Бензин",
    amount: 1200,
    type: "expense",
    date: "Сегодня",
  },
  {
    id: 3,
    title: "Зарплата",
    amount: 40000,
    type: "income",
    date: "Вчера",
  },
];