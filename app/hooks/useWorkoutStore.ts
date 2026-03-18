"use client";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import type { Workout, WorkoutsData, Exercise, Set } from "../types";

const STORAGE_KEY = "ironlog_workouts";

interface UseWorkoutStoreReturn {
  loaded: boolean;
  workouts: WorkoutsData;
  getWorkoutForDate: (date: Date) => Workout;
  saveWorkoutForDate: (date: Date, workout: Workout) => void;
  addExercise: (date: Date, exercise: Omit<Exercise, "id">) => void;
  updateExercise: (date: Date, exerciseId: string, updates: Partial<Exercise>) => void;
  deleteExercise: (date: Date, exerciseId: string) => void;
  addSet: (date: Date, exerciseId: string) => void;
  updateSet: (date: Date, exerciseId: string, setId: string, updates: Partial<Set>) => void;
  deleteSet: (date: Date, exerciseId: string, setId: string) => void;
  getActiveDates: () => string[];
  getTotalVolume: (date: Date) => number;
}

export function useWorkoutStore(): UseWorkoutStoreReturn {
  const [workouts, setWorkouts] = useState<WorkoutsData>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWorkouts(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load workouts", e);
    }
    setLoaded(true);
  }, []);

  const save = useCallback((data: WorkoutsData) => {
    setWorkouts(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const getWorkoutForDate = useCallback(
    (date: Date): Workout => {
      const key = format(date, "yyyy-MM-dd");
      return workouts[key] || { exercises: [] };
    },
    [workouts]
  );

  const saveWorkoutForDate = useCallback(
    (date: Date, workout: Workout): void => {
      const key = format(date, "yyyy-MM-dd");
      save({ ...workouts, [key]: workout });
    },
    [workouts, save]
  );

  const addExercise = useCallback(
    (date: Date, exercise: Omit<Exercise, "id">): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: [
          ...existing.exercises,
          { ...exercise, id: crypto.randomUUID() } as Exercise,
        ],
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const updateExercise = useCallback(
    (date: Date, exerciseId: string, updates: Partial<Exercise>): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: existing.exercises.map((ex: Exercise) =>
          ex.id === exerciseId ? { ...ex, ...updates } : ex
        ),
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const deleteExercise = useCallback(
    (date: Date, exerciseId: string): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: existing.exercises.filter((ex: Exercise) => ex.id !== exerciseId),
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const addSet = useCallback(
    (date: Date, exerciseId: string): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: existing.exercises.map((ex: Exercise) => {
          if (ex.id !== exerciseId) return ex;
          return {
            ...ex,
            sets: [
              ...ex.sets,
              { id: crypto.randomUUID(), reps: 0, weight: 0, completed: false } as Set,
            ],
          };
        }),
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const updateSet = useCallback(
    (date: Date, exerciseId: string, setId: string, updates: Partial<Set>): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: existing.exercises.map((ex: Exercise) => {
          if (ex.id !== exerciseId) return ex;
          return {
            ...ex,
            sets: ex.sets.map((s: Set) =>
              s.id === setId ? { ...s, ...updates } : s
            ),
          };
        }),
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const deleteSet = useCallback(
    (date: Date, exerciseId: string, setId: string): void => {
      const key = format(date, "yyyy-MM-dd");
      const existing = workouts[key] || { exercises: [] };
      const updated: Workout = {
        ...existing,
        exercises: existing.exercises.map((ex: Exercise) => {
          if (ex.id !== exerciseId) return ex;
          return { ...ex, sets: ex.sets.filter((s: Set) => s.id !== setId) };
        }),
      };
      save({ ...workouts, [key]: updated });
    },
    [workouts, save]
  );

  const getActiveDates = useCallback((): string[] => {
    return Object.keys(workouts).filter(
      (key: string) => workouts[key]?.exercises?.length > 0
    );
  }, [workouts]);

  const getTotalVolume = useCallback(
    (date: Date): number => {
      const workout = getWorkoutForDate(date);
      return workout.exercises.reduce((total: number, ex: Exercise) => {
        return (
          total +
          ex.sets.reduce((s: number, set: Set) => s + (set.reps * set.weight || 0), 0)
        );
      }, 0);
    },
    [getWorkoutForDate]
  );

  return {
    loaded,
    workouts,
    getWorkoutForDate,
    saveWorkoutForDate,
    addExercise,
    updateExercise,
    deleteExercise,
    addSet,
    updateSet,
    deleteSet,
    getActiveDates,
    getTotalVolume,
  };
}
