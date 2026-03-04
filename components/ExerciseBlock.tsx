type Set = {
  reps: number;
  weight: number;
  drop?: boolean;
};

export type Exercise = {
  name: string;
  sets: Set[];
};

type ExerciseBlockProps = {
  exercises: Exercise[];
};

export default function ExerciseBlock({ exercises }: ExerciseBlockProps) {
  if (!exercises.length) {
    return (
      <div className="bg-[#0F0F0F] p-8 rounded-xl border border-white/10 text-white/60">
        No exercises yet. Add movements to see them here.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {exercises.map((exercise, i) => (
        <div
          key={i}
          className="bg-[#0F0F0F] p-8 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-semibold mb-6">
            {exercise.name}
          </h2>

          <div className="space-y-4">
            {exercise.sets.map((set, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-black p-4 rounded-lg border border-white/5"
              >
                <span>Set {index + 1}</span>
                <span>{set.reps} reps</span>
                <span>{set.weight} kg</span>
                {set.drop && (
                  <span className="text-[#39FF14] text-sm">
                    Drop Set
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
