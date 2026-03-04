import { useState } from "react";
import type { WorkoutData } from "./types";

const EMPTY_WORKOUT: WorkoutData = { exercises: [] };

export function useWorkoutData(initialData: WorkoutData = EMPTY_WORKOUT) {
  const [data, setData] = useState<WorkoutData>(initialData);

  return { data, setData };
}
