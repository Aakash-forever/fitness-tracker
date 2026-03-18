'use client'
import { FC, useState } from 'react'
import { format, addDays, subDays, isToday, isSameDay, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarStripProps } from '../types'

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const CalendarStrip: FC<CalendarStripProps> = ({ selectedDate, onDateSelect, activeDates = [] }) => {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(new Date()))

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const isActive = (date: Date): boolean =>
    activeDates.includes(format(date, 'yyyy-MM-dd'))

  return (
    <div className="w-full">
      {/* Month Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 px-1">
        <h2 className="font-display text-3xl text-white tracking-wider text-glow-orange">
          {format(weekStart, 'MMMM').toUpperCase()}
          <span className="text-neon-orange ml-2">{format(weekStart, 'yyyy')}</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setWeekStart(d => subDays(d, 7))}
            className="w-9 h-9 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center
                       text-white hover:border-neon-orange hover:text-neon-orange transition-all duration-200 hover:glow-orange"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => { setWeekStart(startOfWeek(new Date())); onDateSelect(new Date()); }}
            className="px-3 h-9 rounded-lg bg-dark-700 border border-white/10 text-xs font-body font-semibold
                       text-white/60 hover:border-neon-orange hover:text-neon-orange transition-all duration-200"
          >
            TODAY
          </button>
          <button
            onClick={() => setWeekStart(d => addDays(d, 7))}
            className="w-9 h-9 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center
                       text-white hover:border-neon-orange hover:text-neon-orange transition-all duration-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 snap-x snap-mandatory md:grid md:grid-cols-7 md:overflow-visible md:mx-0 md:px-0">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => onDateSelect(date)}
            className={`flex flex-col items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl shrink-0 snap-center transition-all duration-200
              ${isSameDay(date, selectedDate)
                ? 'bg-neon-orange text-dark-900 border-neon-orange glow-orange'
                : isActive(date)
                  ? 'bg-dark-700 border border-neon-orange/40 text-neon-orange'
                  : 'bg-dark-700 border border-white/8 text-white/50 hover:border-white/20'
              }`}
          >
            <span className="text-[10px] font-body font-semibold uppercase tracking-wider">
              {DAY_LABELS[index]}
            </span>
            <span className="font-display text-sm leading-none">
              {format(date, 'd')}
            </span>
            {isToday(date) && (
              <div className="w-1 h-1 rounded-full bg-current" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CalendarStrip
