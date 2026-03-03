export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md
        bg-[#161B22]
        before:absolute before:inset-0
        before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]
        before:animate-[shimmer_1.5s_infinite]
        before:bg-size-[400px_100%]
        ${className}
      `}
    />
  );
}