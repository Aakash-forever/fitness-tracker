import Card from "@/components/Card";
import type { ActivityDay } from "./types";

type ActivityMatrixCardProps = {
  activity: ActivityDay[];
  animate: boolean;
};

export default function ActivityMatrixCard({
  activity,
  animate,
}: ActivityMatrixCardProps) {
  const maxActivityValue = Math.max(1, ...activity.map((day) => day.value));

  return (
    <Card title="Activity Matrix">
      <div className="relative h-64 flex items-end gap-5">
        <div className="absolute inset-0 grid grid-rows-4 pointer-events-none">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border-b border-white/5 first:border-t" />
          ))}
        </div>

        {activity.map((item) => {
          const heightPercent = (item.value / maxActivityValue) * 100;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="relative w-full h-48 bg-white/5 rounded-lg border border-white/5 overflow-hidden"
                style={{ maxWidth: "56px" }}
              >
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
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <div className="text-xs text-white/60">{item.day}</div>
              <div className="text-[11px] text-white/40">{item.value} min</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
