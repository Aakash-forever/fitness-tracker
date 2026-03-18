'use client'
import { Activity, Dumbbell } from 'lucide-react'
import type { Profile } from '../types'

type HeaderBarProps = {
  profile: Profile
  activeDays: number
  onEditProfile: () => void
}

export function HeaderBar({ profile, activeDays, onEditProfile }: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-neon-orange flex items-center justify-center glow-orange shrink-0">
            <Dumbbell size={18} className="text-dark-900" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl text-white leading-none tracking-wider text-glow-orange">IRONLOG</h1>
            <p className="text-[10px] text-white/30 font-body uppercase tracking-widest">Fitness Tracker</p>
            {profile.name && (
              <p className="text-[11px] text-neon-yellow font-body tracking-tight mt-0.5">
                Hey {profile.name}, goal: {profile.goal || '—'}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-dark-700 rounded-xl px-3 py-2 border border-white/8">
          <Activity size={14} className="text-neon-orange" />
          <span className="text-white font-body font-semibold text-sm">{activeDays}</span>
          <span className="text-white/30 text-xs font-body">days logged</span>
        </div>
      </div>

      {profile.name && (
        <div className="max-w-3xl mx-auto px-4 pb-2 flex justify-end">
          <button
            onClick={onEditProfile}
            className="text-xs text-white/50 underline hover:text-neon-yellow font-body"
          >
            Update profile
          </button>
        </div>
      )}
    </header>
  )
}
