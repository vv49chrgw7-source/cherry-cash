"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

interface CategoryData {
  name: string;
  value: number;
  emoji: string;
}

interface ExpensePieChartProps {
  data: CategoryData[];
}

const COLORS = [
  "#ec4899",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#ef4444",
];

export default function ExpensePieChart({
  data,
}: ExpensePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="mb-5 text-xl font-bold">
        Расходы по категориям
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                position="center"
                content={({ viewBox }) => {
                  if (
                    !viewBox ||
                    !("cx" in viewBox) ||
                    !("cy" in viewBox)
                  ) {
                    return null;
                  }

                  return (
                    <g>
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy - 8}
                        textAnchor="middle"
                        fontSize={24}
                        fontWeight={700}
                        fill="#111827"
                      >
                        {total.toLocaleString()} ₴
                      </text>

                      <text
                        x={viewBox.cx}
                        y={viewBox.cy + 18}
                        textAnchor="middle"
                        fontSize={14}
                        fill="#6b7280"
                      >
                        расходов
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => {
          const percent =
            total === 0
              ? 0
              : ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-2xl">
                  {item.emoji}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {item.value.toLocaleString()} ₴
                </div>

                <div className="text-sm text-gray-500">
                  {percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}