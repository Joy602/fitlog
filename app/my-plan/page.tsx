"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Flame,
  Calendar,
  Bookmark,
  PlusCircle,
  Dumbbell,
} from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const {
    plan,
    saved,
    completed,
    removeFromPlan,
    removeFromSaved,
    toggleMarkAsDone,
    addToPlan,
  } = useFitLog();

  // Stats calculation for Today's Plan
  const totalMin = plan.reduce((acc, item) => acc + (item.duration || 0), 0);
  const totalCal = plan.reduce((acc, item) => acc + (item.calories || 0), 0);

  return (
    <div className="min-h-screen pb-16 pt-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase text-white tracking-wide mb-2">
            MY ROUTINE
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Manage today&apos;s active session and review saved workouts.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-2 pb-3 px-4 font-oswald text-lg uppercase tracking-wider transition-all relative ${
              activeTab === "plan"
                ? "text-[#ccff00] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Today&apos;s Plan</span>
            <span className="ml-1 bg-gray-800 text-gray-200 text-xs px-2 py-0.5 rounded-full font-sans">
              {plan.length}
            </span>
            {activeTab === "plan" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 pb-3 px-4 font-oswald text-lg uppercase tracking-wider transition-all relative ${
              activeTab === "saved"
                ? "text-[#ccff00] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>Saved for Later</span>
            <span className="ml-1 bg-gray-800 text-gray-200 text-xs px-2 py-0.5 rounded-full font-sans">
              {saved.length}
            </span>
            {activeTab === "saved" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
            )}
          </button>
        </div>

        {/* TAB 1: TODAY'S PLAN */}
        {activeTab === "plan" && (
          <div>
            {plan.length === 0 ? (
              /* Empty State */
              <div className="bg-[#12141a] border border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center">
                <div className="p-4 bg-gray-900 rounded-full mb-4 text-gray-500">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h3 className="font-oswald text-2xl font-bold uppercase text-white mb-2">
                  No Workouts Planned Today
                </h3>
                <p className="text-gray-400 text-sm max-w-md mb-6">
                  Browse the workout library and click &quot;Add to today&apos;s
                  plan&quot; to build your daily routine.
                </p>
                <Link
                  href="/"
                  className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
                >
                  Explore Workouts
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left List Column */}
                <div className="lg:col-span-2 space-y-4">
                  {plan.map((item) => {
                    const idStr = (item._id || item.id || "").toString();
                    const isDone = completed.includes(idStr);

                    return (
                      <div
                        key={idStr}
                        className={`bg-[#12141a] rounded-2xl p-4 md:p-5 border transition-all flex items-center justify-between gap-4 ${
                          isDone
                            ? "border-emerald-500/30 bg-[#12141a]/60 opacity-75"
                            : "border-gray-800 hover:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleMarkAsDone(idStr)}
                            className="text-gray-400 hover:text-[#ccff00] transition-colors flex-shrink-0"
                            title={
                              isDone ? "Mark as undone" : "Mark as completed"
                            }
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-6 h-6 text-[#ccff00] fill-[#ccff00]/20" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>

                          {/* Image Thumbnail */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 border border-gray-800">
                            <Image
                              src={
                                item.image ||
                                "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
                              }
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Title & Stats */}
                          <div className="min-w-0">
                            <Link
                              href={`/workout/${idStr}`}
                              className={`font-oswald text-lg font-bold uppercase truncate block hover:text-[#ccff00] transition-colors ${
                                isDone
                                  ? "line-through text-gray-500"
                                  : "text-white"
                              }`}
                            >
                              {item.name}
                            </Link>
                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                {item.calories} kcal
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeFromPlan(idStr)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800/50 flex-shrink-0"
                          title="Remove from plan"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right Total Stats Column */}
                <div className="bg-[#12141a] rounded-3xl p-6 border border-gray-800/80 h-fit sticky top-24">
                  <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wider mb-4 border-b border-gray-800 pb-3">
                    SESSION SUMMARY
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Total Exercises</span>
                      <span className="font-bold text-white">
                        {plan.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        Total Estimated Duration
                      </span>
                      <span className="font-bold text-[#ccff00]">
                        {totalMin} mins
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        Total Estimated Burn
                      </span>
                      <span className="font-bold text-[#ccff00]">
                        {totalCal} kcal
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Completed Exercises</span>
                      <span className="font-bold text-emerald-400">
                        {
                          completed.filter((id) =>
                            plan.some(
                              (p) => (p._id || p.id || "").toString() === id,
                            ),
                          ).length
                        }{" "}
                        / {plan.length}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0b0c10] rounded-2xl border border-gray-800 text-xs text-gray-400">
                    💡{" "}
                    <span className="font-semibold text-gray-300">
                      Pro Tip:
                    </span>{" "}
                    Click the checkmark circle beside any exercise as you finish
                    your sets.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED FOR LATER */}
        {activeTab === "saved" && (
          <div>
            {saved.length === 0 ? (
              /* Empty State */
              <div className="bg-[#12141a] border border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center">
                <div className="p-4 bg-gray-900 rounded-full mb-4 text-gray-500">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h3 className="font-oswald text-2xl font-bold uppercase text-white mb-2">
                  No Saved Workouts
                </h3>
                <p className="text-gray-400 text-sm max-w-md mb-6">
                  Save lifts for future reference by clicking the bookmark
                  button on any workout details page.
                </p>
                <Link
                  href="/"
                  className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
                >
                  Browse Library
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saved.map((item) => {
                  const idStr = (item._id || item.id || "").toString();
                  const isAlreadyInPlan = plan.some(
                    (p) => (p._id || p.id || "").toString() === idStr,
                  );

                  return (
                    <div
                      key={idStr}
                      className="bg-[#12141a] rounded-2xl border border-gray-800/80 overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative h-44 w-full bg-gray-900">
                          <Image
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <Link
                            href={`/workout/${idStr}`}
                            className="font-oswald text-xl font-bold uppercase text-white hover:text-[#ccff00] transition-colors block mb-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-400 mb-3">
                            {item.equipment}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {item.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5" />
                              {item.calories} kcal
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-5 pt-0 flex items-center justify-between gap-2">
                        <button
                          onClick={() => addToPlan(item)}
                          disabled={isAlreadyInPlan}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                            isAlreadyInPlan
                              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                              : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                          }`}
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>
                            {isAlreadyInPlan
                              ? "In Today's Plan"
                              : "Add to Plan"}
                          </span>
                        </button>

                        <button
                          onClick={() => removeFromSaved(idStr)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors border border-gray-800 rounded-xl hover:border-gray-700"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
