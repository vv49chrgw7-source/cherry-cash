export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;

  title: string;

  category: string;

  emoji: string;

  amount: number;

  type: TransactionType;

  date: string; // ISO-строка, например: 2026-07-22T14:30:00.000Z
}