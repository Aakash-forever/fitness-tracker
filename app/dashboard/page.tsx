"use client";

import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const weeklyActivity = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 68 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 91 },
    { day: "Fri", value: 73 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 60 },
  ];

  const dailyProgress = {
    score: 87,
    completed: 8700,
    goal: 10000,
  };

  const maxActivityValue = Math.max(...weeklyActivity.map((d) => d.value));

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-14">

      <h1 className="text-4xl font-semibold tracking-tight">
        Performance Command
      </h1>

      <div className="grid grid-cols-2 gap-10">

        <Card title="Daily Performance">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="flex items-center justify-center">

              <div className="relative w-56 h-56 flex items-center justify-center">

                <div
                  className="
                    absolute inset-0 rounded-full
                    border border-[#F59E0B]/30
                    shadow-[0_0_40px_rgba(245,158,11,0.25)]
                  "
                />

                <div
                  className="
                    w-44 h-44 rounded-full
                    bg-linear-to-b from-[#161B22] to-[#0F1318]
                    border border-white/5
                    flex flex-col items-center justify-center
                  "
                >
                  <div
                    className="
                      text-5xl font-semibold
                      bg-linear-to-r from-[#F59E0B] to-[#FDBA74]
                      bg-clip-text text-transparent
                    "
                  >
                    {dailyProgress.score}
                  </div>

                  <div className="text-xs tracking-widest uppercase text-white/50 mt-2">
                    Performance
                  </div>
                </div>

              </div>

            </div>

            <div className="flex-1 space-y-5">

              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Daily progress</span>
                <span className="text-white">
                  {dailyProgress.completed.toLocaleString()} /{" "}
                  {dailyProgress.goal.toLocaleString()} steps
                </span>
              </div>

              <div className="relative h-3 rounded-full bg-white/5 overflow-hidden border border-white/5">
                <div
                  className={`
                    absolute inset-y-0 left-0
                    bg-linear-to-r from-[#F59E0B] to-[#FDBA74]
                    shadow-[0_0_20px_rgba(245,158,11,0.45)]
                    transition-all duration-700 ease-out
                    ${animate ? "w-full" : "w-0"}
                  `}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round((dailyProgress.completed / dailyProgress.goal) * 100)
                    )}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[11px] uppercase tracking-wide text-white/50">Trend</div>
                  <div className="flex items-center gap-2 mt-1 text-[#F59E0B] font-semibold">
                    ▲ 6% <span className="text-white/60 text-xs">vs yesterday</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[11px] uppercase tracking-wide text-white/50">Remaining</div>
                  <div className="text-white font-semibold mt-1">
                    {Math.max(dailyProgress.goal - dailyProgress.completed, 0).toLocaleString()} steps
                  </div>
                </div>
              </div>

            </div>

          </div>

        </Card>

        <Card title="Weekly Metrics">

          <div className="grid grid-cols-2 gap-8 text-sm">

            <div>
              <div className="text-3xl font-semibold">
                4
              </div>
              <div className="text-white/50">
                Workouts
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold text-[#F59E0B]">
                18,200kg
              </div>
              <div className="text-white/50">
                Total Volume
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold">
                10.3
              </div>
              <div className="text-white/50">
                Avg Reps
              </div>
            </div>

            <div>
              <div className="text-3xl font-semibold">
                Thursday
              </div>
              <div className="text-white/50">
                Peak Day
              </div>
            </div>

          </div>

        </Card>

        <Card title="Activity Matrix">

          <div className="relative h-64 flex items-end gap-5">
            <div className="absolute inset-0 grid grid-rows-4 pointer-events-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-white/5 first:border-t"
                />
              ))}
            </div>

            {weeklyActivity.map((item) => {
              const height = (item.value / maxActivityValue) * 100;

              return (
                <div
                  key={item.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="relative w-full h-48 bg-white/5 rounded-lg border border-white/5 overflow-hidden" style={{ maxWidth: "56px" }}>
                    <div
                      className={`
                        absolute bottom-0 left-0 right-0
                        bg-linear-to-t from-[#F59E0B] to-[#FDBA74]
                        shadow-[0_8px_22px_rgba(245,158,11,0.35)]
                        rounded-t-md
                        origin-bottom
                        transition-transform duration-700 ease-out delay-100
                        ${animate ? "scale-y-100" : "scale-y-0"}
                      `}
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <div className="text-xs text-white/60">{item.day}</div>
                  <div className="text-[11px] text-white/40">
                    {item.value} min
                  </div>
                </div>
              );
            })}
          </div>

        </Card>

        <Card title="Tactical Queue">

          <div className="space-y-4 text-sm">

            {[
              { name: "Tactical Rucking", value: "3.5 km" },
              { name: "Leg Day", value: "60 min" },
              { name: "Core Strength", value: "45 min" },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  flex justify-between items-center
                  bg-[#161B22]
                  px-4 py-3 rounded-lg
                  border border-white/5
                  hover:border-[#F59E0B]/40
                  transition-all duration-300
                "
              >
                <span>{item.name}</span>
                <span className="text-[#F59E0B]">
                  {item.value}
                </span>
              </div>
            ))}

          </div>

        </Card>

      </div>
    </div>
  );
}
