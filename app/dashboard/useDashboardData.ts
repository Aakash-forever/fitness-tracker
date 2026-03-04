import { useState } from "react";
import type { DashboardData } from "./types";

// Simple default values so the UI renders empty graphs instead of failing.
const EMPTY_DATA: DashboardData = {
  dailyProgress: { score: 0, completed: 0, goal: 0 },
  weeklyActivity: [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
  ],
  weeklyMetrics: [
    { label: "Workouts", value: "0" },
    { label: "Total Volume", value: "0 kg" },
    { label: "Avg Reps", value: "0" },
    { label: "Peak Day", value: "—" },
  ],
  tacticalQueue: [],
};

export function useDashboardData(initialData: DashboardData = EMPTY_DATA) {
  const [data, setData] = useState<DashboardData>(initialData);
  return { data, setData };
}
