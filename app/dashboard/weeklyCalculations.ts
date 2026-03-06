import type { ActivityDay, DailyWorkout, WeeklyMetric } from "./types";

export type WeeklyDerivation = {
  weeklyActivity: ActivityDay[];
  weeklyMetrics: WeeklyMetric[];
};

export function calculateWeekly(dailies: DailyWorkout[]): WeeklyDerivation {
  const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activityMap = new Map(dayOrder.map((d) => [d, 0]));

  let totalSessions = 0;
  let totalMinutes = 0;
  let totalVolumeKg = 0;

  dailies.forEach((entry) => {
    const parsed = new Date(`${entry.date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return;
    const day = dayOrder[parsed.getDay()];
    activityMap.set(day, (activityMap.get(day) || 0) + entry.minutes);
    totalSessions += entry.sessions;
    totalMinutes += entry.minutes;
    totalVolumeKg += entry.volumeKg;
  });

  const weeklyActivity = dayOrder.slice(1).concat(dayOrder.slice(0, 1)).map((day) => ({
    day,
    value: activityMap.get(day) || 0,
  }));

  const peak = weeklyActivity.reduce(
    (acc, cur) => (cur.value > acc.value ? cur : acc),
    { day: "—", value: 0 }
  );

  const weeklyMetrics: WeeklyMetric[] = [
    { label: "Workouts", value: totalSessions.toString() },
    { label: "Total Volume", value: `${Math.round(totalVolumeKg)} kg` },
    {
      label: "Avg Duration",
      value: totalSessions ? `${Math.round(totalMinutes / totalSessions)} min` : "0 min",
    },
    { label: "Peak Day", value: peak.value ? peak.day : "—", highlight: true },
  ];

  return { weeklyActivity, weeklyMetrics };
}
