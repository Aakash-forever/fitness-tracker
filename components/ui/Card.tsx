export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative
        backdrop-blur-xl
        bg-[rgba(17,21,27,0.6)]
        rounded-2xl
        p-8
        border border-white/5
        shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        transition-all duration-300
        group
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl
          border border-[#F59E0B]/40
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      <div
        className="
          absolute top-0 left-0 w-full h-px
          bg-linear-to-r from-transparent via-[#F59E0B]/50 to-transparent
        "
      />

      <h2 className="text-sm uppercase tracking-[0.2em] text-white/60 mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}
