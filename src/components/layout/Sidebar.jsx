import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Circle } from 'lucide-react'
import { useProgress } from '../../contexts/ProgressContext'
import { calculateDayProgress } from '../../utils/progressCalculator'

export default function Sidebar() {
  const { dayNumber } = useParams()
  const currentDayNumber = dayNumber ? parseInt(dayNumber) : null
  const { progress } = useProgress()

  const getDayIcon = (day) => {
    const dayProgress = calculateDayProgress(day)
    if (dayProgress.percentage === 100) {
      return <CheckCircle size={16} className="text-emerald-500" />
    } else if (dayProgress.percentage > 0) {
      return <Clock size={16} className="text-yellow-500" />
    }
    return <Circle size={16} className="text-gray-600" />
  }

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-dark-bg-card border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-dark-text-secondary uppercase tracking-wider mb-4">
          30-Day Roadmap
        </h2>

        <div className="space-y-1">
          {progress.days.map((day) => {
            const isActive = currentDayNumber === day.dayNumber
            const dayProgress = calculateDayProgress(day)

            return (
              <Link
                key={day.dayNumber}
                to={`/day/${day.dayNumber}`}
                className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-dark-text-secondary hover:bg-dark-bg-cardHover hover:text-dark-text-primary'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {getDayIcon(day)}
                    <span className="text-sm font-medium">
                      Day {day.dayNumber}
                    </span>
                  </div>
                  <span className={`text-xs ${isActive ? 'text-emerald-100' : 'text-dark-text-muted'}`}>
                    {dayProgress.percentage}%
                  </span>
                </div>
                <p className={`text-xs truncate ${isActive ? 'text-emerald-100' : 'text-dark-text-muted'}`}>
                  {day.title}
                </p>

                {/* Progress bar */}
                <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isActive ? 'bg-emerald-300' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${dayProgress.percentage}%` }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
