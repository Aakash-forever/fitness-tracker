# 🏋️ IronLog — Fitness Tracker

A bold, colorful fitness tracking app built with Next.js 14.

## Features

- 📅 **Date-based tracking** — Navigate by week, log workouts per day
- 💪 **Exercise logging** — Name, sets, reps, and weight per set
- 🔥 **Drop Sets** — Mark exercises as drop sets with a red badge
- ⚡ **Supersets** — Pair exercises together with a purple/blue badge
- ✅ **Set completion** — Check off individual sets as you go
- 📊 **Live stats** — Volume, reps, sets progress updated in real time
- 💾 **Persistent storage** — All data saved to localStorage (no backend needed)
- 📱 **Fully responsive** — Works on mobile and desktop

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000
```

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date manipulation
- **localStorage** for data persistence

## How to Use

1. **Select a date** from the calendar strip at the top
2. **Add exercises** by clicking the orange button
3. **Choose muscle group → exercise → set type** in the modal
4. **Log sets** by entering weight and reps in each row
5. **Check off sets** as you complete them
6. **Track progress** via the stats bar above your exercises

## Design

Bold neon-on-dark aesthetic inspired by sports magazines and arcade UI.
- Font: Bebas Neue (display) + DM Sans (body)
- Colors: Electric orange, neon yellow, hot pink, cyan blue
- Dark background with subtle grid and noise texture
