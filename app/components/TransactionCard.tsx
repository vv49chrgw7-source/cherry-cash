import { Transaction } from "../types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

export default function TransactionCard({
  transaction,
  onDelete,
}: TransactionCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow">
      <div>
        <h3 className="font-semibold">{transaction.title}</h3>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`font-bold ${
            transaction.type === "income"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount.toLocaleString("ru-RU")} ₴
        </span>

        <button
          onClick={() => onDelete(transaction.id)}
          className="text-xl transition hover:scale-110"
          title="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}