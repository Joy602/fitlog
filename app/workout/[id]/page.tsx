"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, Bookmark, Loader2, Star } from "lucide-react";
import { useFitLog, Workout } from "@/context/FitLogContext";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToPlan, addToSaved, plan, saved } = useFitLog();

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${workoutId}`,
        );
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workoutId) {
      fetchWorkoutDetails();
    }
  }, [workoutId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#ccff00] mb-4" />
        <p className="text-sm">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-oswald text-3xl font-bold text-white mb-2">
          WORKOUT NOT FOUND
        </h2>
        <p className="text-gray-400 mb-6">
          The requested exercise could not be loaded.
        </p>
        <Link
          href="/"
          className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#b8e600]"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  const idStr = (workout._id || workout.id || "").toString();
  const isPlanned = plan.some(
    (item) => (item._id || item.id || "").toString() === idStr,
  );
  const isSaved = saved.some(
    (item) => (item._id || item.id || "").toString() === idStr,
  );

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to workouts</span>
        </Link>

        {/* 4. Two-Column Layout (Figma Design Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-[#12141a] p-6 md:p-8 rounded-3xl border border-gray-800/80">
          {/* Left Column — Visual/Media */}
          <div className="relative w-full h-[350px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
            <Image
              src={
                workout.image ||
                "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
              }
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column — Specs and Info */}
          <div className="flex flex-col">
            {/* Title & Description */}
            <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase text-white tracking-wide mb-3">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {workout.category?.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-bold text-xs uppercase px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Key Specs Table Panel */}
            <div className="bg-[#0b0c10] rounded-xl p-4 border border-gray-800/80 mb-6 space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  EQUIPMENT
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.equipment}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  DIFFICULTY
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.difficulty}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  SETS
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.sets}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  REPS
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.reps}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  DURATION
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.duration} min
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/60">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  CALORIES
                </span>
                <span className="text-gray-200 font-medium">
                  {workout.calories} kcal
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500 uppercase text-xs tracking-wider font-medium">
                  RATING
                </span>
                <span className="text-gray-200 font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  {workout.rating}
                </span>
              </div>
            </div>

            {/* Instructions Section */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-oswald text-lg font-bold uppercase text-white tracking-wider mb-3">
                  INSTRUCTIONS
                </h3>
                <ol className="space-y-2.5 text-sm text-gray-300">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-[#ccff00]">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4 border-t border-gray-800">
              <button
                onClick={() => addToPlan(workout)}
                disabled={isPlanned}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all ${
                  isPlanned
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                }`}
              >
                <CalendarPlus className="w-4 h-4" />
                <span>
                  {isPlanned ? "In Today's Plan" : "Add to today's plan"}
                </span>
              </button>

              <button
                onClick={() => addToSaved(workout)}
                disabled={isSaved}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm border transition-all ${
                  isSaved
                    ? "border-gray-800 text-gray-500 cursor-not-allowed"
                    : "border-gray-700 text-gray-200 hover:border-white hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
