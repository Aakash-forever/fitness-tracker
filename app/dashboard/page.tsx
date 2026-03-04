"use client";

import DailyPerformanceCard from "./DailyPerformanceCard";
import WeeklyMetricsCard from "./WeeklyMetricsCard";
import ActivityMatrixCard from "./ActivityMatrixCard";
import TacticalQueueCard from "./TacticalQueueCard";
import { useDashboardData } from "./useDashboardData";

export default function DashboardPage() {
  // Starts with empty/zero data; later you can call setData with user inputs.
  const { data } = useDashboardData();
  const animate = true;

  return (
    <div className="max-w-7xl mx-auto space-y-14">
      <h1 className="text-4xl font-semibold tracking-tight">Performance Command</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <DailyPerformanceCard progress={data.dailyProgress} animate={animate} />
        <WeeklyMetricsCard metrics={data.weeklyMetrics} />
        <ActivityMatrixCard activity={data.weeklyActivity} animate={animate} />
        <TacticalQueueCard items={data.tacticalQueue} />
      </div>
    </div>
  );
}
