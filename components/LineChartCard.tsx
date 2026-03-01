export default function LineChartCard() {
  const weeklyData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 85 },
    { day: "Sun", value: 70 },
  ];

  return (
    <div className="bg-[#111826] p-8 rounded-xl border border-[#1f2a3d]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">Weekly Activity</h3>
        <span className="text-xs text-[#8fa2c3]">Last 7 Days</span>
      </div>

      <div className="flex items-end justify-between h-64 gap-6">
        {weeklyData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end flex-1 h-full"
          >
            <div
              className="w-8 bg-[#5EEAD4] rounded-md shadow-[0_0_12px_rgba(94,234,212,0.65)]"
              style={{ height: `${item.value}%` }}
            />
            <span className="text-xs text-[#8fa2c3] mt-4">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
