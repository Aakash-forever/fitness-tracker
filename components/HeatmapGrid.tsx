export default function HeatmapGrid() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <h3 className="mb-4 font-semibold">Activity Heatmap</h3>
      <div className="grid grid-cols-15 gap-2">
        {Array.from({ length: 90 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded bg-slate-700 hover:bg-cyan-400 transition"
          />
        ))}
      </div>
    </div>
  );
}