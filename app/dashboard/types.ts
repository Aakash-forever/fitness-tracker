export type ActivityDay = {
  day: string;
  value: number;
};

export type WeeklyMetric = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type DailyWorkout = {
  date: string; // ISO date (YYYY-MM-DD)
  sessions: number;
  minutes: number;
  volumeKg: number;
  focus?: string;
  caption?: string;
};

export type DashboardData = {
  weeklyActivity: ActivityDay[];
  weeklyMetrics: WeeklyMetric[];
  userName?: string;
  dailyWorkouts: DailyWorkout[];
};
