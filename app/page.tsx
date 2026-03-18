'use client'
import { useEffect, useState, FormEvent } from 'react'
import { isToday } from 'date-fns'
import CalendarStrip from './components/CalendarStrip'
import ExerciseCard from './components/ExerciseCard'
import AddExerciseModal from './components/AddExerciseModal'
import StatsBar from './components/StatsBar'
import { HeaderBar } from './components/HeaderBar'
import { SelectedDateTitle } from './components/SelectedDateTitle'
import { EmptyWorkoutState } from './components/EmptyWorkoutState'
import { FloatingAddButton } from './components/FloatingAddButton'
import { OnboardingModal } from './components/OnboardingModal'
import { LoadingScreen } from './components/LoadingScreen'
import { useWorkoutStore } from './hooks/useWorkoutStore'
import type { Profile } from './types'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile>({ name: '', goal: '' })
  const modalOpen = showModal || showOnboarding

  // Load / persist profile to localStorage
  useEffect(() => {
    const stored = localStorage.getItem('ironlog_profile')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setProfile(parsed)
        setShowOnboarding(false)
      } catch (e) {
        console.error('Failed to parse stored profile', e)
        setShowOnboarding(true)
      }
    } else {
      setShowOnboarding(true)
    }
  }, [])

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [modalOpen])

  const {
    loaded,
    getWorkoutForDate,
    addExercise,
    updateExercise,
    deleteExercise,
    addSet,
    updateSet,
    deleteSet,
    getActiveDates,
    getTotalVolume,
  } = useWorkoutStore()

  const workout = getWorkoutForDate(selectedDate)
  const activeDates = getActiveDates()
  const exercises = workout?.exercises || []
  const todaySelected = isToday(selectedDate)

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedProfile: Profile = { name: profile.name.trim(), goal: profile.goal.trim() }
    localStorage.setItem('ironlog_profile', JSON.stringify(trimmedProfile))
    setProfile(trimmedProfile)
    setShowOnboarding(false)
  }

  if (!loaded) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen pb-24">
      <HeaderBar
        profile={profile}
        activeDays={activeDates.length}
        onEditProfile={() => setShowOnboarding(true)}
      />

      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Calendar */}
        <section>
          <CalendarStrip
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            activeDates={activeDates}
          />
        </section>

        <SelectedDateTitle
          date={selectedDate}
          isToday={todaySelected}
          showVolume={exercises.length > 0}
          totalVolume={getTotalVolume(selectedDate)}
        />

        {/* Stats */}
        {exercises.length > 0 && (
          <section>
            <StatsBar workout={workout} date={selectedDate} />
          </section>
        )}

        {/* Exercise List */}
        <section className="space-y-3">
          {exercises.length === 0 ? (
            <EmptyWorkoutState
              isToday={todaySelected}
              onAddFirst={() => setShowModal(true)}
            />
          ) : (
            exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                date={selectedDate}
                onUpdateSet={(exId, setId, updates) => updateSet(selectedDate, exId, setId, updates)}
                onAddSet={(exId) => addSet(selectedDate, exId)}
                onDeleteSet={(exId, setId) => deleteSet(selectedDate, exId, setId)}
                onDeleteExercise={(exId) => deleteExercise(selectedDate, exId)}
                onUpdateExercise={(exId, updates) => updateExercise(selectedDate, exId, updates)}
              />
            ))
          )}
        </section>
      </main>

      {/* Floating Add Button */}
      {exercises.length > 0 && (
        <FloatingAddButton onClick={() => setShowModal(true)} />
      )}

      {/* Add Exercise Modal */}
      {showModal && (
        <AddExerciseModal
          onClose={() => setShowModal(false)}
          onAdd={(exercise) => addExercise(selectedDate, exercise)}
        />
      )}

      {/* User onboarding modal */}
      {showOnboarding && (
        <OnboardingModal
          profile={profile}
          onClose={() => setShowOnboarding(false)}
          onProfileChange={(field, value) => setProfile({ ...profile, [field]: value })}
          onSubmit={handleProfileSubmit}
        />
      )}
    </div>
  )
}
