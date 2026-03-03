import SectionCard from "@/components/SectionCard";

export default function SearchPage() {
  const recent = ["Bench Press", "Deadlift", "VO2 Max", "Zone 2", "Hypertrophy Split"];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-semibold tracking-tight">
        Search
      </h1>

      <SectionCard title="Find a workout, lift, or topic">
        <div className="flex flex-col gap-4">
          <input
            placeholder="Search movements, plans, or analytics..."
            className="bg-black/60 p-4 rounded-lg border border-white/10 focus:border-[#F59E0B]/60 outline-none transition text-base"
          />

          <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
            {recent.map((item) => (
              <div
                key={item}
                className="bg-[#0E0E0E] border border-white/10 rounded-lg px-4 py-3 hover:border-[#F59E0B]/50 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
