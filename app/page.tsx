"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dumbbell,
  ArrowDown,
  Clock,
  Flame,
  Star,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Workout } from "@/context/FitLogContext";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Challenge C1: Sort Functionality
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Requirement 2: Hero / Banner Section */}
        <section className="bg-[#12141a] rounded-3xl p-6 md:p-12 border border-gray-800/80 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl z-10">
            <p className="text-[#ccff00] text-xs md:text-sm font-semibold uppercase tracking-widest mb-3">
              WORKOUT LIBRARY
            </p>
            <h1 className="font-oswald text-4xl md:text-6xl font-bold uppercase text-white tracking-wide leading-tight mb-4">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-full hover:bg-[#b8e600] transition-colors"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          {/* Banner Image Right */}
          <div className="relative w-full md:w-[420px] h-[280px] md:h-[340px] flex justify-center items-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
                alt="Gym Equipment"
                fill
                className="object-cover rounded-2xl opacity-90 hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </section>

        {/* Requirement 3: The Library Section */}
        <section id="library" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-white tracking-wide">
                THE LIBRARY
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {/* Challenge C1: Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                Sort By
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "duration" | "calories" | "rating",
                    )
                  }
                  className="bg-[#12141a] border border-gray-800 text-white text-sm rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-[#ccff00] mb-4" />
              <p className="text-sm">Loading workouts library...</p>
            </div>
          ) : (
            /* Workout Grid (3x4 on large screens) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedWorkouts.map((workout) => {
                const id = workout._id || workout.id;
                return (
                  <Link
                    key={id}
                    href={`/workout/${id}`}
                    className="group bg-[#12141a] rounded-2xl border border-gray-800/80 overflow-hidden hover:border-gray-700 transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Image */}
                      <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                        <Image
                          src={
                            workout.image ||
                            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
                          }
                          alt={workout.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category Tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          {workout.category?.map((cat, idx) => (
                            <span
                              key={idx}
                              className="bg-[#ccff00] text-black font-bold text-[10px] uppercase px-2 py-0.5 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-1 group-hover:text-[#ccff00] transition-colors">
                          {workout.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-4 line-clamp-1">
                          {workout.equipment}
                        </p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="px-5 pb-5 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.calories} kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
