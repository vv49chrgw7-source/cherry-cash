import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/50
        bg-white/80
        shadow-xl
        backdrop-blur-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}