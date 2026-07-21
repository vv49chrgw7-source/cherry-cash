export interface Goal {
  id: number;
  title: string;
  emoji: string;

  targetAmount: number;
  currentAmount: number;

  color: string;
}