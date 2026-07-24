"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: "green" | "yellow" | "red" | "pink";
  height?: number;
}

export default function ProgressBar({
  value,
  color = "pink",
  height = 12,
}: ProgressBarProps) {
  const percent = Math.min(Math.max(value, 0), 100);

  const colors = {
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    yellow: "from-yellow-400 to-orange-400",
    red: "from-red-500 to-rose-500",
  };

  return (
    <div
      className="overflow-hidden rounded-full bg-pink-100"
      style={{ height }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8 }}
        className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
      />
    </div>
  );
}