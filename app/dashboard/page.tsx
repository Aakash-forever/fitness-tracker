"use client";

import WeeklyMetricsCard from "./WeeklyMetricsCard";
import ActivityMatrixCard from "./ActivityMatrixCard";
import Loader from "../loading";
import DailyLogCard from "./DailyPerformanceCard";
import { useDashboardState } from "./useDashboardState";

export default function DashboardPage() {
  const {
    userName,
    setUserName,
    dailyWorkouts,
    weeklyActivity,
    weeklyMetrics,
    loading,
    handleDailyUpdate,
    handleSubmit,
  } = useDashboardState();

  const animate = true;

  return (
    <div className="max-w-7xl mx-auto space-y-14">
      <h1 className="text-4xl font-semibold tracking-tight">Performance Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2 text-sm text-white/70">
            <span className="text-white">Name</span>
            <input
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Athlete"
            />
          </label>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-4">
          <DailyLogCard dailyWorkouts={dailyWorkouts} onUpdate={handleDailyUpdate} />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#F59E0B] text-black font-semibold hover:brightness-110 transition"
          >
            Save dashboard data
          </button>
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <>
          <p className="text-white/60">Welcome back, {userName || "Athlete"}.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <WeeklyMetricsCard metrics={weeklyMetrics} />
            <ActivityMatrixCard activity={weeklyActivity} animate={animate} />
          </div>
        </>
      )}
    </div>
  );
}
