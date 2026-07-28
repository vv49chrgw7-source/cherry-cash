"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { useMoney } from "../../hooks/useMoney";

interface CategoryData {
  name: string;
  value: number;
  emoji: string;
}

interface ExpensePieChartProps {
  data: CategoryData[];
}

const COLORS = [
  "#EC4899",
  "#F97316",
  "#FACC15",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#14B8A6",
  "#EF4444",
];

export default function ExpensePieChart({
  data,
}: ExpensePieChartProps) {
  const money = useMoney();

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass overflow-hidden rounded-[32px] border border-white/40 p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Анализ расходов
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            По категориям
          </h2>
        </div>

        <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
          <PieChartIcon size={24} />
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: "none",
                boxShadow:
                  "0 10px 35px rgba(0,0,0,.08)",
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={82}
              outerRadius={118}
              paddingAngle={5}
              cornerRadius={10}
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
                        y={viewBox.cy - 10}
                        textAnchor="middle"
                        fontSize={28}
                        fontWeight={800}
                        fill="#111827"
                      >
{money.format(total)}
                      </text>

                      <text
                        x={viewBox.cx}
                        y={viewBox.cy + 18}
                        textAnchor="middle"
                        fontSize={14}
                        fill="#9CA3AF"
                      >
                        всего расходов
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-3">
        {data.map((item, index) => {
          const percent =
            total === 0
              ? 0
              : ((item.value / total) * 100).toFixed(1);

          return (
            <motion.div
              key={item.name}
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              className="glass flex items-center justify-between rounded-2xl border border-white/40 p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-4 w-4 rounded-full shadow"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-2xl">
                  {item.emoji}
                </span>

                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {percent}% от расходов
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold">
{money.format(item.value)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}