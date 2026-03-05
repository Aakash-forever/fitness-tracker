"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {LayoutDashboard, Dumbbell, BarChart3, Search,} from "lucide-react";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workout", href: "/workout", icon: Dumbbell },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Search", href: "/search", icon: Search },
  ];

  return (
    <aside className="w-60 bg-linear-to-b from-[#11151B] to-[#0E1117] border-r border-white/5 p-8">
      <div className="mb-12">
        <Logo />
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 group
                ${
                  isActive
                    ? "bg-[#161B22] text-[#F59E0B]"
                    : "text-white/60 hover:bg-[#161B22] hover:text-white"
                }
              `}
            >
              <span
                className="
                  absolute inset-0 rounded-lg
                  border border-[#F59E0B]/40
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
              />

              <Icon size={18} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
