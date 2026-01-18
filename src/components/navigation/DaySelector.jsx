import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DaySelector({ currentDay, totalDays = 60 }) {
  const navigate = useNavigate()

  const goToPrevDay = () => {
    if (currentDay > 1) {
      navigate(`/day/${currentDay - 1}`)
    }
  }

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      navigate(`/day/${currentDay + 1}`)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-dark-bg-card rounded-lg border border-gray-800">
      <button
        onClick={goToPrevDay}
        disabled={currentDay === 1}
        className="touch-target p-2 rounded-lg bg-dark-bg-secondary hover:bg-dark-bg-cardHover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div
        key={currentDay}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center flex-1"
      >
        <p className="text-sm text-dark-text-secondary">Day</p>
        <p className="text-3xl font-bold text-emerald-400">{currentDay}</p>
        <p className="text-xs text-dark-text-muted">of {totalDays}</p>
      </motion.div>

      <button
        onClick={goToNextDay}
        disabled={currentDay === totalDays}
        className="touch-target p-2 rounded-lg bg-dark-bg-secondary hover:bg-dark-bg-cardHover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next day"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
