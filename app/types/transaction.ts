export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;

  title: string;

  category: string;

  emoji: string;

  amount: number;

  type: TransactionType;

  date: string;
}