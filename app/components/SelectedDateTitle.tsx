'use client'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

type SelectedDateTitleProps = {
  date: Date
  isToday: boolean
  showVolume: boolean
  totalVolume?: number
}

export function SelectedDateTitle({ date, isToday, showVolume, totalVolume }: SelectedDateTitleProps) {
  return (
    <section className="flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-neon-orange/60" />
          <span className="text-white/40 text-xs font-body uppercase tracking-widest">
            {isToday ? "Today's Workout" : 'Workout'}
          </span>
        </div>
        <h2 className="font-display text-4xl text-white tracking-wide mt-0.5">
          {format(date, 'EEEE').toUpperCase()}
          <span className="text-neon-orange ml-2 text-2xl">{format(date, 'dd MMM')}</span>
        </h2>
      </div>

      {showVolume && (
        <div className="text-right">
          <div className="font-display text-2xl text-neon-yellow text-glow-yellow leading-none">
            {totalVolume?.toLocaleString() ?? 0}
          </div>
          <div className="text-white/30 text-[10px] font-body uppercase tracking-widest">kg total vol</div>
        </div>
      )}
    </section>
  )
}
