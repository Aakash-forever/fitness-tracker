'use client'
import { FC, useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react'
import { X, Zap, TrendingDown, Dumbbell } from 'lucide-react'
import type { AddExerciseModalProps, Exercise } from '../types'

const MUSCLE_GROUPS = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core', 'Full Body', 'Cardio', 'Other']

const PRESET_EXERCISES: Record<string, string[]> = {
  Chest: ['Bench Press', 'Incline Bench Press', 'Dumbbell Flyes', 'Push-ups', 'Cable Crossover'],
  Back: ['Pull-ups', 'Barbell Row', 'Lat Pulldown', 'Seated Cable Row', 'Deadlift'],
  Shoulders: ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Arnold Press', 'Face Pulls'],
  Biceps: ['Barbell Curl', 'Hammer Curl', 'Preacher Curl', 'Concentration Curl', 'Cable Curl'],
  Triceps: ['Tricep Pushdown', 'Skull Crushers', 'Dips', 'Overhead Extension', 'Close Grip Bench'],
  Legs: ['Squat', 'Leg Press', 'Romanian Deadlift', 'Lunges', 'Leg Curl', 'Calf Raises'],
  Core: ['Plank', 'Crunches', 'Russian Twist', 'Leg Raises', 'Cable Crunch'],
  'Full Body': ['Burpees', 'Clean and Press', 'Thrusters', 'Kettlebell Swing'],
  Cardio: ['Running', 'Cycling', 'Jump Rope', 'Rowing Machine', 'Stair Climber'],
  Other: [],
}

type Step = 'group' | 'exercise' | 'customize'

interface FormData {
  name: string
  muscleGroup: string
  isDropSet: boolean
  isSuperSet: boolean
  superSetWith: string
  notes: string
}

const AddExerciseModal: FC<AddExerciseModalProps> = ({ onClose, onAdd }) => {
  const [step, setStep] = useState<Step>('group')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    name: '',
    muscleGroup: '',
    isDropSet: false,
    isSuperSet: false,
    superSetWith: '',
    notes: '',
  })

  const handleGroupSelect = (group: string): void => {
    setSelectedGroup(group)
    setForm(f => ({ ...f, muscleGroup: group }))
    setStep('exercise')
  }

  const handleExerciseSelect = (name: string): void => {
    setForm(f => ({ ...f, name }))
    setStep('customize')
  }

  const handleCustomExercise = (name: string): void => {
    setForm(f => ({ ...f, name }))
    setStep('customize')
  }

  const handleSubmit = (): void => {
    if (!form.name.trim()) return
    onAdd({
      ...form,
      sets: [{ id: crypto.randomUUID(), reps: 10, weight: 0, completed: false }]
    } as Omit<Exercise, 'id'>)
    onClose()
  }

  const handleCustomExerciseClick = (): void => {
    const input = document.querySelector('input[placeholder="Type custom exercise..."]') as HTMLInputElement | null
    if (input?.value.trim()) {
      handleCustomExercise(input.value.trim())
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-dark-800 rounded-t-3xl sm:rounded-2xl border border-white/10
                      shadow-2xl animate-slide-up overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-orange via-neon-yellow to-neon-pink" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="font-display text-2xl text-white tracking-wider">
              {step === 'group' ? 'SELECT MUSCLE' : step === 'exercise' ? selectedGroup?.toUpperCase() : 'CUSTOMIZE'}
            </h2>
            <p className="text-white/40 text-sm font-body mt-0.5">
              {step === 'group' ? 'Choose a muscle group' : step === 'exercise' ? 'Pick or type an exercise' : 'Set exercise options'}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                                               text-white/60 hover:text-white hover:border-white/20 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Muscle Group */}
          {step === 'group' && (
            <div className="grid grid-cols-2 gap-2">
              {MUSCLE_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => handleGroupSelect(group)}
                  className="p-3 rounded-xl bg-dark-700 border border-white/8 text-white/80 font-body font-medium text-sm
                             hover:border-neon-orange hover:text-white hover:bg-dark-600 transition-all duration-150 text-left"
                >
                  {group}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Exercise Selection */}
          {step === 'exercise' && (
            <div className="space-y-2">
              {/* Custom input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type custom exercise..."
                  className="neon-input flex-1 px-4 py-3 rounded-xl text-sm font-body"
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                      handleCustomExercise((e.target as HTMLInputElement).value.trim())
                    }
                  }}
                />
                <button
                  onClick={handleCustomExerciseClick}
                  className="px-4 py-3 rounded-xl bg-neon-orange text-dark-900 font-bold text-sm font-body hover:bg-orange-400 transition-all"
                >
                  ADD
                </button>
              </div>

              <div className="text-xs text-white/30 font-body uppercase tracking-widest py-1">Or choose preset</div>

              {selectedGroup && PRESET_EXERCISES[selectedGroup]?.map((ex) => (
                <button
                  key={ex}
                  onClick={() => handleExerciseSelect(ex)}
                  className="w-full p-3 rounded-xl bg-dark-700 border border-white/8 text-white/80 font-body text-sm
                             hover:border-neon-orange hover:text-white transition-all text-left flex items-center gap-2"
                >
                  <Dumbbell size={14} className="text-neon-orange/60" />
                  {ex}
                </button>
              ))}
              <button onClick={() => setStep('group')} className="text-white/40 text-sm font-body hover:text-white/60 mt-2">← Back</button>
            </div>
          )}

          {/* Step 3: Customize */}
          {step === 'customize' && (
            <div className="space-y-4">
              {/* Exercise name */}
              <div>
                <label className="text-xs text-white/40 font-body font-semibold uppercase tracking-widest mb-1.5 block">Exercise Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="neon-input w-full px-4 py-3 rounded-xl text-sm font-body"
                />
              </div>

              {/* Set Types */}
              <div>
                <label className="text-xs text-white/40 font-body font-semibold uppercase tracking-widest mb-2 block">Set Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setForm(f => ({ ...f, isDropSet: !f.isDropSet, isSuperSet: false }))}
                    className={`p-3 rounded-xl border font-body text-sm font-semibold flex items-center gap-2 transition-all
                      ${form.isDropSet
                        ? 'badge-drop border-transparent text-white'
                        : 'bg-dark-700 border-white/10 text-white/60 hover:border-neon-pink/40'
                      }`}
                  >
                    <TrendingDown size={15} />
                    Drop Set
                  </button>
                  <button
                    onClick={() => setForm(f => ({ ...f, isSuperSet: !f.isSuperSet, isDropSet: false }))}
                    className={`p-3 rounded-xl border font-body text-sm font-semibold flex items-center gap-2 transition-all
                      ${form.isSuperSet
                        ? 'badge-super border-transparent text-white'
                        : 'bg-dark-700 border-white/10 text-white/60 hover:border-neon-blue/40'
                      }`}
                  >
                    <Zap size={15} />
                    Superset
                  </button>
                </div>
              </div>

              {/* Superset partner */}
              {form.isSuperSet && (
                <div>
                  <label className="text-xs text-white/40 font-body font-semibold uppercase tracking-widest mb-1.5 block">Paired With</label>
                  <input
                    type="text"
                    placeholder="Partner exercise name..."
                    value={form.superSetWith}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, superSetWith: e.target.value }))}
                    className="neon-input w-full px-4 py-3 rounded-xl text-sm font-body"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs text-white/40 font-body font-semibold uppercase tracking-widest mb-1.5 block">Notes (optional)</label>
                <input
                  type="text"
                  placeholder="E.g. focus on mind-muscle connection..."
                  value={form.notes}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="neon-input w-full px-4 py-3 rounded-xl text-sm font-body"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setStep('exercise')} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-body font-semibold text-sm hover:border-white/20 hover:text-white transition-all">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name.trim()}
                  className="flex-2 flex-grow py-3 px-6 rounded-xl bg-neon-orange text-dark-900 font-body font-bold text-sm
                             hover:bg-orange-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-orange"
                >
                  ADD EXERCISE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddExerciseModal
