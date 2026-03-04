import { useState } from "react";
import type { BMIData } from "./types";

const EMPTY_BMI: BMIData = {
  heightCm: 0,
  weightKg: 0,
  bmi: 0,
  category: "Not calculated",
};

export function useAnalyticsData(initial: BMIData = EMPTY_BMI) {
  const [data, setData] = useState<BMIData>(initial);

  return { data, setData };
}
