/**
 * Type definitions for the Fitness Tracker application
 */

export interface Set {
  id: string
  reps: number
  weight: number
  completed: boolean
}

export interface Exercise {
  id: string
  name: string
  muscleGroup?: string
  isDropSet?: boolean
  isSuperSet?: boolean
  superSetWith?: string
  notes?: string
  sets: Set[]
}

export interface Workout {
  exercises: Exercise[]
}

export interface WorkoutsData {
  [date: string]: Workout
}

export interface Profile {
  name: string
  goal: string
}

export interface ExerciseCardProps {
  exercise: Exercise
  date: Date
  onUpdateSet: (exerciseId: string, setId: string, updates: Partial<Set>) => void
  onAddSet: (exerciseId: string) => void
  onDeleteSet: (exerciseId: string, setId: string) => void
  onDeleteExercise: (exerciseId: string) => void
  onUpdateExercise: (exerciseId: string, updates: Partial<Exercise>) => void
}

export interface AddExerciseModalProps {
  onClose: () => void
  onAdd: (exercise: Omit<Exercise, 'id'>) => void
}

export interface CalendarStripProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  activeDates?: string[]
}

export interface StatsBarProps {
  workout?: Workout
  date: Date
}
