import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-44 bg-[#121821] px-5 py-8 border-r border-white/5">
      <h1 className="text-lg font-semibold tracking-wide mb-10">
        VYRA
      </h1>

      <nav className="flex flex-col gap-5 text-xs text-white/60">
        <Link
          href="/"
          className="hover:text-[#5EEAD4] transition-colors"
        >
          Dashboard
        </Link>

        <Link
          href="/workout"
          className="hover:text-[#5EEAD4] transition-colors"
        >
          Workout
        </Link>

        <Link
          href="/analytics"
          className="hover:text-[#5EEAD4] transition-colors"
        >
          Analytics
        </Link>
      </nav>
    </aside>
  );
}