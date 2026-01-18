import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CheckCircle, Clock, Circle, ChevronRight } from 'lucide-react'
import { useProgress } from '../contexts/ProgressContext'
import PageTransition from '../components/animations/PageTransition'
import StaggerContainer, { StaggerItem } from '../components/animations/StaggerContainer'
import { calculateDayProgress, groupDaysByStatus } from '../utils/progressCalculator'

export default function RoadmapOverview() {
  const { progress } = useProgress()
  const { completed, inProgress, notStarted } = groupDaysByStatus(progress.days)
  const [selectedWeek, setSelectedWeek] = useState('all')

  const getDayIcon = (dayProgress) => {
    if (dayProgress.percentage === 100) {
      return <CheckCircle className="text-emerald-500" size={20} />
    } else if (dayProgress.percentage > 0) {
      return <Clock className="text-yellow-500" size={20} />
    }
    return <Circle className="text-gray-600" size={20} />
  }

  const getDayColor = (dayProgress) => {
    if (dayProgress.percentage === 100) {
      return 'border-emerald-600 bg-emerald-600/5'
    } else if (dayProgress.percentage > 0) {
      return 'border-yellow-600 bg-yellow-600/5'
    }
    return 'border-gray-800 bg-transparent'
  }

  // Group days by week
  const weeks = [
    { label: 'All Days', value: 'all', start: 1, end: 60 },
    { label: 'Week 1-2 (Foundation)', value: 'week1-2', start: 1, end: 14 },
    { label: 'Week 3 (Caching)', value: 'week3', start: 15, end: 21 },
    { label: 'Week 4 (Databases)', value: 'week4', start: 22, end: 28 },
    { label: 'Week 5 (Security)', value: 'week5', start: 29, end: 35 },
    { label: 'Week 6 (APIs)', value: 'week6', start: 36, end: 42 },
    { label: 'Week 7 (DevOps)', value: 'week7', start: 43, end: 49 },
    { label: 'Week 8 (Cloud)', value: 'week8', start: 50, end: 56 },
    { label: 'Week 9 (Interview)', value: 'week9', start: 57, end: 60 },
  ]

  const filteredDays = selectedWeek === 'all'
    ? progress.days
    : progress.days.filter(day => {
        const week = weeks.find(w => w.value === selectedWeek)
        return day.dayNumber >= week.start && day.dayNumber <= week.end
      })

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-text-primary mb-2">
          60-Day Roadmap
        </h1>
        <p className="text-dark-text-secondary">
          Track your progress across all days
        </p>
      </div>

      {/* Week Filter - Enhanced */}
      <div className="mb-8 card">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-dark-text-primary mb-1">
            Filter by Week
          </h2>
          <p className="text-xs text-dark-text-secondary">
            Select a week to focus your learning or view all 60 days
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {weeks.map(week => (
            <button
              key={week.value}
              onClick={() => setSelectedWeek(week.value)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedWeek === week.value
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-dark-bg-secondary text-dark-text-secondary hover:bg-dark-bg-cardHover hover:text-dark-text-primary'
              }`}
            >
              {week.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-emerald-600/10 border-emerald-600">
          <p className="text-sm text-emerald-400 mb-1">Completed</p>
          <p className="text-3xl font-bold text-emerald-400">{completed.length}</p>
          <p className="text-xs text-emerald-400/70">days finished</p>
        </div>
        <div className="card bg-yellow-600/10 border-yellow-600">
          <p className="text-sm text-yellow-400 mb-1">In Progress</p>
          <p className="text-3xl font-bold text-yellow-400">{inProgress.length}</p>
          <p className="text-xs text-yellow-400/70">days started</p>
        </div>
        <div className="card bg-gray-600/10 border-gray-600">
          <p className="text-sm text-gray-400 mb-1">Not Started</p>
          <p className="text-3xl font-bold text-gray-400">{notStarted.length}</p>
          <p className="text-xs text-gray-400/70">days remaining</p>
        </div>
      </div>

      {/* Days Grid */}
      <div className="mb-4">
        <p className="text-sm text-dark-text-secondary">
          Showing {filteredDays.length} {filteredDays.length === 1 ? 'day' : 'days'}
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDays.map((day) => {
          const dayProgress = calculateDayProgress(day)
          const isCurrentDay = day.dayNumber === progress.currentDay

          return (
            <StaggerItem key={day.dayNumber}>
              <Link
                to={`/day/${day.dayNumber}`}
                className={`card card-hover w-full h-full flex flex-col min-h-[280px] ${getDayColor(dayProgress)} ${
                  isCurrentDay ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/20' : 'border-2'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getDayIcon(dayProgress)}
                    <span className="text-sm font-bold text-dark-text-muted">
                      Day {day.dayNumber}
                    </span>
                  </div>
                  {isCurrentDay && (
                    <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-dark-text-primary mb-2 line-clamp-2 min-h-[48px]">
                  {day.title}
                </h3>

                <p className="text-xs text-dark-text-secondary mb-4 line-clamp-2 min-h-[32px]">
                  {day.description}
                </p>

                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        dayProgress.percentage === 100
                          ? 'bg-emerald-600'
                          : dayProgress.percentage > 0
                          ? 'bg-yellow-600'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${dayProgress.percentage}%` }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-dark-text-muted">
                      {day.topics.length} topics • {day.dsaProblems?.length || 0} problems
                    </span>
                    <span className="font-bold text-emerald-400">
                      {dayProgress.percentage}%
                    </span>
                  </div>
                </div>

                {/* View Button */}
                <div className="mt-auto pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className="text-emerald-400 font-medium inline-block"
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                    >
                      View Details
                    </span>
                    <ChevronRight className="text-emerald-400" size={16} />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </PageTransition>
  )
}
