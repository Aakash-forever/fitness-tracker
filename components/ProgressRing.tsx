export default function ProgressRing() {
  return (
    <div className="flex items-center justify-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#1e293b"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#22d3ee"
            strokeWidth="12"
            fill="none"
            strokeDasharray="351"
            strokeDashoffset="120"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          75%
        </div>
      </div>
    </div>
  );
}