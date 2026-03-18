'use client'
import { Plus } from 'lucide-react'

type FloatingAddButtonProps = {
  onClick: () => void
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-30">
      <button
        onClick={onClick}
        className="w-14 h-14 rounded-2xl bg-neon-orange text-dark-900 flex items-center justify-center
                   glow-orange hover:bg-orange-400 hover:scale-105 transition-all duration-200 shadow-2xl"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </div>
  )
}
