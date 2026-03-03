import ExerciseBlock from "@/components/ExerciseBlock";

export default function WorkoutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Daily Exercise Tracker
      </h1>

      <ExerciseBlock />
    </div>
  );
}