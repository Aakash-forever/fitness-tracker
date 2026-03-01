type Props = {
  title: string;
  value: string;
  change: string;
};

export default function KPIcard({ title, value, change }: Props) {
  return (
    <div className="bg-[#111826] p-6 rounded-xl border border-[#1f2a3d] hover:border-[#5EEAD4]/50 transition-all">
      <p className="text-xs uppercase tracking-wider text-white/50">
        {title}
      </p>
      <h2 className="text-2xl font-semibold mt-3 text-[#e9f4ff]">
        {value}
      </h2>
      <span className="text-xs text-[#5EEAD4] mt-2 block">
        {change}
      </span>
    </div>
  );
}
