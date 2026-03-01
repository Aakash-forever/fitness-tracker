import KPIcard from "@/components/KPIcard";
import LineChartCard from "@/components/LineChartCard";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">
          Train with clarity.
        </h1>
        <p className="text-white/50 mt-3 text-sm">🔥 4 Day Streak</p>
      </section>

      <section className="flex justify-center">
        <div className="w-56 h-56 rounded-full border border-[#5EEAD4]/30 flex flex-col items-center justify-center">
          <span className="text-6xl font-semibold">82</span>
          <span className="text-sm text-white/50 mt-2">Daily Score</span>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-6">
        <KPIcard title="Steps" value="8,245" change="+4%" />
        <KPIcard title="Calories" value="520 kcal" change="+2%" />
        <KPIcard title="Active Minutes" value="75 min" change="+6%" />
        <KPIcard title="Recovery" value="82%" change="+1%" />
      </section>

      <LineChartCard />
    </div>
  );
}
