import Card from "@/components/ui/Card";
import type { DailyWorkout } from "./types";
import { useMemo, useState } from "react";
import { calculateWeekly, type WeeklyDerivation } from "./weeklyCalculations";

type DailyLogCardProps = {
  dailyWorkouts: DailyWorkout[];
  onUpdate: (payload: WeeklyDerivation & { dailyWorkouts: DailyWorkout[] }) => void;
};

export default function DailyLogCard({ dailyWorkouts, onUpdate }: DailyLogCardProps) {
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [entryDate, setEntryDate] = useState(todayIso);
  const [entrySessions, setEntrySessions] = useState(1);
  const [entryMinutes, setEntryMinutes] = useState(45);
  const [entryVolume, setEntryVolume] = useState(0);
  const [entryFocus, setEntryFocus] = useState("Full body");
  const [entryCaption, setEntryCaption] = useState("");

  function handleAddDaily() {
    const newEntry: DailyWorkout = {
      date: entryDate,
      sessions: Math.max(0, Number(entrySessions) || 0),
      minutes: Math.max(0, Number(entryMinutes) || 0),
      volumeKg: Math.max(0, Number(entryVolume) || 0),
      focus: entryFocus.trim(),
      caption: entryCaption.trim(),
    };

    const updated = [...dailyWorkouts.filter((d) => d.date !== newEntry.date), newEntry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const derived = calculateWeekly(updated);
    onUpdate({ dailyWorkouts: updated, ...derived });
  }

  return (
    <Card title="Daily workout log">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm text-white/70">
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Date</span>
            <input
              type="date"
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
            />
          </label>
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Sessions</span>
            <input
              type="number"
              min={0}
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entrySessions}
              onChange={(e) => setEntrySessions(Number(e.target.value))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Minutes</span>
            <input
              type="number"
              min={0}
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entryMinutes}
              onChange={(e) => setEntryMinutes(Number(e.target.value))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Volume (kg)</span>
            <input
              type="number"
              min={0}
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entryVolume}
              onChange={(e) => setEntryVolume(Number(e.target.value))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Focus</span>
            <input
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entryFocus}
              onChange={(e) => setEntryFocus(e.target.value)}
              placeholder="Push / Legs / Conditioning"
            />
          </label>
          <label className="space-y-1">
            <span className="text-white/60 text-xs">Caption</span>
            <input
              className="w-full bg-[#0F1318] border border-white/10 rounded-lg px-3 py-2"
              value={entryCaption}
              onChange={(e) => setEntryCaption(e.target.value)}
              placeholder="Optional notes"
            />
          </label>
          <div className="md:col-span-6 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[#F59E0B] text-black font-semibold hover:brightness-110 transition"
              onClick={handleAddDaily}
            >
              Add daily entry
            </button>
          </div>
        </div>

        {dailyWorkouts.length > 0 && (
          <div className="bg-[#0F1318] border border-white/10 rounded-xl divide-y divide-white/5 text-sm">
            {dailyWorkouts.map((entry) => (
              <div key={entry.date} className="grid grid-cols-6 gap-3 px-4 py-3 text-white/80">
                <div>{entry.date}</div>
                <div>{entry.sessions} sessions</div>
                <div>{entry.minutes} min</div>
                <div>{entry.volumeKg} kg</div>
                <div className="text-white/50">{entry.focus}</div>
                <div className="text-white/50">{entry.caption || "—"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
