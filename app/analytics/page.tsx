import ProgressRing from "@/components/ProgressRing";
import LineChartCard from "@/components/LineChartCard";

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16">

      <h1 className="text-3xl font-semibold">
        Performance Insights
      </h1>

      <div className="grid grid-cols-2 gap-12">
        <LineChartCard />
        <ProgressRing />
      </div>

      <div className="bg-[#121821] p-8 rounded-xl border border-white/5">
        <p className="text-sm text-white/50">
          7 Day Performance Trend
        </p>
        <h2 className="text-2xl font-semibold mt-3 text-[#FACC15]">
          Improving
        </h2>
      </div>

    </div>
  );
}