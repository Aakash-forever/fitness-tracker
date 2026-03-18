'use client'
import { FC, useState, ChangeEvent } from 'react'
import { Plus, Trash2, Check, TrendingDown, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import type { ExerciseCardProps } from '../types'

const ExerciseCard: FC<ExerciseCardProps> = ({
  exercise,
  date,
  onUpdateSet,
  onAddSet,
  onDeleteSet,
  onDeleteExercise,
  onUpdateExercise
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const totalVolume = exercise.sets.reduce((sum: number, s) => sum + (Number(s.reps) * Number(s.weight) || 0), 0)
  const completedSets = exercise.sets.filter(s => s.completed).length
  const allDone = exercise.sets.length > 0 && completedSets === exercise.sets.length

  return (
    <div className={`
      rounded-2xl border overflow-hidden card-hover transition-all duration-300
      ${allDone
        ? 'border-neon-green/40 bg-gradient-to-br from-dark-700 to-dark-800'
        : 'border-white/8 bg-dark-700'
      }
    `}>
      {/* Card Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 px-4 py-3.5">
        <div className="flex items-start gap-3 flex-1 min-w-0">

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-lg text-white tracking-wide truncate">{exercise.name.toUpperCase()}</h3>

              {exercise.isDropSet && (
                <span className="badge-drop text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <TrendingDown size={10} /> DROP
                </span>
              )}
              {exercise.isSuperSet && (
                <span className="badge-super text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <Zap size={10} /> SUPER
                </span>
              )}
              {allDone && (
                <span className="bg-neon-green/20 border border-neon-green/40 text-neon-green text-[10px] font-body font-bold px-2 py-0.5 rounded-full shrink-0">
                  ✓ DONE
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              {exercise.muscleGroup && (
                <span className="text-xs text-white/30 font-body">{exercise.muscleGroup}</span>
              )}
              {exercise.isSuperSet && exercise.superSetWith && (
                <span className="text-xs text-neon-blue/60 font-body">+ {exercise.superSetWith}</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats + actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 flex-wrap">
          <div className="text-right sm:block">
            <div className="text-neon-orange font-display text-lg leading-none">{totalVolume.toLocaleString()}</div>
            <div className="text-white/30 text-[10px] font-body uppercase tracking-wider">kg vol</div>
          </div>
          <div className="text-right">
            <div className="text-white font-display text-lg leading-none">{completedSets}/{exercise.sets.length}</div>
            <div className="text-white/30 text-[10px] font-body uppercase tracking-wider">sets</div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(c => !c)}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              {collapsed ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            </button>
            {confirmDelete ? (
              <>
                <button
                  onClick={() => onDeleteExercise(exercise.id)}
                  className="px-2 h-8 rounded-lg bg-red-500/80 text-white text-xs font-body font-bold hover:bg-red-500 transition-all"
                >
                  YES
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 h-8 rounded-lg bg-white/5 text-white/60 text-xs font-body hover:bg-white/10 transition-all"
                >
                  NO
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {exercise.sets.length > 0 && (
        <div className="h-0.5 bg-dark-600 mx-4">
          <div
            className="h-full progress-bar transition-all duration-500 rounded-full"
            style={{ width: `${(completedSets / exercise.sets.length) * 100}%` }}
          />
        </div>
      )}

      {/* Sets table */}
      {!collapsed && (
        <div className="px-4 pb-4 pt-3 space-y-2">
          {/* Notes */}
          {exercise.notes && (
            <p className="text-xs text-white/30 font-body italic mb-2">{exercise.notes}</p>
          )}

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-2 px-2">
            <span className="col-span-1 text-[10px] text-white/30 font-body font-semibold uppercase tracking-wider">Set</span>
            <span className="col-span-4 text-[10px] text-white/30 font-body font-semibold uppercase tracking-wider">Weight (kg)</span>
            <span className="col-span-4 text-[10px] text-white/30 font-body font-semibold uppercase tracking-wider">Reps</span>
            <span className="col-span-2 text-[10px] text-white/30 font-body font-semibold uppercase tracking-wider text-center">Done</span>
            <span className="col-span-1"></span>
          </div>

          {/* Set Rows */}
          {exercise.sets.map((set, idx) => (
            <div
              key={set.id}
              className={`grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2 items-center p-2 rounded-xl transition-all duration-200
                ${set.completed ? 'bg-neon-green/8 border border-neon-green/20' : 'bg-dark-800/60 border border-transparent hover:border-white/8'}
              `}
            >
              <div className="flex items-center gap-3 sm:col-span-1">
                <span className="font-display text-base text-white/60 leading-none">{idx + 1}</span>
                <span className="text-[10px] text-white/30 uppercase tracking-wider sm:hidden">Set</span>
              </div>

              <div className="space-y-1 sm:space-y-0 sm:col-span-4">
                <span className="text-[10px] text-white/30 uppercase tracking-wider sm:hidden">Weight (kg)</span>
                <input
                  type="number"
                  value={set.weight || ''}
                  placeholder="0"
                  min="0"
                  step="0.5"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateSet(exercise.id, set.id, { weight: Number(e.target.value) })}
                  className={`w-full neon-input px-3 py-2 rounded-lg text-sm font-body font-semibold text-center
                    ${set.completed ? 'border-neon-green/30 text-neon-green' : ''}
                  `}
                />
              </div>

              <div className="space-y-1 sm:space-y-0 sm:col-span-4">
                <span className="text-[10px] text-white/30 uppercase tracking-wider sm:hidden">Reps</span>
                <input
                  type="number"
                  value={set.reps || ''}
                  placeholder="0"
                  min="0"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateSet(exercise.id, set.id, { reps: Number(e.target.value) })}
                  className={`w-full neon-input px-3 py-2 rounded-lg text-sm font-body font-semibold text-center
                    ${set.completed ? 'border-neon-green/30 text-neon-green' : ''}
                  `}
                />
              </div>

              <div className="flex items-center justify-between sm:justify-center gap-3 sm:col-span-2">
                <span className="text-[10px] text-white/30 uppercase tracking-wider sm:hidden">Done</span>
                <button
                  onClick={() => onUpdateSet(exercise.id, set.id, { completed: !set.completed })}
                  className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200
                    ${set.completed
                      ? 'bg-neon-green text-dark-900 glow-green'
                      : 'bg-dark-600 border border-white/10 text-white/30 hover:border-neon-green/40 hover:text-neon-green/60'
                    }
                  `}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
              </div>

              <div className="flex justify-end sm:col-span-1">
                {exercise.sets.length > 1 && (
                  <button
                    onClick={() => onDeleteSet(exercise.id, set.id)}
                    className="w-6 h-6 rounded flex items-center justify-center text-white/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add set button */}
          <button
            onClick={() => onAddSet(exercise.id)}
            className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-white/40 text-sm font-body font-medium
                       hover:border-neon-orange/40 hover:text-neon-orange/80 transition-all duration-200 flex items-center justify-center gap-2 mt-1"
          >
            <Plus size={14} />
            Add Set
          </button>
        </div>
      )}
    </div>
  )
}

export default ExerciseCard
