"use client";

import SectionCard from "@/components/ui/SectionCard";
import type { BMIData } from "./types";

const EMPTY_BMI: BMIData = {
  heightCm: 0,
  weightKg: 0,
  bmi: 0,
  category: "Not calculated",
};

export default function AnalyticsPage() {
  const data = EMPTY_BMI;

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Analytics
      </h1>

      <SectionCard title="BMI Calculator">
        <div className="grid grid-cols-2 gap-6">
          <input
            placeholder="Height (cm)"
            className="bg-black/60 p-4 rounded-lg border border-white/10 focus:border-[#F59E0B]/60 outline-none transition"
          />
          <input
            placeholder="Weight (kg)"
            className="bg-black/60 p-4 rounded-lg border border-white/10 focus:border-[#F59E0B]/60 outline-none transition"
          />
        </div>

        <div className="mt-6 text-xl">
          BMI: <span className="text-[#22C55E] font-semibold">{data.bmi}</span>
        </div>
        <div className="text-sm text-white/50">{data.category}</div>
      </SectionCard>
    </div>
  );
}
