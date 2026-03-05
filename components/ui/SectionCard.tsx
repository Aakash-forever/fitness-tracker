export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0F0F0F] p-8 rounded-xl border border-white/10 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}
