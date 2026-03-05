import Card from "@/components/ui/Card";
import type { DailyProgress } from "./types";

type DailyPerformanceCardProps = {
  progress: DailyProgress;
  animate: boolean;
};

export default function DailyPerformanceCard({
  progress,
  animate,
}: DailyPerformanceCardProps) {
  const completionPercent =
    progress.goal > 0
      ? Math.min(100, Math.round((progress.completed / progress.goal) * 100))
      : 0;

  return (
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
                {progress.score}
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
              {progress.completed.toLocaleString()} /{" "}
              {progress.goal.toLocaleString()} steps
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
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wide text-white/50">
                Trend
              </div>
              <div className="flex items-center gap-2 mt-1 text-[#F59E0B] font-semibold">
                ▲ 6% <span className="text-white/60 text-xs">vs yesterday</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wide text-white/50">
                Remaining
              </div>
              <div className="text-white font-semibold mt-1">
                {Math.max(progress.goal - progress.completed, 0).toLocaleString()} steps
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
