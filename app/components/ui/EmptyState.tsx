import GlassCard from "./GlassCard";

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
}

export default function EmptyState({
  emoji,
  title,
  description,
}: EmptyStateProps) {
  return (
    <GlassCard className="py-12 text-center">
      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </GlassCard>
  );
}