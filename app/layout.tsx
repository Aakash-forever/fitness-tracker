import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IronLog — Fitness Tracker',
  description: 'Track your workouts, crush your goals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="noise-bg grid-bg min-h-screen bg-dark-900">
        {children}
      </body>
    </html>
  )
}
