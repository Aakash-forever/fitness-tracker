'use client'
import { Plus, Dumbbell } from 'lucide-react'

type EmptyWorkoutStateProps = {
  isToday: boolean
  onAddFirst: () => void
}

export function EmptyWorkoutState({ isToday, onAddFirst }: EmptyWorkoutStateProps) {
  return (
    <div className="stripe-accent rounded-2xl border border-dashed border-white/10 p-12 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-dark-700 border border-white/10 flex items-center justify-center">
        <Dumbbell size={28} className="text-white/20" />
      </div>
      <div className="text-center">
        <p className="font-display text-xl text-white/40 tracking-wider">NO WORKOUT YET</p>
        <p className="text-sm text-white/25 font-body mt-1">
          {isToday ? "Let's crush today's session!" : 'Nothing logged for this day.'}
        </p>
      </div>
      <button
        onClick={onAddFirst}
        className="px-6 py-3 rounded-xl bg-neon-orange text-dark-900 font-body font-bold text-sm glow-orange
                   hover:bg-orange-400 transition-all flex items-center gap-2"
      >
        <Plus size={16} />
        ADD FIRST EXERCISE
      </button>
    </div>
  )
}
