"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import GlassCard from "./GlassCard";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard className={className}>
        {children}
      </GlassCard>
    </motion.div>
  );
}