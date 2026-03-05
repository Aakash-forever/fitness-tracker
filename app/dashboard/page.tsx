"use client";

import { useEffect, useState } from "react";
import DailyPerformanceCard from "./DailyPerformanceCard";
import WeeklyMetricsCard from "./WeeklyMetricsCard";
import ActivityMatrixCard from "./ActivityMatrixCard";
import TacticalQueueCard from "./TacticalQueueCard";
import Loader from "../loading";
import type { DashboardData } from "./types";

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
  userName: "Athlete",
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const saved = localStorage.getItem("dashboardData");
    if (saved) {
      setTimeout(() => {
        if (!alive) return;
        try {
          const parsed = JSON.parse(saved) as DashboardData;
          setData(parsed);
        } catch {
          setData(EMPTY_DATA);
        }
      }, 0);
    }
    setTimeout(() => {
      if (alive) setLoading(false);
    }, 0);
    return () => {
      alive = false;
    };
  }, []);

  const animate = true;

  return (
    <div className="max-w-7xl mx-auto space-y-14">
      <h1 className="text-4xl font-semibold tracking-tight">Performance Command</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <p className="text-white/60">Welcome back, {data.userName || "Athlete"}.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <DailyPerformanceCard progress={data.dailyProgress} animate={animate} />
            <WeeklyMetricsCard metrics={data.weeklyMetrics} />
            <ActivityMatrixCard activity={data.weeklyActivity} animate={animate} />
            <TacticalQueueCard items={data.tacticalQueue} />
          </div>
        </>
      )}
    </div>
  );
}
