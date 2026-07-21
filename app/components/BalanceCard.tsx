interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export default function BalanceCard({
  balance,
  income,
  expense,
}: BalanceCardProps) {
  return (
    <div className="mt-8 rounded-[32px] bg-gradient-to-br from-[#D81B60] to-[#FF4F8B] p-8 text-white shadow-2xl">
      <p className="text-pink-100">
        Общий баланс
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {balance.toLocaleString("ru-RU")} ₴
      </h2>

      <div className="mt-8 flex justify-between">
        <div>
          <p className="text-pink-100">
            Доход
          </p>

          <h3 className="mt-1 text-2xl font-semibold">
            {income.toLocaleString("ru-RU")} ₴
          </h3>
        </div>

        <div className="text-right">
          <p className="text-pink-100">
            Расход
          </p>

          <h3 className="mt-1 text-2xl font-semibold">
            {expense.toLocaleString("ru-RU")} ₴
          </h3>
        </div>
      </div>
    </div>
  );
}