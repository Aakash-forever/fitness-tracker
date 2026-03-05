"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STORAGE_KEY = "dashboardData";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [stepGoal, setStepGoal] = useState<number | "">("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const goalNumber = Number(stepGoal) || 0;

    const dataToSave = {
      dailyProgress: { score: 0, completed: 0, goal: goalNumber },
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
      userName: name || "Athlete",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0D12] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#0F1118] border border-white/10 rounded-2xl p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="space-y-2">
          <label className="text-sm text-white/70">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/60 p-4 rounded-lg border border-white/10 focus:border-[#F59E0B]/60 outline-none transition"
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Daily step goal</label>
          <input
            type="number"
            value={stepGoal}
            onChange={(e) => setStepGoal(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full bg-black/60 p-4 rounded-lg border border-white/10 focus:border-[#F59E0B]/60 outline-none transition"
            placeholder="e.g. 10000"
            min={0}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-[#F59E0B] to-[#FDBA74] text-black font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Save and Go to Dashboard
        </button>
      </form>
    </div>
  );
}
