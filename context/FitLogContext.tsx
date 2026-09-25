"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface Workout {
  _id?: string;
  id?: string;
  name: string;
  category: string[];
  description: string;
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
}

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  completed: string[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleMarkAsDone: (id: string) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedSaved = localStorage.getItem("fitlog_saved");
    const savedCompleted = localStorage.getItem("fitlog_completed");

    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedSaved) setSaved(JSON.parse(savedSaved));
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
      localStorage.setItem("fitlog_completed", JSON.stringify(completed));
    }
  }, [plan, saved, completed, isLoaded]);

  const getId = (item: Workout) => (item._id || item.id || "").toString();

  const addToPlan = (workout: Workout) => {
    const id = getId(workout);
    if (plan.length >= 5) {
      toast.error("Today's plan is capped at 5 exercises!");
      return;
    }
    if (plan.some((w) => getId(w) === id)) {
      toast.error("Already in Today's Plan!");
      return;
    }
    setPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    const id = getId(workout);
    if (saved.some((w) => getId(w) === id)) {
      toast.error("Already in Saved!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: string) => {
    const targetId = id.toString();
    setPlan((prev) => prev.filter((w) => getId(w) !== targetId));
    toast.success("Removed from today's plan!");
  };

  const removeFromSaved = (id: string) => {
    const targetId = id.toString();
    setSaved((prev) => prev.filter((w) => getId(w) !== targetId));
    toast.success("Removed from saved!");
  };

  const toggleMarkAsDone = (id: string) => {
    const targetId = id.toString();
    if (completed.includes(targetId)) {
      setCompleted((prev) => prev.filter((item) => item !== targetId));
      toast.success("Marked as incomplete");
    } else {
      setCompleted((prev) => [...prev, targetId]);
      toast.success("Workout marked as done!");
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        completed,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within FitLogProvider");
  }
  return context;
};
