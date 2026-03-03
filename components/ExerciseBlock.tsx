export default function ExerciseBlock() {
  const exercises = [
    {
      name: "Bench Press",
      sets: [
        { reps: 12, weight: 60, drop: false },
        { reps: 10, weight: 70, drop: false },
        { reps: 8, weight: 75, drop: true },
      ],
    },
    {
      name: "Squats",
      sets: [
        { reps: 15, weight: 80, drop: false },
        { reps: 12, weight: 90, drop: false },
      ],
    },
  ];

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