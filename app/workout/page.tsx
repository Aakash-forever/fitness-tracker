"use client";

import ExerciseBlock from "@/components/workout/ExerciseBlock";
import type { Exercise } from "@/components/workout/ExerciseBlock";

export default function WorkoutPage() {
  const exercises: Exercise[] = [];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Daily Exercise Tracker
      </h1>

      <ExerciseBlock exercises={exercises} />
    </div>
  );
}
