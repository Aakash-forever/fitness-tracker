export type ActivityDay = {
  day: string;
  value: number;
};

export type DailyProgress = {
  score: number;
  completed: number;
  goal: number;
};

export type WeeklyMetric = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type QueueItem = {
  name: string;
  value: string;
};

export type DashboardData = {
  dailyProgress: DailyProgress;
  weeklyActivity: ActivityDay[];
  weeklyMetrics: WeeklyMetric[];
  tacticalQueue: QueueItem[];
};
