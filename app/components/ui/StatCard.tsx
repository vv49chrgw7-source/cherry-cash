import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  valueColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  valueColor = "text-gray-900",
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/50 bg-white/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {title}
        </span>

        <div className="rounded-2xl bg-pink-100 p-3">
          {icon}
        </div>
      </div>

      <h2 className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </h2>
    </div>
  );
}