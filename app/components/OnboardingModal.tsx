'use client'
import { FormEvent, ChangeEvent } from 'react'
import type { Profile } from '../types'

type OnboardingModalProps = {
  profile: Profile
  onClose: () => void
  onProfileChange: (field: keyof Profile, value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function OnboardingModal({ profile, onClose, onProfileChange, onSubmit }: OnboardingModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 overscroll-contain"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="bg-dark-800 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 font-body">Welcome</p>
            <h3 className="font-display text-2xl text-white">Tell us about you</h3>
            <p className="text-white/50 text-sm mt-1">Saved locally on this device to personalize IRONLOG.</p>
          </div>
          <button
            aria-label="Close onboarding"
            className="text-white/40 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-white/50 font-body">Name</span>
            <input
              className="w-full rounded-xl bg-dark-700 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-orange"
              placeholder="Alex"
              value={profile.name}
              onWheel={(e) => e.preventDefault()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onProfileChange('name', e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-white/50 font-body">Fitness Goal</span>
            <input
              className="w-full rounded-xl bg-dark-700 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-orange"
              placeholder="Build strength / Lose fat / 10k run..."
              value={profile.goal}
              onWheel={(e) => e.preventDefault()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onProfileChange('goal', e.target.value)}
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-white/50 hover:text-white text-sm font-body"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={!profile.name.trim()}
              className="px-4 py-2 rounded-xl bg-neon-orange text-dark-900 font-body font-semibold glow-orange disabled:opacity-40"
            >
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
