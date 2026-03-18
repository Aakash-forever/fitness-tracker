'use client'
import { FC } from 'react'
import { Dumbbell, Flame, BarChart3, Trophy } from 'lucide-react'
import type { StatsBarProps } from '../types'

const StatsBar: FC<StatsBarProps> = ({ workout, date }) => {
  const exercises = workout?.exercises || []
  const totalSets = exercises.reduce((sum: number, ex) => sum + ex.sets.length, 0)
  const completedSets = exercises.reduce(
    (sum: number, ex) => sum + ex.sets.filter(s => s.completed).length,
    0
  )
  const totalVolume = exercises.reduce(
    (sum: number, ex) =>
      sum + ex.sets.reduce((s: number, set) => s + (Number(set.reps) * Number(set.weight) || 0), 0),
    0
  )
  const totalReps = exercises.reduce(
    (sum: number, ex) =>
      sum + ex.sets.reduce((s: number, set) => s + (Number(set.reps) || 0), 0),
    0
  )

  const stats = [
    { icon: Dumbbell, label: 'Exercises', value: exercises.length, color: 'text-neon-orange' },
    { icon: BarChart3, label: 'Sets', value: `${completedSets}/${totalSets}`, color: 'text-neon-yellow' },
    { icon: Flame, label: 'Total Reps', value: totalReps.toLocaleString(), color: 'text-neon-pink' },
    { icon: Trophy, label: 'Volume (kg)', value: totalVolume.toLocaleString(), color: 'text-neon-blue' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-dark-700 rounded-xl border border-white/6 p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Icon size={14} className={color} />
            <span className="text-white/40 text-[11px] font-body font-semibold uppercase tracking-widest">{label}</span>
          </div>
          <span className={`font-display text-2xl leading-none ${color} text-glow-orange`}>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
