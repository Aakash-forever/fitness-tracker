export default function WorkoutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">

      <h1 className="text-3xl font-semibold">
        Workout Session
      </h1>

      <div className="divide-y divide-white/5 bg-[#121821] rounded-xl border border-white/5">
        {["Push Ups — 3x15", "Squats — 3x20", "Running — 15min"].map(
          (item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-5 hover:bg-white/5 transition"
            >
              <span className="text-sm">{item}</span>
              <span className="text-[#5EEAD4] text-sm">→</span>
            </div>
          )
        )}
      </div>

    </div>
  );
}