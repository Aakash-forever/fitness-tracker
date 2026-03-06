import { useCallback, useEffect, useState } from "react";
import type React from "react";
import { calculateWeekly, type WeeklyDerivation } from "./weeklyCalculations";
import type { DashboardData, DailyWorkout, ActivityDay, WeeklyMetric } from "./types";

const EMPTY_DATA: DashboardData = {
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
    { label: "Avg Duration", value: "0 min" },
    { label: "Peak Day", value: "—" },
  ],
  userName: "Athlete",
  dailyWorkouts: [],
};

type DailyUpdatePayload = WeeklyDerivation & { dailyWorkouts: DailyWorkout[] };

export function useDashboardState() {
  const [userName, setUserName] = useState(EMPTY_DATA.userName);
  const [dailyWorkouts, setDailyWorkouts] = useState<DailyWorkout[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<ActivityDay[]>(EMPTY_DATA.weeklyActivity);
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyMetric[]>(EMPTY_DATA.weeklyMetrics);
  const [loading, setLoading] = useState(true);

  const syncDerived = useCallback((dailies: DailyWorkout[]) => {
    const derived = calculateWeekly(dailies);
    setDailyWorkouts(dailies);
    setWeeklyActivity(derived.weeklyActivity);
    setWeeklyMetrics(derived.weeklyMetrics);
    return derived;
  }, []);

  const persistState = useCallback(
    (dailies: DailyWorkout[]) => {
    const derived = syncDerived(dailies);
    const saved: DashboardData = {
      userName: userName?.trim() || "Athlete",
      weeklyActivity: derived.weeklyActivity,
      weeklyMetrics: derived.weeklyMetrics,
      dailyWorkouts: dailies,
    };
    localStorage.setItem("dashboardData", JSON.stringify(saved));
    },
    [syncDerived, userName]
  );

  useEffect(() => {
    const saved = localStorage.getItem("dashboardData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DashboardData;
        setUserName(parsed.userName ?? EMPTY_DATA.userName);
        syncDerived(parsed.dailyWorkouts ?? []);
      } catch {
        syncDerived([]);
      }
    } else {
      syncDerived([]);
    }
    setLoading(false);
  }, []);

  const handleDailyUpdate = useCallback(
    (payload: DailyUpdatePayload) => persistState(payload.dailyWorkouts),
    [persistState]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      persistState(dailyWorkouts);
    },
    [dailyWorkouts, persistState]
  );

  return {
    userName,
    setUserName,
    dailyWorkouts,
    weeklyActivity,
    weeklyMetrics,
    loading,
    handleDailyUpdate,
    handleSubmit,
  };
}

export { EMPTY_DATA };
