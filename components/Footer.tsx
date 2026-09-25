import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-[#0b0c10] py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#ccff00] text-black">
            <Dumbbell className="w-4 h-4 fill-current" />
          </div>
          <span className="font-oswald tracking-wider text-lg font-bold text-white">
            FITLOG
          </span>
        </Link>

        {/* Right Copyright Line */}
        <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
