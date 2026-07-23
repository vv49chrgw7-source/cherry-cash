import { Budget } from "../types/budget";

export const initialBudgets: Budget[] = [
  {
    id: 1,
    category: "Еда",
    emoji: "🍔",
    color: "#EC4899",
    limit: 5000,
  },
  {
    id: 2,
    category: "Топливо",
    emoji: "⛽",
    color: "#10B981",
    limit: 7000,
  },
  {
    id: 3,
    category: "Развлечения",
    emoji: "🎮",
    color: "#8B5CF6",
    limit: 3000,
  },
];