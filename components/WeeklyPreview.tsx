import SectionCard from "./SectionCard";

export default function WeeklyPreview() {
  const weeks = [
    { week: "Week 1", workouts: 4, volume: 18200 },
    { week: "Week 2", workouts: 5, volume: 21400 },
    { week: "Week 3", workouts: 3, volume: 15000 },
  ];

  return (
    <SectionCard title="Weekly Overview">
      <div className="grid grid-cols-3 gap-6">
        {weeks.map((w, i) => (
          <div
            key={i}
            className="p-6 bg-black border border-white/10 rounded-lg"
          >
            <div className="text-sm text-white/50">{w.week}</div>
            <div className="text-lg font-semibold mt-2">
              {w.workouts} Workouts
            </div>
            <div className="text-[#39FF14] mt-1">
              {w.volume} kg volume
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}