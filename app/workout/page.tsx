// This page uses React state/hooks, so it must be a client component.
"use client";

import ExerciseBlock from "@/components/ExerciseBlock";
import { useWorkoutData } from "./useWorkoutData";

export default function WorkoutPage() {
  const { data } = useWorkoutData();

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Daily Exercise Tracker
      </h1>

      <ExerciseBlock exercises={data.exercises} />
    </div>
  );
}
