"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-gray-800/60 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded bg-[#ccff00] text-black">
            <Dumbbell className="w-5 h-5 fill-current" />
          </div>
          <span className="font-oswald tracking-wider text-xl font-bold text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-[#12141a] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              isWorkoutsActive
                ? "bg-[#ccff00] text-black font-semibold shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black font-semibold shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold px-2.5 py-0.5 rounded-full text-xs min-w-[20px] text-center">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity"
          >
            <span>Saved</span>
            <span className="border border-gray-600 text-gray-300 font-bold px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
