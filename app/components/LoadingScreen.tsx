'use client'

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-neon-orange border-t-transparent animate-spin" />
        <p className="font-display text-xl text-white/40 tracking-widest">LOADING...</p>
      </div>
    </div>
  )
}
