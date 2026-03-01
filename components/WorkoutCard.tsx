type Props = {
  title: string;
  reps: string;
};

export default function WorkoutCard({ title, reps }: Props) {
  return (
    <div className="bg-[#111826] p-6 rounded-2xl border border-[#1f2a3d] flex justify-between items-center text-[#e9f4ff]">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-[#8fa2c3] text-sm">{reps}</p>
      </div>
      <button className="bg-[#5EEAD4] px-4 py-2 rounded-lg text-black font-medium hover:bg-[#7af2dc] transition">
        Start
      </button>
    </div>
  );
}
