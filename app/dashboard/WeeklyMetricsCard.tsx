import Card from "@/components/Card";
import type { WeeklyMetric } from "./types";

type WeeklyMetricsCardProps = {
  metrics: WeeklyMetric[];
};

export default function WeeklyMetricsCard({ metrics }: WeeklyMetricsCardProps) {
  return (
    <Card title="Weekly Metrics">
      <div className="grid grid-cols-2 gap-8 text-sm">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div
              className={`text-3xl font-semibold ${
                metric.highlight ? "text-[#F59E0B]" : ""
              }`}
            >
              {metric.value}
            </div>
            <div className="text-white/50">{metric.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
