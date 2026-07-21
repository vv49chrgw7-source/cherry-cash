import { Transaction } from "../types/transaction";

interface Props {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <div className="flex justify-between">

        <div>
          <p className="font-semibold">
            {transaction.type === "expense" ? "💸" : "💼"} {transaction.title}
          </p>

          <p className="text-gray-500">
            {transaction.date}
          </p>
        </div>

        <p
          className={`font-bold ${
            transaction.type === "expense"
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {transaction.type === "expense" ? "-" : "+"}
          {transaction.amount.toLocaleString("uk-UA")} ₴
        </p>

      </div>
    </div>
  );
}